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
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nconst ai = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GEMINI_API_KEY\n});\nasync function POST(req) {\n    try {\n        const { messages, context } = await req.json();\n        if (!messages || !Array.isArray(messages)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Messages array is required. \"\n            }, {\n                status: 400\n            });\n        }\n        const history = messages.map((m)=>({\n                role: m.role === 'assistant' ? 'model' : 'user',\n                parts: [\n                    {\n                        text: m.content\n                    }\n                ]\n            }));\n        const systemInstruction = context === 'invest' ? \"You are Zenfi, an experimental financial advisor specializing in stocks, investments, and portfolio diversiification. Be professional, concise, and helpful.\" : \"You are Panda Pal, a super-fun, cool, and helpful financial guru for teens and kids. Focus on budgeting, savings goals, and general financial literacy. Use emojis, slang (appropriately) and keep your explanations simple, game-like and related to school, pocket money, gaming and saving for big goals like a new console or phone. Use metaphors like 'saving points' or 'leveling up your money skills'.\";\n        // start a chat session\n        const chat = ai.chats.create({\n            model: \"gemini-2.5-flash\",\n            history: history,\n            config: {\n                systemInstruction: systemInstruction\n            }\n        });\n        // send the last user message\n        const lastUserMessage = history[history.length - 1].parts[0].text;\n        const result = await chat.sendMessage({\n            message: lastUserMessage\n        });\n        // extract respones\n        const responseText = (result.text ?? \"I'm sorry, I couldn't generate a text response.\").trim();\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            content: responseText\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Gemini API Error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Failed to communicate with the AI service.'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRDO0FBQ0Q7QUFZM0MsTUFBTUUsS0FBSyxJQUFJRixzREFBV0EsQ0FBQztJQUFFRyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7QUFBQztBQUV6RCxlQUFlQyxLQUFLQyxHQUFZO0lBQ25DLElBQUk7UUFDQSxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTUYsSUFBSUcsSUFBSTtRQUU1QyxJQUFJLENBQUNGLFlBQVksQ0FBQ0csTUFBTUMsT0FBTyxDQUFDSixXQUFXO1lBQ3ZDLE9BQU9SLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVHLE9BQU87WUFBOEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3JGO1FBRUEsTUFBTUMsVUFBVVAsU0FBU1EsR0FBRyxDQUFDLENBQUNDLElBQU87Z0JBQ2pDQyxNQUFNRCxFQUFFQyxJQUFJLEtBQUssY0FBYyxVQUFVO2dCQUN6Q0MsT0FBTztvQkFBQzt3QkFBRUMsTUFBTUgsRUFBRUksT0FBTztvQkFBQztpQkFBRTtZQUNoQztRQUVBLE1BQU1DLG9CQUFvQmIsWUFBWSxXQUNoQyxpS0FDQTtRQUdOLHVCQUF1QjtRQUN2QixNQUFNYyxPQUFPdEIsR0FBR3VCLEtBQUssQ0FBQ0MsTUFBTSxDQUFDO1lBQ3pCQyxPQUFPO1lBQ1BYLFNBQVNBO1lBQ1RZLFFBQVE7Z0JBQ0pMLG1CQUFtQkE7WUFDdkI7UUFDSjtRQUVBLDZCQUE2QjtRQUM3QixNQUFNTSxrQkFBa0JiLE9BQU8sQ0FBQ0EsUUFBUWMsTUFBTSxHQUFHLEVBQUUsQ0FBQ1YsS0FBSyxDQUFDLEVBQUUsQ0FBQ0MsSUFBSTtRQUVqRSxNQUFNVSxTQUFTLE1BQU1QLEtBQUtRLFdBQVcsQ0FBQztZQUFFQyxTQUFTSjtRQUFnQjtRQUVqRSxtQkFBbUI7UUFDbkIsTUFBTUssZUFBZSxDQUFDSCxPQUFPVixJQUFJLElBQUksaURBQWdELEVBQUdjLElBQUk7UUFFNUYsT0FBT2xDLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRVcsU0FBU1k7UUFBYSxHQUFHO1lBQUVuQixRQUFRO1FBQUk7SUFDdEUsRUFBRSxPQUFPRCxPQUFPO1FBQ1pzQixRQUFRdEIsS0FBSyxDQUFDLHFCQUFxQkE7UUFDbkMsT0FBT2IscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFRyxPQUFPO1FBQTZDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BHO0FBQ0oiLCJzb3VyY2VzIjpbIi9Vc2Vycy9sYXN5YXZlbm5hL1plbmZpL2Zyb250ZW5kL2FwcC9hcGkvY2hhdC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb29nbGVHZW5BSSB9IGZyb20gJ0Bnb29nbGUvZ2VuYWknO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuXG5pbnRlcmZhY2UgTWVzc2FnZSB7XG4gICAgcm9sZTogXCJ1c2VyXCIgfCBcImFzc2lzdGFudFwiO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RCb2R5IHtcbiAgICBtZXNzYWdlczogTWVzc2FnZVtdO1xuICAgIGNvbnRleHQ6ICdjaGF0JyB8ICdpbnZlc3QnO1xufVxuXG5jb25zdCBhaSA9IG5ldyBHb29nbGVHZW5BSSh7IGFwaUtleTogcHJvY2Vzcy5lbnYuR0VNSU5JX0FQSV9LRVkgfSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZXMsIGNvbnRleHQgfSA9IGF3YWl0IHJlcS5qc29uKCkgYXMgUmVxdWVzdEJvZHk7XG5cbiAgICAgICAgaWYgKCFtZXNzYWdlcyB8fCAhQXJyYXkuaXNBcnJheShtZXNzYWdlcykpIHtcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk1lc3NhZ2VzIGFycmF5IGlzIHJlcXVpcmVkLiBcIn0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoaXN0b3J5ID0gbWVzc2FnZXMubWFwKChtKSA9PiAoe1xuICAgICAgICAgICAgcm9sZTogbS5yb2xlID09PSAnYXNzaXN0YW50JyA/ICdtb2RlbCcgOiAndXNlcicsXG4gICAgICAgICAgICBwYXJ0czogW3sgdGV4dDogbS5jb250ZW50IH1dLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgY29uc3Qgc3lzdGVtSW5zdHJ1Y3Rpb24gPSBjb250ZXh0ID09PSAnaW52ZXN0J1xuICAgICAgICAgICAgPyBcIllvdSBhcmUgWmVuZmksIGFuIGV4cGVyaW1lbnRhbCBmaW5hbmNpYWwgYWR2aXNvciBzcGVjaWFsaXppbmcgaW4gc3RvY2tzLCBpbnZlc3RtZW50cywgYW5kIHBvcnRmb2xpbyBkaXZlcnNpaWZpY2F0aW9uLiBCZSBwcm9mZXNzaW9uYWwsIGNvbmNpc2UsIGFuZCBoZWxwZnVsLlwiXG4gICAgICAgICAgICA6IFwiWW91IGFyZSBQYW5kYSBQYWwsIGEgc3VwZXItZnVuLCBjb29sLCBhbmQgaGVscGZ1bCBmaW5hbmNpYWwgZ3VydSBmb3IgdGVlbnMgYW5kIGtpZHMuIEZvY3VzIG9uIGJ1ZGdldGluZywgc2F2aW5ncyBnb2FscywgYW5kIGdlbmVyYWwgZmluYW5jaWFsIGxpdGVyYWN5LiBVc2UgZW1vamlzLCBzbGFuZyAoYXBwcm9wcmlhdGVseSkgYW5kIGtlZXAgeW91ciBleHBsYW5hdGlvbnMgc2ltcGxlLCBnYW1lLWxpa2UgYW5kIHJlbGF0ZWQgdG8gc2Nob29sLCBwb2NrZXQgbW9uZXksIGdhbWluZyBhbmQgc2F2aW5nIGZvciBiaWcgZ29hbHMgbGlrZSBhIG5ldyBjb25zb2xlIG9yIHBob25lLiBVc2UgbWV0YXBob3JzIGxpa2UgJ3NhdmluZyBwb2ludHMnIG9yICdsZXZlbGluZyB1cCB5b3VyIG1vbmV5IHNraWxscycuXCI7XG4gICAgXG4gICAgICAgIFxuICAgICAgICAvLyBzdGFydCBhIGNoYXQgc2Vzc2lvblxuICAgICAgICBjb25zdCBjaGF0ID0gYWkuY2hhdHMuY3JlYXRlKHtcbiAgICAgICAgICAgIG1vZGVsOiBcImdlbWluaS0yLjUtZmxhc2hcIixcbiAgICAgICAgICAgIGhpc3Rvcnk6IGhpc3RvcnksXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbjogc3lzdGVtSW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBzZW5kIHRoZSBsYXN0IHVzZXIgbWVzc2FnZVxuICAgICAgICBjb25zdCBsYXN0VXNlck1lc3NhZ2UgPSBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV0ucGFydHNbMF0udGV4dDtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaGF0LnNlbmRNZXNzYWdlKHsgbWVzc2FnZTogbGFzdFVzZXJNZXNzYWdlIH0pO1xuXG4gICAgICAgIC8vIGV4dHJhY3QgcmVzcG9uZXNcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUZXh0ID0gKHJlc3VsdC50ZXh0ID8/IFwiSSdtIHNvcnJ5LCBJIGNvdWxkbid0IGdlbmVyYXRlIGEgdGV4dCByZXNwb25zZS5cIikudHJpbSgpO1xuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGNvbnRlbnQ6IHJlc3BvbnNlVGV4dCB9LCB7IHN0YXR1czogMjAwIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0dlbWluaSBBUEkgRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBBSSBzZXJ2aWNlLicgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbIkdvb2dsZUdlbkFJIiwiTmV4dFJlc3BvbnNlIiwiYWkiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiR0VNSU5JX0FQSV9LRVkiLCJQT1NUIiwicmVxIiwibWVzc2FnZXMiLCJjb250ZXh0IiwianNvbiIsIkFycmF5IiwiaXNBcnJheSIsImVycm9yIiwic3RhdHVzIiwiaGlzdG9yeSIsIm1hcCIsIm0iLCJyb2xlIiwicGFydHMiLCJ0ZXh0IiwiY29udGVudCIsInN5c3RlbUluc3RydWN0aW9uIiwiY2hhdCIsImNoYXRzIiwiY3JlYXRlIiwibW9kZWwiLCJjb25maWciLCJsYXN0VXNlck1lc3NhZ2UiLCJsZW5ndGgiLCJyZXN1bHQiLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJyZXNwb25zZVRleHQiLCJ0cmltIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_lasyavenna_Zenfi_frontend_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"/Users/lasyavenna/Zenfi/frontend/app/api/chat/route.ts\",\n    nextConfigOutput,\n    userland: _Users_lasyavenna_Zenfi_frontend_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmxhc3lhdmVubmElMkZaZW5maSUyRmZyb250ZW5kJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmxhc3lhdmVubmElMkZaZW5maSUyRmZyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNNO0FBQ25GO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbGFzeWF2ZW5uYS9aZW5maS9mcm9udGVuZC9hcHAvYXBpL2NoYXQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NoYXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jaGF0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGF0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2xhc3lhdmVubmEvWmVuZmkvZnJvbnRlbmQvYXBwL2FwaS9jaGF0L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions","vendor-chunks/google-auth-library","vendor-chunks/uuid","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/jws","vendor-chunks/debug","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/https-proxy-agent","vendor-chunks/gcp-metadata","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/node-fetch","vendor-chunks/@google","vendor-chunks/supports-color","vendor-chunks/has-flag","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/jwa","vendor-chunks/is-stream","vendor-chunks/gtoken","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flasyavenna%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();