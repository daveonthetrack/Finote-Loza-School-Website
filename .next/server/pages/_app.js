/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./lib/settingsContext.js":
/*!********************************!*\
  !*** ./lib/settingsContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SettingsProvider: () => (/* binding */ SettingsProvider),\n/* harmony export */   useSettings: () => (/* binding */ useSettings)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/supabaseClient */ \"(pages-dir-node)/./lib/supabaseClient.js\");\n\n\n\nconst SettingsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    settings: null\n});\nfunction SettingsProvider({ children }) {\n    const [settings, setSettings] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"SettingsProvider.useEffect\": ()=>{\n            ({\n                \"SettingsProvider.useEffect\": async ()=>{\n                    const { data } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__.supabase.from('site_settings').select('*').eq('id', 1).maybeSingle();\n                    setSettings(data || null);\n                }\n            })[\"SettingsProvider.useEffect\"]();\n        }\n    }[\"SettingsProvider.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SettingsContext.Provider, {\n        value: {\n            settings,\n            setSettings\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/lib/settingsContext.js\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\nfunction useSettings() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SettingsContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9zZXR0aW5nc0NvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBdUU7QUFDdkI7QUFFaEQsTUFBTUssZ0NBQWtCTCxvREFBYUEsQ0FBQztJQUFFTSxVQUFVO0FBQUs7QUFFaEQsU0FBU0MsaUJBQWlCLEVBQUVDLFFBQVEsRUFBRTtJQUMzQyxNQUFNLENBQUNGLFVBQVVHLFlBQVksR0FBR04sK0NBQVFBLENBQUM7SUFFekNELGdEQUFTQTtzQ0FBQztZQUNSOzhDQUFDO29CQUNDLE1BQU0sRUFBRVEsSUFBSSxFQUFFLEdBQUcsTUFBTU4seURBQVFBLENBQUNPLElBQUksQ0FBQyxpQkFBaUJDLE1BQU0sQ0FBQyxLQUFLQyxFQUFFLENBQUMsTUFBTSxHQUFHQyxXQUFXO29CQUN6RkwsWUFBWUMsUUFBUTtnQkFDdEI7O1FBQ0Y7cUNBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDTCxnQkFBZ0JVLFFBQVE7UUFBQ0MsT0FBTztZQUFFVjtZQUFVRztRQUFZO2tCQUN0REQ7Ozs7OztBQUdQO0FBRU8sU0FBU1M7SUFDZCxPQUFPaEIsaURBQVVBLENBQUNJO0FBQ3BCIiwic291cmNlcyI6WyIvVXNlcnMvZGF2ZW9udGhldHJhY2svUHJvamVjdHMvRmlub3RlIExvemEvZmlub3RlLWxvemEtc2Nob29sL2xpYi9zZXR0aW5nc0NvbnRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSAnQC9saWIvc3VwYWJhc2VDbGllbnQnO1xuXG5jb25zdCBTZXR0aW5nc0NvbnRleHQgPSBjcmVhdGVDb250ZXh0KHsgc2V0dGluZ3M6IG51bGwgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBTZXR0aW5nc1Byb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbc2V0dGluZ3MsIHNldFNldHRpbmdzXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbSgnc2l0ZV9zZXR0aW5ncycpLnNlbGVjdCgnKicpLmVxKCdpZCcsIDEpLm1heWJlU2luZ2xlKCk7XG4gICAgICBzZXRTZXR0aW5ncyhkYXRhIHx8IG51bGwpO1xuICAgIH0pKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxTZXR0aW5nc0NvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgc2V0dGluZ3MsIHNldFNldHRpbmdzIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvU2V0dGluZ3NDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlU2V0dGluZ3MoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KFNldHRpbmdzQ29udGV4dCk7XG59XG5cblxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJzdXBhYmFzZSIsIlNldHRpbmdzQ29udGV4dCIsInNldHRpbmdzIiwiU2V0dGluZ3NQcm92aWRlciIsImNoaWxkcmVuIiwic2V0U2V0dGluZ3MiLCJkYXRhIiwiZnJvbSIsInNlbGVjdCIsImVxIiwibWF5YmVTaW5nbGUiLCJQcm92aWRlciIsInZhbHVlIiwidXNlU2V0dGluZ3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/settingsContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./lib/supabaseClient.js":
