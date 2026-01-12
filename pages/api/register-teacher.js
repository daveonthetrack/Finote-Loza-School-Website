import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, department, subjects, employeeType, hireDate } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    // Generate teacher_id and password
    const pad = (n) => n.toString().padStart(4, '0');
    const year = new Date().getFullYear();
    
    // Get the next teacher number
    const { data: lastTeacher } = await supabaseAdmin
      .from('teachers')
      .select('teacher_id')
      .like('teacher_id', `TCH-${year}-%`)
      .order('teacher_id', { ascending: false })
      .limit(1)
      .single();

    let nextNumber = 1;
    if (lastTeacher) {
      const lastNumber = parseInt(lastTeacher.teacher_id.split('-')[2]);
      nextNumber = lastNumber + 1;
    }

    const teacherId = `TCH-${year}-${pad(nextNumber)}`;
    const password = `${firstName.toLowerCase()}${lastName.toLowerCase()}${year}`;

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        teacher_id: teacherId
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({ error: 'Failed to create teacher account: ' + authError.message });
    }

    // Create teacher record
    const { data: teacherData, error: teacherError } = await supabaseAdmin
      .from('teachers')
      .insert([{
        teacher_id: teacherId,
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        department: department || null,
        subjects: subjects ? subjects.split(',').map(s => s.trim()) : null,
        employee_type: employeeType || 'full-time',
        hire_date: hireDate || null,
        user_id: authData.user.id
      }])
      .select()
      .single();

    if (teacherError) {
      console.error('Teacher creation error:', teacherError);
      // Clean up auth user if teacher creation failed
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return res.status(400).json({ error: 'Failed to create teacher record: ' + teacherError.message });
    }

    res.status(200).json({
      success: true,
      teacher: teacherData,
      credentials: {
        teacher_id: teacherId,
        email,
        password
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
