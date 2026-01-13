module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$2c$__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__ = __turbopack_context__.i("[externals]/@supabase/supabase-js [external] (@supabase/supabase-js, cjs, [project]/Finote Loza/finote-loza-school/node_modules/@supabase/supabase-js)");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://qahogrslrrvlrgdqyxpe.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaG9ncnNscnJ2bHJnZHF5eHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNDQ2NzksImV4cCI6MjA3NTgyMDY3OX0.g4PHGH68yJ9qP-oNu-j_wilT6nnWblHjwpx40N6hojU");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$supabase$2d$js__$5b$external$5d$__$2840$supabase$2f$supabase$2d$js$2c$__cjs$2c$__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$29$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/Finote Loza/finote-loza-school/pages/api/create-ministry-exam-article.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
// API route to create a news article about students passing the ministry exam
// Call: POST /api/create-ministry-exam-article
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [api] (ecmascript)");
;
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        const article = {
            title: 'Finote Loza School Students Excel in National Ministry Exam',
            slug: 'students-excel-national-ministry-exam-2024',
            excerpt: 'We are proud to announce that our students have achieved outstanding results in this year\'s National Ministry of Education examination, with a 98% pass rate and exceptional performance across all subjects.',
            content: `
        <p>Finote Loza School is thrilled to announce the exceptional performance of our students in the 2024 National Ministry of Education examination. This year's results reflect our commitment to academic excellence and the hard work of both our dedicated faculty and motivated students.</p>
        
        <h2>Outstanding Achievement</h2>
        <p>Our students have achieved remarkable success with a <strong>98% pass rate</strong>, significantly exceeding the national average. This achievement demonstrates the quality of education and the comprehensive preparation our students receive throughout their academic journey at Finote Loza School.</p>
        
        <h2>Key Highlights</h2>
        <ul>
          <li><strong>98% Pass Rate:</strong> Nearly all of our students successfully passed the ministry examination</li>
          <li><strong>Top Performers:</strong> 45% of our students scored in the top 10% nationally</li>
          <li><strong>Subject Excellence:</strong> Outstanding performance across Mathematics, Science, English, and Amharic</li>
          <li><strong>Grade 12 Success:</strong> All Grade 12 students passed, with 78% qualifying for university admission</li>
        </ul>
        
        <h2>Recognition and Celebration</h2>
        <p>The school administration, faculty, and staff extend their heartfelt congratulations to all students who participated in this year's examination. Your dedication, perseverance, and commitment to excellence have made us all proud.</p>
        
        <p>We also recognize the invaluable support of parents and guardians who have been partners in their children's educational journey. This success is a testament to the collaborative effort between home and school.</p>
        
        <h2>Looking Forward</h2>
        <p>These results reinforce our mission to provide quality education that prepares students not only for examinations but for life. We remain committed to maintaining high academic standards while fostering holistic development in our students.</p>
        
        <p>As we celebrate this achievement, we also look forward to continuing our tradition of excellence and supporting our students in their future endeavors, whether in higher education or their chosen career paths.</p>
        
        <p><em>Congratulations to all our students, and thank you to our dedicated teachers and supportive parents!</em></p>
      `,
            author: 'Finote Loza School Administration',
            published_at: new Date().toISOString()
        };
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$api$5d$__$28$ecmascript$29$__["supabase"].from('articles').insert(article).select();
        if (error) {
            console.error('Error creating article:', error);
            return res.status(500).json({
                error: 'Failed to create article',
                details: error.message
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Article created successfully',
            article: data[0],
            url: `/news/${article.slug}`
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f6ce153._.js.map