import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });
    const supabase = createClient(url, key);

    const { q = '', grade = '' } = req.query || {};

    let query = supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (grade) {
      query = query.eq('grade_level', grade);
    }

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });

    const normalizedQ = String(q).trim().toLowerCase();
    const filtered = !normalizedQ
      ? data || []
      : (data || []).filter((s) => {
          const fullName = `${s.first_name || ''} ${s.last_name || ''}`.trim().toLowerCase();
          const sid = (s.student_id || '').toLowerCase();
          return fullName.includes(normalizedQ) || sid.includes(normalizedQ);
        });

    const header = [
      'student_id',
      'first_name',
      'last_name',
      'grade_level',
      'homeroom',
      'date_of_birth',
      'gender',
      'email',
      'phone',
      'address',
      'previous_school',
      'previous_school_address',
      'previous_school_phone',
      'reason_for_leaving',
      'special_needs',
      'medical_conditions',
      'emergency_contact_name',
      'emergency_contact_phone',
      'emergency_contact_relationship',
    ];

    const escape = (value) => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      // Escape double quotes by doubling them
      const escaped = str.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const rows = filtered.map((s) =>
      [
        s.student_id,
        s.first_name,
        s.last_name,
        s.grade_level,
        s.homeroom,
        s.date_of_birth,
        s.gender,
        s.email,
        s.phone,
        s.address,
        s.previous_school,
        s.previous_school_address,
        s.previous_school_phone,
        s.reason_for_leaving,
        s.special_needs,
        s.medical_conditions,
        s.emergency_contact_name,
        s.emergency_contact_phone,
        s.emergency_contact_relationship,
      ]
        .map(escape)
        .join(',')
    );

    const csv = [header.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="students.csv"');
    return res.status(200).send(csv);
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


