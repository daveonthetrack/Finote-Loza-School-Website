module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Finote Loza/finote-loza-school/pages/api/admin/students/list.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$2c$__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs, [project]/Finote Loza/finote-loza-school/node_modules/@supabase/supabase-js)");
;
async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        const url = ("TURBOPACK compile-time value", "https://qahogrslrrvlrgdqyxpe.supabase.co");
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !key) return res.status(500).json({
            error: 'Server misconfigured'
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$2c$__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__["createClient"])(url, key);
        const { q = '', grade = '' } = req.query || {};
        let query = supabase.from('students').select('*').order('created_at', {
            ascending: false
        });
        if (grade) {
            query = query.eq('grade_level', grade);
        }
        const { data, error } = await query;
        if (error) return res.status(400).json({
            error: error.message
        });
        const normalizedQ = String(q).trim().toLowerCase();
        const filtered = !normalizedQ ? data || [] : (data || []).filter((s)=>{
            const fullName = [
                s.first_name,
                s.middle_name,
                s.last_name
            ].filter(Boolean).join(' ').toLowerCase();
            const sid = (s.student_id || '').toLowerCase();
            return fullName.includes(normalizedQ) || sid.includes(normalizedQ);
        });
        return res.status(200).json({
            students: filtered
        });
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5d74e0e4._.js.map