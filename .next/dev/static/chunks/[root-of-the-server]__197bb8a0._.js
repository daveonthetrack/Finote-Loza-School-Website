(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/@supabase/supabase-js/dist/module/index.js [client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://qahogrslrrvlrgdqyxpe.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaG9ncnNscnJ2bHJnZHF5eHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNDQ2NzksImV4cCI6MjA3NTgyMDY3OX0.g4PHGH68yJ9qP-oNu-j_wilT6nnWblHjwpx40N6hojU");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Finote Loza/finote-loza-school/components/AdminLayout.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function NavLink({ href, label }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const active = router.asPath.startsWith(href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: 'block rounded-md px-3 py-2 text-sm ' + (active ? 'bg-navy-700 text-white' : 'text-navy-900 hover:bg-navy-100'),
        children: label
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(NavLink, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = NavLink;
function AdminLayout({ children }) {
    async function signOut() {
        await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        window.location.href = '/admin/login';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "bg-white border border-gray-100 rounded-xl shadow-soft p-4 h-max sticky top-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-lg text-navy-800",
                                children: "Admin"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "mt-3 space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/dashboard",
                                        label: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/articles",
                                        label: "Articles"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/events",
                                        label: "Events"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/photos",
                                        label: "Photos"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/students",
                                        label: "Students"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/teachers",
                                        label: "Teachers"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 39,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/parents",
                                        label: "Parents"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 40,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/applications",
                                        label: "Applications"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 41,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/announcements",
                                        label: "Announcements"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/assignments",
                                        label: "Assignments"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/grades",
                                        label: "Grades"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/teacher-debug",
                                        label: "Teacher Debug"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/content",
                                        label: "Content"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                        href: "/admin/content-settings",
                                        label: "Content Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/components/AdminLayout.js",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
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
_c1 = AdminLayout;
var _c, _c1;
__turbopack_context__.k.register(_c, "NavLink");
__turbopack_context__.k.register(_c1, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Finote Loza/finote-loza-school/components/AdminGuard.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function AdminGuard({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('loading');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminGuard.useEffect": ()=>{
            let mounted = true;
            ({
                "AdminGuard.useEffect": async ()=>{
                    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                    if (!mounted) return;
                    if (data?.session) setStatus('authed');
                    else {
                        setStatus('anon');
                        router.replace('/admin/login');
                    }
                }
            })["AdminGuard.useEffect"]();
            const { data: sub } = __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "AdminGuard.useEffect": (_e, session)=>{
                    if (!mounted) return;
                    if (session) setStatus('authed');
                    else {
                        setStatus('anon');
                        router.replace('/admin/login');
                    }
                }
            }["AdminGuard.useEffect"]);
            return ({
                "AdminGuard.useEffect": ()=>{
                    mounted = false;
                    sub?.subscription?.unsubscribe();
                }
            })["AdminGuard.useEffect"];
        }
    }["AdminGuard.useEffect"], [
        router
    ]);
    if (status === 'loading') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-[40vh] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(AdminGuard, "J34/RGAkKg3OVmj8NUhWSmGdogM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminGuard;
var _c;
__turbopack_context__.k.register(_c, "AdminGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeacherDebug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/components/AdminLayout.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/components/AdminGuard.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Finote Loza/finote-loza-school/lib/supabaseClient.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function TeacherDebug() {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function testLogin() {
        setLoading(true);
        setResult('');
        try {
            console.log('Testing login with:', {
                email,
                password: '***'
            });
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
                email: email.trim().toLowerCase(),
                password
            });
            if (error) {
                setResult(`❌ Login failed: ${error.message}`);
                return;
            }
            // Check teacher record
            const { data: teacher, error: teacherError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('teachers').select('*').eq('user_id', data.user.id).single();
            if (teacherError) {
                setResult(`❌ Teacher lookup failed: ${teacherError.message}`);
                return;
            }
            if (!teacher) {
                setResult('❌ No teacher record found for this user');
                return;
            }
            setResult(`✅ Login successful! Teacher: ${teacher.first_name} ${teacher.last_name} (${teacher.teacher_id})`);
            // Sign out after test
            await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        } catch (error) {
            setResult(`❌ Error: ${error.message}`);
        } finally{
            setLoading(false);
        }
    }
    async function listTeachers() {
        setLoading(true);
        setResult('');
        try {
            const { data: teachers, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$lib$2f$supabaseClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('teachers').select('teacher_id, first_name, last_name, email, user_id').order('created_at', {
                ascending: false
            });
            if (error) {
                setResult(`❌ Failed to fetch teachers: ${error.message}`);
                return;
            }
            if (!teachers || teachers.length === 0) {
                setResult('❌ No teachers found in database');
                return;
            }
            const teacherList = teachers.map((t)=>`${t.teacher_id}: ${t.first_name} ${t.last_name} (${t.email}) - User ID: ${t.user_id}`).join('\n');
            setResult(`✅ Found ${teachers.length} teachers:\n\n${teacherList}`);
        } catch (error) {
            setResult(`❌ Error: ${error.message}`);
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminGuard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$components$2f$AdminLayout$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "heading-section",
                        children: "Teacher Login Debug"
                    }, void 0, false, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-6 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mb-4",
                                children: "Test Teacher Login"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-1",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                className: "w-full rounded-md border-gray-300",
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                placeholder: "teacher@example.com"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-1",
                                                children: "Password"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                className: "w-full rounded-md border-gray-300",
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                placeholder: "firstnamelastnameyear"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: testLogin,
                                                disabled: loading || !email || !password,
                                                className: "btn-primary",
                                                children: loading ? 'Testing...' : 'Test Login'
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: listTeachers,
                                                disabled: loading,
                                                className: "btn-secondary",
                                                children: "List Teachers"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 132,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mb-4",
                                children: "Result"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg",
                                children: result
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                        lineNumber: 144,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-6 mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold mb-4",
                                children: "Troubleshooting Steps"
                            }, void 0, false, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "1. Check if teacher exists:"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this),
                                            ' Use "List Teachers" button to see all registered teachers'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "2. Verify credentials:"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 159,
                                                columnNumber: 17
                                            }, this),
                                            " Make sure email and password match exactly what was created"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "3. Password format:"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this),
                                            " Should be firstnamelastnameyear (e.g., sarahjohnson2024)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "4. Email format:"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this),
                                            " Should be the exact email used during registration"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Finote__Loza$2f$finote$2d$loza$2d$school$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "5. Check Supabase:"
                                            }, void 0, false, {
                                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this),
                                            " Verify the teacher record exists in the teachers table"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
            lineNumber: 93,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(TeacherDebug, "usJw1xdKx9FSzlXtbIvWpvjdmBA=");
_c = TeacherDebug;
var _c;
__turbopack_context__.k.register(_c, "TeacherDebug");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/admin/teacher-debug";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Finote Loza/finote-loza-school/pages/admin/teacher-debug.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__197bb8a0._.js.map