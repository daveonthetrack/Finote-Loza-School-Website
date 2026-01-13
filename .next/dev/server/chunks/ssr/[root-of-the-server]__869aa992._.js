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
                <div class="front-spacer"></div>
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
"[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentDetail
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/components/AdminLayout.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/components/AdminGuard.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/router.js [ssr] (ecmascript)");
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
function StudentDetail() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = router.query;
    const { settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$settingsContext$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSettings"])();
    const [student, setStudent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        // Student Information
        first_name: '',
        middle_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        grade_level: '',
        email: '',
        phone: '',
        address: '',
        homeroom: '',
        photo_url: '',
        // Emergency
        emergency_contact_name: '',
        emergency_contact_phone: '',
        emergency_contact_relationship: '',
        // Academic Information
        previous_school: '',
        previous_school_address: '',
        previous_school_phone: '',
        reason_for_leaving: '',
        special_needs: '',
        medical_conditions: '',
        // Additional Information
        extracurricular_activities: '',
        interests: '',
        goals: '',
        additional_info: ''
    });
    const [parentForm, setParentForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        occupation: '',
        employer: ''
    });
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
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (id) load();
    }, [
        id
    ]);
    async function load() {
        try {
            const res = await fetch(`/api/admin/students/detail?id=${id}`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Failed to load');
            const s = json.student;
            const p = json.parent;
            setStudent(s);
            setForm({
                first_name: s.first_name || '',
                middle_name: s.middle_name || '',
                last_name: s.last_name || '',
                date_of_birth: s.date_of_birth || '',
                gender: s.gender || '',
                grade_level: s.grade_level || '',
                email: s.email || '',
                phone: s.phone || '',
                address: s.address || '',
                homeroom: s.homeroom || '',
                photo_url: s.photo_url || '',
                emergency_contact_name: s.emergency_contact_name || '',
                emergency_contact_phone: s.emergency_contact_phone || '',
                emergency_contact_relationship: s.emergency_contact_relationship || '',
                previous_school: s.previous_school || '',
                previous_school_address: s.previous_school_address || '',
                previous_school_phone: s.previous_school_phone || '',
                reason_for_leaving: s.reason_for_leaving || '',
                special_needs: s.special_needs || '',
                medical_conditions: s.medical_conditions || '',
                extracurricular_activities: s.extracurricular_activities || '',
                interests: s.interests || '',
                goals: s.goals || '',
                additional_info: s.additional_info || ''
            });
            setParentForm({
                first_name: p?.first_name || '',
                last_name: p?.last_name || '',
                email: p?.email || '',
                phone: p?.phone || '',
                occupation: p?.occupation || '',
                employer: p?.employer || ''
            });
        } catch (e) {
            alert(e.message);
        }
    }
    async function onSave(e) {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/admin/students/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    student: form,
                    parent: parentForm
                })
            });
            const json = await res.json();
            setSaving(false);
            if (!res.ok) throw new Error(json.error || 'Failed to save');
            alert('Saved');
            // Refresh current data
            load();
        } catch (err) {
            setSaving(false);
            alert(err.message);
        }
    }
    async function onPhotoChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const key = `students/${student.student_id}-${Date.now()}`;
        const { error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('assets').upload(key, file, {
            upsert: true,
            cacheControl: '3600',
            contentType: file.type
        });
        if (uploadError) {
            alert(uploadError.message);
            setUploading(false);
            return;
        }
        const { data: publicUrl } = __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('assets').getPublicUrl(key);
        setStudent({
            ...student,
            photo_url: publicUrl.publicUrl
        });
        setForm({
            ...form,
            photo_url: publicUrl.publicUrl
        });
        setUploading(false);
    }
    async function onViewInitialCredentials() {
        try {
            const res = await fetch(`/api/admin/students/credentials?id=${id}`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Failed');
            const c = json.credentials;
            alert(`First credentials for ${student.first_name} ${student.last_name}\nID: ${c.student_id}\nEmail: ${c.email}\nPassword: ${c.initial_password}`);
        } catch (e) {
            alert(e.message);
        }
    }
    async function onDeleteStudent() {
        if (!confirm(`Delete ${student.first_name} ${student.last_name}? This cannot be undone.`)) return;
        try {
            const res = await fetch('/api/admin/students/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    deleteAuthUser: true
                })
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Failed to delete');
            router.replace('/admin/students');
        } catch (e) {
            alert(e.message);
        }
    }
    function printIdCard() {
        const s = student;
        if (!s) return;
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
    if (!student) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "py-2",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                lineNumber: 188,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
            lineNumber: 187,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
        lineNumber: 186,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "heading-section",
                        children: [
                            student.first_name,
                            " ",
                            student.last_name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: onSave,
                        className: "mt-6 grid lg:grid-cols-[1fr,380px] gap-8 items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "card p-6 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-3",
                                                children: "Student Information"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "First Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 205,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.first_name,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        first_name: e.target.value
                                                                    }),
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 206,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 204,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Middle Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 209,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.middle_name,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        middle_name: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 210,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 208,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Last Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 213,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.last_name,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        last_name: e.target.value
                                                                    }),
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 214,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 212,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Date of Birth"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 217,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.date_of_birth,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        date_of_birth: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 218,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 216,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Gender"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 221,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.gender,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        gender: e.target.value
                                                                    }),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                        lineNumber: 227,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "male",
                                                                        children: "Male"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                        lineNumber: 228,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "female",
                                                                        children: "Female"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                        lineNumber: 229,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 222,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 220,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Grade Level"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 233,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.grade_level,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        grade_level: e.target.value
                                                                    }),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select grade"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                        lineNumber: 239,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    gradeLevels.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                            value: g,
                                                                            children: g
                                                                        }, g, false, {
                                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                            lineNumber: 241,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 234,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 232,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 248,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "email",
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.email,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        email: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 249,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 247,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 252,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.phone,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        phone: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 253,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 251,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Address"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 256,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.address,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        address: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 257,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Homeroom (Section)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 260,
                                                                columnNumber: 21
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
                                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                        lineNumber: 266,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    homerooms.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                            value: h,
                                                                            children: h
                                                                        }, h, false, {
                                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                            lineNumber: 268,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 261,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 259,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Student ID (Username)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 275,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300 font-mono",
                                                                value: student.student_id,
                                                                disabled: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 276,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 274,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-3",
                                                children: "Parent/Guardian Information"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 283,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Parent First Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 286,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: parentForm.first_name,
                                                                onChange: (e)=>setParentForm({
                                                                        ...parentForm,
                                                                        first_name: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 287,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 285,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Parent Last Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 290,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: parentForm.last_name,
                                                                onChange: (e)=>setParentForm({
                                                                        ...parentForm,
                                                                        last_name: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 291,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 289,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Parent Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 294,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "email",
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: parentForm.email,
                                                                onChange: (e)=>setParentForm({
                                                                        ...parentForm,
                                                                        email: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 295,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 293,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Parent Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 298,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: parentForm.phone,
                                                                onChange: (e)=>setParentForm({
                                                                        ...parentForm,
                                                                        phone: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 299,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 297,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Occupation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 302,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: parentForm.occupation,
                                                                onChange: (e)=>setParentForm({
                                                                        ...parentForm,
                                                                        occupation: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 303,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 301,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Employer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 306,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: parentForm.employer,
                                                                onChange: (e)=>setParentForm({
                                                                        ...parentForm,
                                                                        employer: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 307,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 305,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 284,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-3 gap-4 mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Emergency Contact"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 312,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.emergency_contact_name,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        emergency_contact_name: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 313,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 311,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Emergency Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 316,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.emergency_contact_phone,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        emergency_contact_phone: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 317,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 315,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Relationship"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 320,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.emergency_contact_relationship,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        emergency_contact_relationship: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 321,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 319,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-3",
                                                children: "Academic Information"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 328,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Previous School"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 331,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.previous_school,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        previous_school: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 332,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 330,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Previous School Address"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 335,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.previous_school_address,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        previous_school_address: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 336,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 334,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Previous School Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 339,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.previous_school_phone,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        previous_school_phone: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 340,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 338,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Reason for Leaving"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 343,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                value: form.reason_for_leaving,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        reason_for_leaving: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 344,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 342,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Special Needs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 347,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                rows: 3,
                                                                value: form.special_needs,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        special_needs: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 348,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 346,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Medical Conditions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 351,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                rows: 3,
                                                                value: form.medical_conditions,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        medical_conditions: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 352,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 350,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 329,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-3",
                                                children: "Additional Information"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Extracurricular Activities"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 362,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                rows: 3,
                                                                value: form.extracurricular_activities,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        extracurricular_activities: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 363,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Interests"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 366,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                rows: 3,
                                                                value: form.interests,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        interests: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 367,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 365,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Goals"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 370,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                rows: 3,
                                                                value: form.goals,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        goals: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 371,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 369,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Additional Info"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 374,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                                className: "mt-1 w-full rounded-md border-gray-300",
                                                                rows: 3,
                                                                value: form.additional_info,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        additional_info: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 375,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 373,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "btn-primary",
                                            disabled: saving,
                                            children: saving ? 'Saving...' : 'Save Changes'
                                        }, void 0, false, {
                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                            lineNumber: 381,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 380,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "card p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "font-semibold mb-3",
                                                children: "Headshot Photo"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 387,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "aspect-[3/4] w-48 bg-gray-100 rounded-xl overflow-hidden",
                                                children: student.photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: student.photo_url,
                                                    alt: "headshot",
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                    lineNumber: 390,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-full flex items-center justify-center text-gray-400",
                                                    children: "No photo"
                                                }, void 0, false, {
                                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                    lineNumber: 392,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 388,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                className: "btn-secondary mt-3 inline-block cursor-pointer",
                                                children: [
                                                    uploading ? 'Uploading...' : 'Upload Photo',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: "image/*",
                                                        className: "hidden",
                                                        onChange: onPhotoChange,
                                                        disabled: uploading
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 397,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "card p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "font-semibold mb-3",
                                                children: "ID Card Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "border rounded-xl p-3 bg-white",
                                                style: {
                                                    width: 320
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "bg-navy-900 text-white px-3 py-2 rounded-md mb-2 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                src: settings?.logo_url || '/logo.png',
                                                                alt: settings?.school_name || 'Finote Loza School',
                                                                className: "w-6 h-6 rounded-full bg-white object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 406,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: settings?.school_name || 'Finote Loza School'
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 411,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 404,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "aspect-[16/9] bg-gray-100 rounded mb-2 overflow-hidden",
                                                        children: student.photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                            src: student.photo_url,
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                            lineNumber: 414,
                                                            columnNumber: 43
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-500",
                                                                children: "Student"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 416,
                                                                columnNumber: 44
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: [
                                                                    student.first_name,
                                                                    " ",
                                                                    student.last_name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 416,
                                                                columnNumber: 88
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 416,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-sm mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-500",
                                                                children: "ID"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 417,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "font-mono",
                                                                children: student.student_id
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 417,
                                                                columnNumber: 88
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 417,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 403,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "btn-primary mt-3",
                                                onClick: printIdCard,
                                                children: "Print ID Card"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 419,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "card p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "font-semibold mb-3",
                                                children: "Security"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 423,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "inline-flex items-center rounded-md border px-3 py-2",
                                                onClick: async ()=>{
                                                    const res = await fetch('/api/reset-student-password', {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify({
                                                            userId: student.user_id
                                                        })
                                                    });
                                                    const json = await res.json();
                                                    if (!res.ok) {
                                                        alert(json.error || 'Failed');
                                                        return;
                                                    }
                                                    alert(`Temporary password: ${json.newPassword}`);
                                                },
                                                disabled: !student.user_id,
                                                children: "Reset Password"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, this),
                                            !student.user_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-2",
                                                children: "No linked auth user. Create account from Applications or re-register the student."
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 436,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "mt-4 flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "btn-secondary",
                                                        onClick: onViewInitialCredentials,
                                                        children: "View Initial Credentials"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 438,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "inline-flex items-center rounded-md border border-red-300 text-red-700 px-3 py-2",
                                                        onClick: onDeleteStudent,
                                                        children: "Delete Student"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 439,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 437,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                lineNumber: 196,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
            lineNumber: 195,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__869aa992._.js.map