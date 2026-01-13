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
;
;
;
;
;
;
function StudentDetail() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = router.query;
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
        const fullName = `${s.first_name || ''} ${s.middle_name || ''} ${s.last_name || ''}`.trim();
        const gradeSection = s.grade_level && s.homeroom ? `${s.grade_level}${s.homeroom}` : s.grade_level || s.homeroom || 'N/A';
        const currentYear = new Date().getFullYear();
        const academicYear = `${currentYear - 1}-${currentYear}`;
        const w = window.open('', '_blank');
        w.document.write(`
      <!DOCTYPE html>
      <html><head>
        <title>Student ID Card - ${fullName}</title>
        <meta charset="utf-8">
        <style>
          @page {
            size: 3.375in 2.125in;
            margin: 0;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: #f3f4f6;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .card-container {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
          }
          .card {
            width: 3.375in;
            height: 2.125in;
            border: 2px solid #0b1b3f;
            border-radius: 8px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .card-header {
            background: linear-gradient(135deg, #0b1b3f 0%, #1e3a8a 100%);
            color: #fff;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 10px;
          }
          .logo-section {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .logo-circle {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #f5cf5d;
            color: #0b1b3f;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 12px;
            flex-shrink: 0;
          }
          .school-name {
            font-weight: 700;
            font-size: 11px;
            line-height: 1.2;
          }
          .card-body {
            flex: 1;
            display: flex;
            padding: 10px 12px;
            gap: 12px;
          }
          .photo-section {
            width: 80px;
            height: 100px;
            flex-shrink: 0;
            border: 2px solid #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            background: #f9fafb;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .photo-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .photo-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5cf5d 0%, #e5d4a0 100%);
            color: #0b1b3f;
            font-weight: 700;
            font-size: 24px;
          }
          .info-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 0;
          }
          .info-row {
            margin-bottom: 4px;
          }
          .info-label {
            font-size: 8px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 1px;
          }
          .info-value {
            font-weight: 600;
            color: #0b1b3f;
            font-size: 11px;
            word-break: break-word;
          }
          .student-name {
            font-size: 13px;
            font-weight: 700;
            color: #0b1b3f;
            margin-bottom: 6px;
          }
          .student-id {
            font-size: 12px;
            font-weight: 600;
            color: #1e3a8a;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
          }
          .card-footer {
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            padding: 6px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 8px;
            color: #6b7280;
          }
          .barcode-area {
            height: 20px;
            background: repeating-linear-gradient(
              90deg,
              #000 0px,
              #000 1px,
              transparent 1px,
              transparent 2px
            );
            background-size: 2px 20px;
            border: 1px solid #e5e7eb;
            border-radius: 2px;
            margin-top: 4px;
          }
          @media print {
            body {
              background: white;
              padding: 0;
            }
            .card-container {
              gap: 0;
            }
            .card {
              page-break-inside: avoid;
              margin: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          <div class="card">
            <div class="card-header">
              <div class="logo-section">
                <div class="logo-circle">FL</div>
                <div class="school-name">Finote Loza<br>School</div>
              </div>
              <div style="font-size: 9px; opacity: 0.9;">STUDENT ID</div>
            </div>
            <div class="card-body">
              <div class="photo-section">
                ${s.photo_url ? `<img src="${s.photo_url}" alt="${fullName}" onerror="this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>${s.first_name?.[0] || ''}${s.last_name?.[0] || ''}</div>'"/>` : `<div class="photo-placeholder">${s.first_name?.[0] || 'S'}${s.last_name?.[0] || 'T'}</div>`}
              </div>
              <div class="info-section">
                <div>
                  <div class="student-name">${fullName}</div>
                  <div class="info-row">
                    <div class="info-label">Student ID</div>
                    <div class="student-id">${s.student_id || 'N/A'}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Grade & Section</div>
                    <div class="info-value">${gradeSection}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Academic Year</div>
                    <div class="info-value">${academicYear}</div>
                  </div>
                </div>
                <div class="barcode-area" title="${s.student_id || ''}"></div>
              </div>
            </div>
            <div class="card-footer">
              <div>www.finoteloza.edu</div>
              <div>Valid ${currentYear}</div>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 250);
          };
        </script>
      </body></html>
    `);
        w.document.close();
    }
    if (!student) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "py-2",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                lineNumber: 414,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
            lineNumber: 413,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
        lineNumber: 412,
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
                        lineNumber: 423,
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
                                                lineNumber: 428,
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
                                                                lineNumber: 431,
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
                                                                lineNumber: 432,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 430,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Middle Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 435,
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
                                                                lineNumber: 436,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 434,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Last Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 439,
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
                                                                lineNumber: 440,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 438,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Date of Birth"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 443,
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
                                                                lineNumber: 444,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 442,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Gender"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 447,
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
                                                                        lineNumber: 453,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "male",
                                                                        children: "Male"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                        lineNumber: 454,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                        value: "female",
                                                                        children: "Female"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                        lineNumber: 455,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 448,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 446,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Grade Level"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 459,
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
                                                                        lineNumber: 465,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    gradeLevels.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                            value: g,
                                                                            children: g
                                                                        }, g, false, {
                                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                            lineNumber: 467,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 460,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 458,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 474,
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
                                                                lineNumber: 475,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 473,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 478,
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
                                                                lineNumber: 479,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 477,
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
                                                                lineNumber: 482,
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
                                                                lineNumber: 483,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 481,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Homeroom (Section)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 486,
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
                                                                        lineNumber: 492,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    homerooms.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                            value: h,
                                                                            children: h
                                                                        }, h, false, {
                                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                            lineNumber: 494,
                                                                            columnNumber: 25
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 487,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 485,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Student ID (Username)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 501,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                className: "mt-1 w-full rounded-md border-gray-300 font-mono",
                                                                value: student.student_id,
                                                                disabled: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 502,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 500,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 427,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-3",
                                                children: "Parent/Guardian Information"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 509,
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
                                                                lineNumber: 512,
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
                                                                lineNumber: 513,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 511,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Parent Last Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 516,
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
                                                                lineNumber: 517,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 515,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Parent Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 520,
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
                                                                lineNumber: 521,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 519,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Parent Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 524,
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
                                                                lineNumber: 525,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 523,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Occupation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 528,
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
                                                                lineNumber: 529,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 527,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Employer"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 532,
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
                                                                lineNumber: 533,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 531,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 510,
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
                                                                lineNumber: 538,
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
                                                                lineNumber: 539,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 537,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Emergency Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 542,
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
                                                                lineNumber: 543,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 541,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Relationship"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 546,
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
                                                                lineNumber: 547,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 545,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 536,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 508,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-3",
                                                children: "Academic Information"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 554,
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
                                                                lineNumber: 557,
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
                                                                lineNumber: 558,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 556,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Previous School Address"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 561,
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
                                                                lineNumber: 562,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 560,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Previous School Phone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 565,
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
                                                                lineNumber: 566,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 564,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Reason for Leaving"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 569,
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
                                                                lineNumber: 570,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 568,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Special Needs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 573,
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
                                                                lineNumber: 574,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 572,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Medical Conditions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 577,
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
                                                                lineNumber: 578,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 576,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 555,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 553,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-3",
                                                children: "Additional Information"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 585,
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
                                                                lineNumber: 588,
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
                                                                lineNumber: 589,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 587,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Interests"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 592,
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
                                                                lineNumber: 593,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 591,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Goals"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 596,
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
                                                                lineNumber: 597,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 595,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium",
                                                                children: "Additional Info"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 600,
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
                                                                lineNumber: 601,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 599,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 586,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 584,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "btn-primary",
                                            disabled: saving,
                                            children: saving ? 'Saving...' : 'Save Changes'
                                        }, void 0, false, {
                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                            lineNumber: 607,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 606,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                lineNumber: 425,
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
                                                lineNumber: 613,
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
                                                    lineNumber: 616,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-full flex items-center justify-center text-gray-400",
                                                    children: "No photo"
                                                }, void 0, false, {
                                                    fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                    lineNumber: 618,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 614,
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
                                                        lineNumber: 623,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 621,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 612,
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
                                                lineNumber: 628,
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
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 rounded-full bg-gold-400 text-navy-900 flex items-center justify-center font-bold",
                                                                children: "FL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 630,
                                                                columnNumber: 109
                                                            }, this),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: "Finote Loza School"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 630,
                                                                columnNumber: 225
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 630,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "aspect-[16/9] bg-gray-100 rounded mb-2 overflow-hidden",
                                                        children: student.photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                            src: student.photo_url,
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                            lineNumber: 632,
                                                            columnNumber: 43
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 631,
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
                                                                lineNumber: 634,
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
                                                                lineNumber: 634,
                                                                columnNumber: 88
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 634,
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
                                                                lineNumber: 635,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "font-mono",
                                                                children: student.student_id
                                                            }, void 0, false, {
                                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                                lineNumber: 635,
                                                                columnNumber: 88
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 635,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 629,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "btn-primary mt-3",
                                                onClick: printIdCard,
                                                children: "Print ID Card"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 637,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 627,
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
                                                lineNumber: 641,
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
                                                lineNumber: 642,
                                                columnNumber: 17
                                            }, this),
                                            !student.user_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 mt-2",
                                                children: "No linked auth user. Create account from Applications or re-register the student."
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 654,
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
                                                        lineNumber: 656,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: "inline-flex items-center rounded-md border border-red-300 text-red-700 px-3 py-2",
                                                        onClick: onDeleteStudent,
                                                        children: "Delete Student"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                        lineNumber: 657,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                                lineNumber: 655,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                        lineNumber: 640,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                                lineNumber: 611,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                        lineNumber: 424,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
                lineNumber: 422,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
            lineNumber: 421,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/students/[id].js",
        lineNumber: 420,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__32302b22._.js.map