module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Finote Loza/finote-loza-school/pages/api/admin/parents/list.js [api] (ecmascript)", ((__turbopack_context__) => {
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
        if (!url || !key) {
            return res.status(500).json({
                error: 'Server misconfigured'
            });
        }
        const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$2c$__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__["createClient"])(url, key);
        // Fetch parents
        const { data: parents, error: pErr } = await supabase.from('parents').select('*').order('created_at', {
            ascending: false
        });
        if (pErr) return res.status(400).json({
            error: pErr.message
        });
        // Fetch relationships in one query
        const { data: rels, error: rErr } = await supabase.from('parent_students').select('parent_id, students:students ( id, first_name, last_name, student_id )');
        if (rErr) return res.status(400).json({
            error: rErr.message
        });
        const parentIdToStudents = {};
        (rels || []).forEach((row)=>{
            if (!parentIdToStudents[row.parent_id]) parentIdToStudents[row.parent_id] = [];
            if (row.students) parentIdToStudents[row.parent_id].push(row.students);
        });
        const enriched = (parents || []).map((p)=>({
                ...p,
                linked_students: parentIdToStudents[p.id] || []
            }));
        return res.status(200).json({
            parents: enriched
        });
    } catch (e) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__55a9a460._.js.map