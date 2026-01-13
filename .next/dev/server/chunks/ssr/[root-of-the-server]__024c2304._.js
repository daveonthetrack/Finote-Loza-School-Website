module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/Finote Loza/finote-loza-school/components/AdminLayout.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [ssr] (ecmascript)");
;
;
;
;
function NavLink({ href, label }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const active = router.asPath.startsWith(href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: 'block rounded-md px-3 py-2 text-sm ' + (active ? 'bg-navy-700 text-white' : 'text-navy-900 hover:bg-navy-100'),
        children: label
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function AdminLayout({ children }) {
    async function signOut() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        window.location.href = '/admin/login';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                        className: "bg-white border border-gray-100 rounded-xl shadow-soft p-4 h-max sticky top-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "font-display text-lg text-navy-800",
                                children: "Admin"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                                className: "mt-3 space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/dashboard",
                                        label: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/articles",
                                        label: "Articles"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/events",
                                        label: "Events"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/photos",
                                        label: "Photos"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/students",
                                        label: "Students"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/teachers",
                                        label: "Teachers"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 39,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/parents",
                                        label: "Parents"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 40,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/applications",
                                        label: "Applications"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 41,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/announcements",
                                        label: "Announcements"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/assignments",
                                        label: "Assignments"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/grades",
                                        label: "Grades"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/teacher-debug",
                                        label: "Teacher Debug"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/content",
                                        label: "Content"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/content-settings",
                                        label: "Content Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/settings",
                                        label: "Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: signOut,
                                className: "mt-4 w-full rounded-md border px-3 py-2 text-sm",
                                children: "Sign out"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                lineNumber: 30,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/Finote Loza/finote-loza-school/components/AdminGuard.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminGuard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [ssr] (ecmascript)");
;
;
;
;
function AdminGuard({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('loading');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let mounted = true;
        (async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
            if (!mounted) return;
            if (data?.session) setStatus('authed');
            else {
                setStatus('anon');
                router.replace('/admin/login');
            }
        })();
        const { data: sub } = __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange((_e, session)=>{
            if (!mounted) return;
            if (session) setStatus('authed');
            else {
                setStatus('anon');
                router.replace('/admin/login');
            }
        });
        return ()=>{
            mounted = false;
            sub?.subscription?.unsubscribe();
        };
    }, [
        router
    ]);
    if (status === 'loading') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-[40vh] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "h-8 w-8 rounded-full border-4 border-navy-200 border-t-gold-500 animate-spin"
            }, void 0, false, {
                fileName: "[project]/Finote Loza/finote-loza-school/components/AdminGuard.js",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/components/AdminGuard.js",
            lineNumber: 33,
            columnNumber: 7
        }, this);
    }
    if (status === 'authed') return children;
    return null;
}
}),
"[project]/Finote Loza/finote-loza-school/lib/printStudentIdCard.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Centralized Student ID card print template.
// Used by admin student list + admin student detail.
__turbopack_context__.s([
    "openStudentIdCardPrintWindow",
    ()=>openStudentIdCardPrintWindow
]);
function openStudentIdCardPrintWindow(student, options = {}) {
    if (!student) return;
    const opts = {
        schoolName: options.schoolName || 'Finote Loza School',
        // Prefer provided logo URL; otherwise fall back to the bundled app logo.
        logoUrl: options.logoUrl || '/logo.png',
        website: options.website || 'www.finoteloza.edu',
        phone: options.phone || '+251 11 123 4567',
        address: options.address || 'Addis Ababa, Ethiopia',
        academicYear: options.academicYear || null,
        issuedAt: options.issuedAt || new Date(),
        // QR data to encode. If not provided, we encode the student_id.
        // (Uses an external QR image service.)
        qrData: options.qrData || ''
    };
    const s = student;
    const safe = (v)=>String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    const fullName = [
        s.first_name,
        s.middle_name,
        s.last_name
    ].filter(Boolean).join(' ');
    const initials = `${s.first_name?.[0] || 'S'}${s.last_name?.[0] || 'T'}`.toUpperCase();
    const schoolInitials = String(opts.schoolName || '').split(/\s+/).filter(Boolean).slice(0, 4).map((w)=>w[0].toUpperCase()).join('');
    const gradeSection = s.grade_level && s.homeroom ? `${s.grade_level}${s.homeroom}` : s.grade_level || s.homeroom || 'N/A';
    const currentYear = new Date().getFullYear();
    const academicYear = opts.academicYear || `${currentYear - 1}-${currentYear}`;
    const issuedStr = new Date(opts.issuedAt).toLocaleDateString();
    const validThrough = `${currentYear}`;
    // Optional QR image
    // QR should encode ONLY the Student ID (per request).
    const qrPayload = opts.qrData || (s.student_id ? String(s.student_id) : '');
    const qrImg = qrPayload ? `<img class="qr" alt="QR" src="https://api.qrserver.com/v1/create-qr-code/?size=92x92&data=${encodeURIComponent(qrPayload)}" />` : '';
    const logoHtml = `<img class="logo-img" alt="Logo" src="${safe(opts.logoUrl)}" />`;
    const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Student ID Card - ${safe(fullName || s.student_id || '')}</title>
      <style>
        @page { size: 3.375in 2.125in; margin: 0; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 20px;
          background: #f3f4f6;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .toolbar {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 0 0 16px;
        }
        .btn {
          appearance: none;
          border: 1px solid #d1d5db;
          background: #fff;
          padding: 8px 10px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
        }
        .btn.primary { background: #0b1b3f; color: #fff; border-color: #0b1b3f; }
        .pages { display: grid; gap: 16px; justify-content: center; }
        .page { display: grid; gap: 10px; justify-items: center; }

        /* Card */
        .card {
          width: 3.375in;
          height: 2.125in;
          border: 2px solid #0b1b3f;
          border-radius: 10px;
          overflow: hidden;
          background: white;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 18px rgba(0,0,0,0.12);
        }
        .header {
          background: linear-gradient(135deg, #0b1b3f 0%, #1e3a8a 100%);
          color: #fff;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .logo-circle {
          width: 30px; height: 30px;
          border-radius: 9999px;
          background: #f5cf5d;
          color: #0b1b3f;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900;
          font-size: 12px;
          flex: 0 0 auto;
        }
        .logo-img {
          width: 30px; height: 30px;
          border-radius: 9999px;
          background: #fff;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.35);
          flex: 0 0 auto;
        }
        .school {
          font-weight: 800;
          font-size: 10px;
          line-height: 1.1;
          /* Allow wrapping so long school names don't get cut off */
          white-space: normal;
          overflow: hidden;
          max-width: 180px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .tag {
          font-size: 9px;
          letter-spacing: 0.12em;
          opacity: 0.92;
          font-weight: 700;
        }
        .body {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: 86px 1fr;
          gap: 12px;
          padding: 12px;
          position: relative;
        }
        .wm {
          position: absolute;
          right: 10px;
          bottom: 6px;
          font-weight: 900;
          font-size: 44px;
          letter-spacing: 0.08em;
          color: #0b1b3f;
          opacity: 0.06;
          transform: rotate(-12deg);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .photo {
          width: 86px;
          height: 1.17in;
          border-radius: 8px;
          border: 2px solid #dbe3ee;
          overflow: hidden;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: inset 0 0 0 1px rgba(11,27,63,0.06), 0 2px 8px rgba(0,0,0,0.08);
        }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        .photo .ph {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #f5cf5d 0%, #e5d4a0 100%);
          color: #0b1b3f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 26px;
        }
        .name {
          font-size: 12px;
          font-weight: 900;
          color: #0b1b3f;
          line-height: 1.12;
          margin-bottom: 6px;
          /* Allow 2 lines then ellipsis */
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .meta {
          display: grid;
          gap: 5px;
        }
        .front-info {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .front-spacer { flex: 1; min-height: 0; }
        .front-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }
        .badge {
          flex: 0 0 auto;
          font-size: 8px;
          letter-spacing: 0.14em;
          font-weight: 900;
          text-transform: uppercase;
          color: #0b1b3f;
          background: rgba(245, 207, 93, 0.85);
          border: 1px solid rgba(11, 27, 63, 0.18);
          padding: 3px 6px;
          border-radius: 9999px;
          line-height: 1;
          margin-top: 1px;
          white-space: nowrap;
        }
        .label {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #6b7280;
          margin-bottom: 1px;
          font-weight: 700;
        }
        .value {
          font-size: 10px;
          color: #111827;
          font-weight: 700;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .id-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 7px;
          border-radius: 8px;
          background: rgba(30, 58, 138, 0.06);
          border: 1px solid rgba(30, 58, 138, 0.18);
          max-width: 100%;
        }
        .sid {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          letter-spacing: 0.08em;
          color: #1e3a8a;
          font-weight: 900;
          font-size: 11px;
        }
        /* (Removed) Barcode block on front side */
        .tight-row {
          display: flex;
          gap: 8px;
        }
        .tight-row > div {
          flex: 1;
          min-width: 0;
        }
        .footer {
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 7px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 7.5px;
          line-height: 1.15;
          color: #6b7280;
        }

        /* Back side */
        .back {
          /* Let the middle section naturally take remaining space between header/footer */
          flex: 1;
          min-height: 0;
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: stretch;
        }
        .if-found {
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          padding: 7px;
          font-size: 8.5px;
          line-height: 1.25;
          color: #0b1b3f;
          background: #ffffff;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        /* Allow address + contact to wrap cleanly without pushing content out */
        .if-found .addr {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
        .if-found strong { font-size: 9px; }
        .small {
          font-size: 7.5px;
          color: #6b7280;
          margin-top: 5px;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }
        .sig {
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px solid #e5e7eb;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .sig .line {
          flex: 1;
          border-bottom: 1px solid #9ca3af;
          height: 11px;
        }
        .sig .cap { font-size: 8px; color: #6b7280; margin-top: 2px; }
        .qr {
          width: 92px;
          height: 92px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #fff;
        }
        .back-right {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
          justify-content: space-between;
          min-width: 0;
        }
        .back-meta {
          font-size: 8px;
          color: #6b7280;
          text-align: right;
          line-height: 1.25;
          overflow-wrap: anywhere;
          max-width: 92px;
        }
        .clamp-3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        /* Print: hide toolbar and force 2 pages (front + back) */
        @media print {
          body { background: #fff; padding: 0; }
          .toolbar { display: none; }
          .pages { gap: 0; }
          .page { page-break-after: always; }
          .page:last-child { page-break-after: auto; }
          .card { box-shadow: none; border-radius: 0; }
        }
      </style>
    </head>
    <body>
      <div class="toolbar">
        <button class="btn primary" onclick="printBoth()">Print Front + Back</button>
        <button class="btn" onclick="printFront()">Print Front Only</button>
        <button class="btn" onclick="printBack()">Print Back Only</button>
      </div>

      <div class="pages">
        <!-- FRONT -->
        <div class="page" id="frontPage">
          <div class="card">
            <div class="header">
              <div class="brand">
                ${logoHtml}
                <div class="school">${safe(opts.schoolName)}</div>
              </div>
              <div class="tag">STUDENT ID</div>
            </div>
            <div class="body">
              <div class="wm">${safe(schoolInitials || 'FLS')}</div>
              <div class="photo">
                ${s.photo_url ? `<img src="${safe(s.photo_url)}" alt="${safe(fullName)}" onerror="this.remove(); document.getElementById('ph').style.display='flex';" />` : ''}
                <div class="ph" id="ph" style="display:${s.photo_url ? 'none' : 'flex'}">${safe(initials)}</div>
              </div>
              <div class="front-info">
                <div class="front-top">
                  <div class="name" id="studentName">${safe(fullName || 'Student')}</div>
                  <div class="badge">STUDENT</div>
                </div>
                <div class="meta" style="min-height:0;">
                  <div>
                    <div class="label">Student ID</div>
                    <div class="id-chip"><span class="value sid">${safe(s.student_id || 'N/A')}</span></div>
                  </div>
                  <div>
                    <div class="label">Grade & Section</div>
                    <div class="value">${safe(gradeSection)}</div>
                  </div>
                  <div class="tight-row">
                    <div>
                      <div class="label">Academic Year</div>
                      <div class="value">${safe(academicYear)}</div>
                    </div>
                    <div>
                      <div class="label">Issued</div>
                      <div class="value">${safe(issuedStr)}</div>
                    </div>
                  </div>
                </div>
                <!-- Barcode removed (per request) -->
              </div>
            </div>
            <div class="footer">
              <div>${safe(opts.website)}</div>
              <div>Valid ${safe(validThrough)}</div>
            </div>
          </div>
        </div>

        <!-- BACK -->
        <div class="page" id="backPage">
          <div class="card">
            <div class="header">
              <div class="brand">
                ${logoHtml}
                <div class="school">${safe(opts.schoolName)}</div>
              </div>
              <div class="tag">INFORMATION</div>
            </div>
            <div class="back">
              <div class="if-found">
                <strong>IF FOUND, PLEASE RETURN TO:</strong><br/>
                <span class="addr">${safe(opts.schoolName)}<br/>${safe(opts.address)}</span><br/>
                <span class="small clamp-3">Phone: ${safe(opts.phone)} • Web: ${safe(opts.website)}</span>
                <div class="sig">
                  <div style="flex:1;">
                    <div class="line"></div>
                    <div class="cap">Student Signature</div>
                  </div>
                  <div style="flex:1;">
                    <div class="line"></div>
                    <div class="cap">Registrar</div>
                  </div>
                </div>
              </div>
              <div class="back-right">
                ${qrImg || '<div style="width:92px;height:92px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:8px;text-align:center;padding:8px;">QR unavailable</div>'}
                <div class="back-meta">
                  <div><strong>ID:</strong> ${safe(s.student_id || 'N/A')}</div>
                  <div><strong>Grade:</strong> ${safe(gradeSection)}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <div>Property of ${safe(opts.schoolName)}</div>
              <div>Scan ID • ${safe(currentYear)}</div>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Reduce the student name font size if it overflows its 2-line clamp.
        (function autoFitName() {
          var el = document.getElementById('studentName');
          if (!el) return;
          // Try shrinking a bit until it fits (max 6 steps).
          for (var i = 0; i < 6; i++) {
            // If content overflows (scrollHeight bigger than clientHeight), shrink.
            if (el.scrollHeight > el.clientHeight + 1) {
              var size = parseFloat(window.getComputedStyle(el).fontSize || '12');
              if (size <= 9) break;
              el.style.fontSize = (size - 0.5) + 'px';
            } else {
              break;
            }
          }
        })();

        function show(el, on) { if (!el) return; el.style.display = on ? '' : 'none'; }
        function printFront() { show(document.getElementById('frontPage'), true); show(document.getElementById('backPage'), false); window.print(); }
        function printBack() { show(document.getElementById('frontPage'), false); show(document.getElementById('backPage'), true); window.print(); }
        function printBoth() { show(document.getElementById('frontPage'), true); show(document.getElementById('backPage'), true); window.print(); }
        window.onload = function() { setTimeout(printBoth, 200); };
      </script>
    </body>
  </html>`;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
}
}),
"[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminStudents
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/components/AdminLayout.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/components/AdminGuard.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$settingsContext$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/settingsContext.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$printStudentIdCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/printStudentIdCard.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function AdminStudents() {
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$settingsContext$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    const [students, setStudents] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        firstName: '',
        lastName: '',
        gradeLevel: '',
        homeroom: ''
    });
    const [creating, setCreating] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [lastCreds, setLastCreds] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [grade, setGrade] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [importing, setImporting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [importLog, setImportLog] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const gradeLevels = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
    ];
    const homerooms = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H'
    ];
    const totalStudents = students.length;
    const gradeOptions = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>Array.from(new Set((students || []).map((s)=>s.grade_level || '').filter((g)=>g && g.trim().length > 0))).sort(), [
        students
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        load();
    }, []);
    async function load() {
        try {
            const params = new URLSearchParams();
            if (search) params.set('q', search);
            if (grade) params.set('grade', grade);
            const res = await fetch(`/api/admin/students/list?${params.toString()}`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Failed to load students');
            setStudents(json.students || []);
        } catch (e) {
            console.error(e);
            setStudents([]);
        }
    }
    async function onCreate(e) {
        e.preventDefault();
        setCreating(true);
        const res = await fetch('/api/register-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        setCreating(false);
        const json = await res.json();
        if (!res.ok) {
            alert(json.error || 'Failed');
            return;
        }
        setLastCreds(json);
        setForm({
            firstName: '',
            lastName: '',
            gradeLevel: '',
            homeroom: ''
        });
        load();
    }
    const filtered = students;
    function onExportCsv() {
        const params = new URLSearchParams();
        if (search) params.set('q', search);
        if (grade) params.set('grade', grade);
        const qs = params.toString();
        const url = `/api/admin/students/export${qs ? `?${qs}` : ''}`;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    async function onImportCsv(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setImporting(true);
        setImportLog([]);
        const text = await file.text();
        // Expected headers: first_name,last_name,grade_level,homeroom
        const lines = text.split(/\r?\n/).filter(Boolean);
        const [header, ...rows] = lines;
        const cols = header.split(',').map((c)=>c.trim().toLowerCase());
        const idx = {
            first: cols.indexOf('first_name'),
            last: cols.indexOf('last_name'),
            grade: cols.indexOf('grade_level'),
            room: cols.indexOf('homeroom')
        };
        for (const row of rows){
            const parts = row.split(',');
            const payload = {
                firstName: parts[idx.first]?.trim(),
                lastName: parts[idx.last]?.trim(),
                gradeLevel: parts[idx.grade]?.trim() || '',
                homeroom: parts[idx.room]?.trim() || ''
            };
            if (!payload.firstName || !payload.lastName) {
                setImportLog((l)=>[
                        ...l,
                        `Skipped row (missing name): ${row}`
                    ]);
                continue;
            }
            try {
                const res = await fetch('/api/register-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || 'Failed');
                setImportLog((l)=>[
                        ...l,
                        `OK ${payload.firstName} ${payload.lastName} -> ${json.studentId}`
                    ]);
            } catch (err) {
                setImportLog((l)=>[
                        ...l,
                        `ERR ${payload.firstName} ${payload.lastName}: ${err.message}`
                    ]);
            }
        }
        setImporting(false);
        load();
    }
    function printIdCard(s) {
        const schoolName = settings?.school_name || 'Finote Loza School';
        const logoUrl = settings?.logo_url || '';
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$printStudentIdCard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["openStudentIdCardPrintWindow"])(s, {
            schoolName,
            logoUrl,
            website: 'www.finoteloza.edu',
            phone: settings?.contact_phone || '+251 11 123 4567',
            address: settings?.address || 'Addis Ababa, Ethiopia'
        });
    }
    // actions moved to student profile page
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "heading-section",
                                        children: "Students"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-600",
                                        children: totalStudents === 0 ? 'No students loaded' : `${totalStudents} student${totalStudents !== 1 ? 's' : ''} loaded`
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onExportCsv,
                                className: "btn-secondary whitespace-nowrap",
                                disabled: totalStudents === 0,
                                children: "Export CSV"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: onCreate,
                        className: "mt-6 card p-6 grid md:grid-cols-5 gap-3 items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "md:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium",
                                        children: "First Name"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        className: "mt-1 w-full rounded-md border-gray-300",
                                        value: form.firstName,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                firstName: e.target.value
                                            }),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "md:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium",
                                        children: "Last Name"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        className: "mt-1 w-full rounded-md border-gray-300",
                                        value: form.lastName,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                lastName: e.target.value
                                            }),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "md:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium",
                                        children: "Grade"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        className: "mt-1 w-full rounded-md border-gray-300",
                                        value: form.gradeLevel,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                gradeLevel: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select grade"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            gradeLevels.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: g,
                                                    children: g
                                                }, g, false, {
                                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "md:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium",
                                        children: "Homeroom (Section)"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        className: "mt-1 w-full rounded-md border-gray-300",
                                        value: form.homeroom,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                homeroom: e.target.value
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select section"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this),
                                            homerooms.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: h,
                                                    children: h
                                                }, h, false, {
                                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "md:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    className: "btn-primary w-full",
                                    disabled: creating,
                                    children: creating ? 'Creating...' : 'Register Student'
                                }, void 0, false, {
                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium",
                                        children: "Search"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        className: "mt-1 w-full rounded-md border-gray-300",
                                        placeholder: "Name or ID",
                                        value: search,
                                        onChange: (e)=>{
                                            setSearch(e.target.value);
                                        },
                                        onBlur: load
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-secondary mt-2",
                                        onClick: load,
                                        children: "Search"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium",
                                        children: "Filter by Grade"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        className: "mt-1 w-full rounded-md border-gray-300",
                                        value: grade,
                                        onChange: (e)=>{
                                            setGrade(e.target.value);
                                        },
                                        onBlur: load,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "All grades"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this),
                                            gradeOptions.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: g,
                                                    children: g
                                                }, g, false, {
                                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                    lineNumber: 218,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "btn-secondary mt-2",
                                        onClick: load,
                                        children: "Apply"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "card p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium",
                                        children: "Bulk Import (CSV)"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: ".csv",
                                        className: "mt-1 w-full",
                                        onChange: onImportCsv,
                                        disabled: importing
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-2",
                                        children: "Headers: first_name,last_name,grade_level,homeroom"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this),
                    importLog.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-4 card p-4 text-xs max-h-48 overflow-auto",
                        children: importLog.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: l
                            }, i, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 234,
                                columnNumber: 40
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                        lineNumber: 233,
                        columnNumber: 13
                    }, this),
                    lastCreds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-4 card p-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "font-semibold",
                                children: "Credentials generated"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 240,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    "Username (Student ID): ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "font-mono",
                                        children: lastCreds.studentId
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 241,
                                        columnNumber: 43
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    "Temp Password: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "font-mono",
                                        children: lastCreds.password
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 242,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 242,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    "Email: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "font-mono",
                                        children: lastCreds.email
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                        lineNumber: 243,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 243,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500 mt-2",
                                children: "Share with the student and require password change on first login (we can add a flow)."
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 244,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                        lineNumber: 239,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-8",
                        children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "card p-8 text-center text-sm text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "font-semibold mb-2",
                                    children: "No students found"
                                }, void 0, false, {
                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                    lineNumber: 251,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    children: "Try adjusting your search or grade filter, or register a new student above."
                                }, void 0, false, {
                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                            lineNumber: 250,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "card overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                            className: "bg-gray-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left font-semibold",
                                                        children: "Student"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                        lineNumber: 260,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left font-semibold",
                                                        children: "ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                        lineNumber: 261,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left font-semibold",
                                                        children: "Grade"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                        lineNumber: 262,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left font-semibold",
                                                        children: "Homeroom"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                        lineNumber: 263,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left font-semibold",
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                        lineNumber: 264,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                lineNumber: 259,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                            lineNumber: 258,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                            children: filtered.map((s, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                    className: idx % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/admin/students/${s.id}`,
                                                                className: "text-navy-700 hover:underline",
                                                                children: [
                                                                    s.first_name,
                                                                    " ",
                                                                    s.last_name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                                lineNumber: 271,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                            lineNumber: 270,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 font-mono",
                                                            children: s.student_id
                                                        }, void 0, false, {
                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                            lineNumber: 275,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: s.grade_level || '-'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                            lineNumber: 276,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: s.homeroom || '-'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                            lineNumber: 277,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>printIdCard(s),
                                                                className: "text-navy-700",
                                                                children: "Print ID"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                                lineNumber: 279,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                            lineNumber: 278,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, s.id, true, {
                                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                                    lineNumber: 269,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                            lineNumber: 267,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                    lineNumber: 257,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                                lineNumber: 256,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                            lineNumber: 255,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
            lineNumber: 137,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/index.js",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__024c2304._.js.map