import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });
    const admin = createClient(url, key);

    const { applicationId } = req.body || {};
    if (!applicationId) return res.status(400).json({ error: 'Missing applicationId' });

    // Load application
    const { data: app, error: appErr } = await admin
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .single();
    if (appErr || !app) return res.status(404).json({ error: 'Application not found' });

    // 1) Register student (works without a personal email; uses generated address)
    const studentId = `${(app.student_first_name?.[0] || 'S').toUpperCase()}${(app.student_last_name?.[0] || 'T').toUpperCase()}${Date.now().toString().slice(-4)}`;
    const studentPassword = Math.random().toString(36).slice(-10) + 'A1!';
    const studentEmail = `${studentId}@students.finoteloza.edu`;
    const { data: stuAuth, error: stuAuthErr } = await admin.auth.admin.createUser({
      email: studentEmail,
      password: studentPassword,
      email_confirm: true,
      user_metadata: {
        role: 'student',
        student_id: studentId,
        first_name: app.student_first_name,
        last_name: app.student_last_name,
      },
    });
    if (stuAuthErr) return res.status(400).json({ error: stuAuthErr.message });

    // Try inserting extended student profile fields; fallback to base if schema lacks columns
    const extendedStudent = {
      student_id: studentId,
      first_name: app.student_first_name,
      middle_name: app.student_middle_name || null,
      last_name: app.student_last_name,
      grade_level: app.grade_level,
      homeroom: null,
      user_id: stuAuth.user?.id || null,
      date_of_birth: app.date_of_birth || null,
      gender: app.gender || null,
      email: app.email || null,
      phone: app.phone || null,
      address: app.address ? [app.address, app.city, app.state, app.zip_code].filter(Boolean).join(', ') : null,
      previous_school: app.previous_school || null,
      previous_school_address: app.previous_school_address || null,
      previous_school_phone: app.previous_school_phone || null,
      reason_for_leaving: app.reason_for_leaving || null,
      special_needs: app.special_needs || null,
      medical_conditions: app.medical_conditions || null,
      extracurricular_activities: app.extracurricular_activities || null,
      interests: app.interests || null,
      goals: app.goals || null,
      additional_info: app.additional_info || null,
      emergency_contact_name: app.emergency_contact_name || null,
      emergency_contact_phone: app.emergency_contact_phone || null,
      emergency_contact_relationship: app.emergency_contact_relation || null,
    };

    let stuRow = null;
    let insertErr = null;
    {
      const { data, error } = await admin.from('students').insert(extendedStudent).select('id').single();
      stuRow = data || null;
      insertErr = error || null;
    }
    if (insertErr) {
      const baseStudent = {
        student_id: studentId,
        first_name: app.student_first_name,
        last_name: app.student_last_name,
        grade_level: app.grade_level,
        homeroom: null,
        user_id: stuAuth.user?.id || null,
      };
      const { data, error } = await admin.from('students').insert(baseStudent).select('id').single();
      if (error) return res.status(400).json({ error: error.message });
      stuRow = data;
    }

    // Store student credentials
    await admin.from('student_credentials').insert({
      student_row_id: stuRow.id,
      student_id: studentId,
      email: studentEmail,
      initial_password: studentPassword,
    });

    // 2) Register parent
    const { data: parentIdData, error: parentIdError } = await admin.rpc('generate_parent_id');
    if (parentIdError) return res.status(400).json({ error: parentIdError.message });
    const parentId = parentIdData;
    const parentPassword = `${(app.parent_first_name || 'parent').toLowerCase()}${(app.parent_last_name || 'user').toLowerCase()}2024`;
    let parentEmail = (app.parent_email || '').trim().toLowerCase();
    if (!parentEmail) parentEmail = `${parentId}@parents.finoteloza.edu`;
    let parAuth = null;
    {
      const attempt = await admin.auth.admin.createUser({
        email: parentEmail,
        password: parentPassword,
        email_confirm: true,
        user_metadata: { role: 'parent', parent_id: parentId, first_name: app.parent_first_name, last_name: app.parent_last_name },
      });
      if (attempt.error) {
        // Fallback to generated email if provided email is already used/invalid
        parentEmail = `${parentId}@parents.finoteloza.edu`;
        const fallback = await admin.auth.admin.createUser({
          email: parentEmail,
          password: parentPassword,
          email_confirm: true,
          user_metadata: { role: 'parent', parent_id: parentId, first_name: app.parent_first_name, last_name: app.parent_last_name },
        });
        if (fallback.error) return res.status(400).json({ error: fallback.error.message });
        parAuth = fallback.data;
      } else {
        parAuth = attempt.data;
      }
    }

    const parentPayloadExtended = {
      parent_id: parentId,
      user_id: parAuth.user.id,
      first_name: app.parent_first_name,
      last_name: app.parent_last_name,
      email: parentEmail,
      phone: app.parent_phone,
      address: app.address,
      emergency_contact_name: app.emergency_contact_name,
      emergency_contact_phone: app.emergency_contact_phone,
      occupation: app.parent_occupation || null,
      employer: app.parent_employer || null,
    };
    let parRow = null;
    {
      const { data, error } = await admin.from('parents').insert(parentPayloadExtended).select('id').single();
      if (error) {
        const parentPayloadBase = {
          parent_id: parentId,
          user_id: parAuth.user.id,
          first_name: app.parent_first_name,
          last_name: app.parent_last_name,
          email: parentEmail,
          phone: app.parent_phone,
          address: app.address,
          emergency_contact_name: app.emergency_contact_name,
          emergency_contact_phone: app.emergency_contact_phone,
        };
        const fb = await admin.from('parents').insert(parentPayloadBase).select('id').single();
        if (fb.error) return res.status(400).json({ error: fb.error.message });
        parRow = fb.data;
      } else {
        parRow = data;
      }
    }
    if (parErr) return res.status(400).json({ error: parErr.message });

    // Store parent credentials
    await admin.from('parent_credentials').insert({
      parent_row_id: parRow.id,
      parent_id: parentId,
      email: parentEmail,
      initial_password: parentPassword,
    });

    // 3) Link parent to student
    const { error: linkErr } = await admin
      .from('parent_students')
      .insert({ parent_id: parRow.id, student_id: stuRow.id, relationship: 'parent' });
    if (linkErr) return res.status(400).json({ error: linkErr.message });

    // 4) Update application
    const { error: updErr } = await admin
      .from('applications')
      .update({ status: 'accepted', registered_student_id: stuRow.id, decided_at: new Date().toISOString() })
      .eq('id', applicationId);
    if (updErr) return res.status(400).json({ error: updErr.message });

    return res.status(200).json({
      success: true,
      student: { id: stuRow.id, student_id: studentId, email: studentEmail },
      parent: { id: parRow.id, parent_id: parentId, email: parentEmail },
      credentials: {
        student: { username: studentId, email: studentEmail, password: studentPassword },
        parent: { parent_id: parentId, email: parentEmail, password: parentPassword },
      },
    });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}





