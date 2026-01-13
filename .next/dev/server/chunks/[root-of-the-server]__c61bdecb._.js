module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Finote Loza/finote-loza-school/pages/api/admin/students/update.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$2c$__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs, [project]/Finote Loza/finote-loza-school/node_modules/@supabase/supabase-js)");
;
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    const { id, student: studentInput = {}, parent: parentInput = null } = req.body || {};
    if (!id) return res.status(400).json({
        error: 'Missing student id'
    });
    try {
        const url = ("TURBOPACK compile-time value", "https://qahogrslrrvlrgdqyxpe.supabase.co");
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !key) return res.status(500).json({
            error: 'Server misconfigured'
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$2c$__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__["createClient"])(url, key);
        // Helper: treat empty strings as null so typed columns (like date) don't error
        const normalize = (value)=>{
            if (value === '' || value === undefined) return null;
            return value ?? null;
        };
        // Prepare student update payload (attempt extended fields, fallback to base fields)
        const extendedStudent = {
            first_name: normalize(studentInput.first_name),
            middle_name: normalize(studentInput.middle_name),
            last_name: normalize(studentInput.last_name),
            grade_level: normalize(studentInput.grade_level),
            homeroom: normalize(studentInput.homeroom),
            photo_url: normalize(studentInput.photo_url),
            date_of_birth: normalize(studentInput.date_of_birth),
            gender: normalize(studentInput.gender),
            email: normalize(studentInput.email),
            phone: normalize(studentInput.phone),
            address: normalize(studentInput.address),
            previous_school: normalize(studentInput.previous_school),
            previous_school_address: normalize(studentInput.previous_school_address),
            previous_school_phone: normalize(studentInput.previous_school_phone),
            reason_for_leaving: normalize(studentInput.reason_for_leaving),
            special_needs: normalize(studentInput.special_needs),
            medical_conditions: normalize(studentInput.medical_conditions),
            extracurricular_activities: normalize(studentInput.extracurricular_activities),
            interests: normalize(studentInput.interests),
            goals: normalize(studentInput.goals),
            additional_info: normalize(studentInput.additional_info),
            emergency_contact_name: normalize(studentInput.emergency_contact_name),
            emergency_contact_phone: normalize(studentInput.emergency_contact_phone),
            emergency_contact_relationship: normalize(studentInput.emergency_contact_relationship)
        };
        let updateError = null;
        let updateResult = null;
        // Try extended update first
        {
            const { error } = await supabase.from('students').update(extendedStudent).eq('id', id);
            updateError = error || null;
        }
        // Fallback to base fields if schema lacks columns
        if (updateError) {
            const baseStudent = {
                first_name: extendedStudent.first_name,
                last_name: extendedStudent.last_name,
                grade_level: extendedStudent.grade_level,
                homeroom: extendedStudent.homeroom,
                photo_url: extendedStudent.photo_url
            };
            const { error } = await supabase.from('students').update(baseStudent).eq('id', id);
            if (error) return res.status(400).json({
                error: error.message
            });
            updateResult = 'base';
        } else {
            updateResult = 'extended';
        }
        // Parent upsert/link (best-effort)
        let parentId = null;
        if (parentInput && (parentInput.email || parentInput.first_name || parentInput.last_name)) {
            // Find existing parent by email if provided
            let parentRow = null;
            if (parentInput.email) {
                const { data: existingByEmail } = await supabase.from('parents').select('*').eq('email', parentInput.email).maybeSingle();
                parentRow = existingByEmail || null;
            }
            if (!parentRow) {
                // Optionally find first linked parent for this student
                const { data: links } = await supabase.from('parent_students').select('parent_id').eq('student_id', id).limit(1);
                if (links && links.length > 0) parentId = links[0].parent_id;
            } else {
                parentId = parentRow.id;
            }
            const parentPayloadExtended = {
                first_name: parentInput.first_name ?? null,
                last_name: parentInput.last_name ?? null,
                email: parentInput.email ?? null,
                phone: parentInput.phone ?? null,
                occupation: parentInput.occupation ?? null,
                employer: parentInput.employer ?? null
            };
            let parentError = null;
            if (parentId) {
                const { error } = await supabase.from('parents').update(parentPayloadExtended).eq('id', parentId);
                parentError = error || null;
            } else {
                const { data, error } = await supabase.from('parents').insert(parentPayloadExtended).select('id').single();
                parentError = error || null;
                if (!error) parentId = data.id;
            }
            if (parentError) {
                // Fallback to base parent fields
                const parentPayloadBase = {
                    first_name: parentPayloadExtended.first_name,
                    last_name: parentPayloadExtended.last_name,
                    email: parentPayloadExtended.email,
                    phone: parentPayloadExtended.phone
                };
                if (parentId) {
                    await supabase.from('parents').update(parentPayloadBase).eq('id', parentId);
                } else {
                    const { data } = await supabase.from('parents').insert(parentPayloadBase).select('id').single();
                    parentId = data?.id || parentId;
                }
            }
            // Ensure link exists
            if (parentId) {
                const { data: existingLink } = await supabase.from('parent_students').select('parent_id, student_id').eq('parent_id', parentId).eq('student_id', id).maybeSingle();
                if (!existingLink) {
                    await supabase.from('parent_students').insert({
                        parent_id: parentId,
                        student_id: id
                    });
                }
            }
        }
        return res.status(200).json({
            success: true,
            mode: updateResult
        });
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c61bdecb._.js.map