/*!*******************************!*\
  !*** ./lib/supabaseClient.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://qahogrslrrvlrgdqyxpe.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaG9ncnNscnJ2bHJnZHF5eHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNDQ2NzksImV4cCI6MjA3NTgyMDY3OX0.g4PHGH68yJ9qP-oNu-j_wilT6nnWblHjwpx40N6hojU\";\nif (!supabaseUrl || !supabaseAnonKey) {\n    // eslint-disable-next-line no-console\n    console.warn('Missing Supabase env vars. Check .env.local');\n}\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9zdXBhYmFzZUNsaWVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBY0MsMENBQW9DO0FBQ3hELE1BQU1HLGtCQUFrQkgsa05BQXlDO0FBRWpFLElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxpQkFBaUI7SUFDcEMsc0NBQXNDO0lBQ3RDRSxRQUFRQyxJQUFJLENBQUM7QUFDZjtBQUVPLE1BQU1DLFdBQVdULG1FQUFZQSxDQUFDQyxhQUFhSSxpQkFBaUIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZlb250aGV0cmFjay9Qcm9qZWN0cy9GaW5vdGUgTG96YS9maW5vdGUtbG96YS1zY2hvb2wvbGliL3N1cGFiYXNlQ2xpZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyc7XG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG5cbmlmICghc3VwYWJhc2VVcmwgfHwgIXN1cGFiYXNlQW5vbktleSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLndhcm4oJ01pc3NpbmcgU3VwYWJhc2UgZW52IHZhcnMuIENoZWNrIC5lbnYubG9jYWwnKTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXkpO1xuXG5cblxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlQW5vbktleSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiY29uc29sZSIsIndhcm4iLCJzdXBhYmFzZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/supabaseClient.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"(pages-dir-node)/./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_settingsContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/settingsContext */ \"(pages-dir-node)/./lib/settingsContext.js\");\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1\"\n                    }, void 0, false, {\n                        fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                        lineNumber: 9,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Finote Loza School\"\n                    }, void 0, false, {\n                        fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                        lineNumber: 10,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Finote Loza School - Excellence in Education\"\n                    }, void 0, false, {\n                        fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                        lineNumber: 11,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        property: \"og:title\",\n                        content: \"Finote Loza School\"\n                    }, void 0, false, {\n                        fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        property: \"og:description\",\n                        content: \"Excellence in Education\"\n                    }, void 0, false, {\n                        fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                        lineNumber: 13,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        property: \"og:type\",\n                        content: \"website\"\n                    }, void 0, false, {\n                        fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                        lineNumber: 14,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_settingsContext__WEBPACK_IMPORTED_MODULE_3__.SettingsProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                    lineNumber: 17,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/daveonthetrack/Projects/Finote Loza/finote-loza-school/pages/_app.js\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ0Q7QUFDNEI7QUFFMUMsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNwRCxxQkFDRTs7MEJBQ0UsOERBQUNKLGtEQUFJQTs7a0NBQ0gsOERBQUNLO3dCQUFLQyxNQUFLO3dCQUFXQyxTQUFROzs7Ozs7a0NBQzlCLDhEQUFDQztrQ0FBTTs7Ozs7O2tDQUNQLDhEQUFDSDt3QkFBS0MsTUFBSzt3QkFBY0MsU0FBUTs7Ozs7O2tDQUNqQyw4REFBQ0Y7d0JBQUtJLFVBQVM7d0JBQVdGLFNBQVE7Ozs7OztrQ0FDbEMsOERBQUNGO3dCQUFLSSxVQUFTO3dCQUFpQkYsU0FBUTs7Ozs7O2tDQUN4Qyw4REFBQ0Y7d0JBQUtJLFVBQVM7d0JBQVVGLFNBQVE7Ozs7Ozs7Ozs7OzswQkFFbkMsOERBQUNOLGtFQUFnQkE7MEJBQ2YsNEVBQUNFO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7QUFJaEMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYXZlb250aGV0cmFjay9Qcm9qZWN0cy9GaW5vdGUgTG96YS9maW5vdGUtbG96YS1zY2hvb2wvcGFnZXMvX2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Avc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgeyBTZXR0aW5nc1Byb3ZpZGVyIH0gZnJvbSAnQC9saWIvc2V0dGluZ3NDb250ZXh0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuICAgICAgICA8dGl0bGU+Rmlub3RlIExvemEgU2Nob29sPC90aXRsZT5cbiAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIkZpbm90ZSBMb3phIFNjaG9vbCAtIEV4Y2VsbGVuY2UgaW4gRWR1Y2F0aW9uXCIgLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9XCJGaW5vdGUgTG96YSBTY2hvb2xcIiAvPlxuICAgICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD1cIkV4Y2VsbGVuY2UgaW4gRWR1Y2F0aW9uXCIgLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzp0eXBlXCIgY29udGVudD1cIndlYnNpdGVcIiAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPFNldHRpbmdzUHJvdmlkZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvU2V0dGluZ3NQcm92aWRlcj5cbiAgICA8Lz5cbiAgKTtcbn1cblxuXG5cbiJdLCJuYW1lcyI6WyJIZWFkIiwiU2V0dGluZ3NQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwibWV0YSIsIm5hbWUiLCJjb250ZW50IiwidGl0bGUiLCJwcm9wZXJ0eSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();