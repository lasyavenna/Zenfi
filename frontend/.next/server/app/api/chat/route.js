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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nconst ai = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GEMINI_API_KEY\n});\nasync function POST(req) {\n    try {\n        const { messages, context } = await req.json();\n        if (!messages || !Array.isArray(messages)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Messages array is required. \"\n            }, {\n                status: 400\n            });\n        }\n        const history = messages.map((m)=>({\n                role: m.role === 'assistant' ? 'model' : 'user',\n                parts: [\n                    {\n                        text: m.content\n                    }\n                ]\n            }));\n        const systemInstruction = context === 'invest' ? \"You are Zenfi, an experimental financial advisor specializing in stocks, investments, and portfolio diversiification. Be professional, concise, and helpful.\" : \"You are Panda Pal, a super-fun, cool, and helpful financial guru for teens and kids. Focus on budgeting, savings goals, and general financial literacy. Use emojis, slang (appropriately) and keep your explanations simple, game-like and related to school, pocket money, gaming and saving for big goals like a new console or phone. Use metaphors like 'saving points' or 'leveling up your money skills'.\";\n        // start a chat session\n        const chat = ai.chats.create({\n            model: \"gemini-2.5-flash\",\n            history: history,\n            config: {\n                systemInstruction: systemInstruction\n            }\n        });\n        // send the last user message\n        const lastUserMessage = history[history.length - 1].parts[0].text;\n        const result = await chat.sendMessage({\n            message: lastUserMessage\n        });\n        // extract respones\n        const responseText = (result.text ?? \"I'm sorry, I couldn't generate a text response.\").trim();\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            content: responseText\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Gemini API Error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Failed to communicate with the AI service.'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTRDO0FBQ0Q7QUFZM0MsTUFBTUUsS0FBSyxJQUFJRixzREFBV0EsQ0FBQztJQUFFRyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7QUFBQztBQUV6RCxlQUFlQyxLQUFLQyxHQUFZO0lBQ25DLElBQUk7UUFDQSxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTUYsSUFBSUcsSUFBSTtRQUU1QyxJQUFJLENBQUNGLFlBQVksQ0FBQ0csTUFBTUMsT0FBTyxDQUFDSixXQUFXO1lBQ3ZDLE9BQU9SLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVHLE9BQU87WUFBOEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3JGO1FBRUEsTUFBTUMsVUFBVVAsU0FBU1EsR0FBRyxDQUFDLENBQUNDLElBQU87Z0JBQ2pDQyxNQUFNRCxFQUFFQyxJQUFJLEtBQUssY0FBYyxVQUFVO2dCQUN6Q0MsT0FBTztvQkFBQzt3QkFBRUMsTUFBTUgsRUFBRUksT0FBTztvQkFBQztpQkFBRTtZQUNoQztRQUVBLE1BQU1DLG9CQUFvQmIsWUFBWSxXQUNoQyxpS0FDQTtRQUVOLHVCQUF1QjtRQUN2QixNQUFNYyxPQUFPdEIsR0FBR3VCLEtBQUssQ0FBQ0MsTUFBTSxDQUFDO1lBQ3pCQyxPQUFPO1lBQ1BYLFNBQVNBO1lBQ1RZLFFBQVE7Z0JBQ0pMLG1CQUFtQkE7WUFDdkI7UUFDSjtRQUVBLDZCQUE2QjtRQUM3QixNQUFNTSxrQkFBa0JiLE9BQU8sQ0FBQ0EsUUFBUWMsTUFBTSxHQUFHLEVBQUUsQ0FBQ1YsS0FBSyxDQUFDLEVBQUUsQ0FBQ0MsSUFBSTtRQUVqRSxNQUFNVSxTQUFTLE1BQU1QLEtBQUtRLFdBQVcsQ0FBQztZQUFFQyxTQUFTSjtRQUFnQjtRQUVqRSxtQkFBbUI7UUFDbkIsTUFBTUssZUFBZSxDQUFDSCxPQUFPVixJQUFJLElBQUksaURBQWdELEVBQUdjLElBQUk7UUFFNUYsT0FBT2xDLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRVcsU0FBU1k7UUFBYSxHQUFHO1lBQUVuQixRQUFRO1FBQUk7SUFDdEUsRUFBRSxPQUFPRCxPQUFPO1FBQ1pzQixRQUFRdEIsS0FBSyxDQUFDLHFCQUFxQkE7UUFDbkMsT0FBT2IscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFRyxPQUFPO1FBQTZDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BHO0FBQ0oiLCJzb3VyY2VzIjpbIi9Vc2Vycy9yb3NoaWEvWmVuRmkvWmVuZmkvZnJvbnRlbmQvYXBwL2FwaS9jaGF0L3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdvb2dsZUdlbkFJIH0gZnJvbSAnQGdvb2dsZS9nZW5haSc7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5cbmludGVyZmFjZSBNZXNzYWdlIHtcbiAgICByb2xlOiBcInVzZXJcIiB8IFwiYXNzaXN0YW50XCI7XG4gICAgY29udGVudDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEJvZHkge1xuICAgIG1lc3NhZ2VzOiBNZXNzYWdlW107XG4gICAgY29udGV4dDogJ2NoYXQnIHwgJ2ludmVzdCc7XG59XG5cbmNvbnN0IGFpID0gbmV3IEdvb2dsZUdlbkFJKHsgYXBpS2V5OiBwcm9jZXNzLmVudi5HRU1JTklfQVBJX0tFWSB9KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBtZXNzYWdlcywgY29udGV4dCB9ID0gYXdhaXQgcmVxLmpzb24oKSBhcyBSZXF1ZXN0Qm9keTtcblxuICAgICAgICBpZiAoIW1lc3NhZ2VzIHx8ICFBcnJheS5pc0FycmF5KG1lc3NhZ2VzKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWVzc2FnZXMgYXJyYXkgaXMgcmVxdWlyZWQuIFwifSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhpc3RvcnkgPSBtZXNzYWdlcy5tYXAoKG0pID0+ICh7XG4gICAgICAgICAgICByb2xlOiBtLnJvbGUgPT09ICdhc3Npc3RhbnQnID8gJ21vZGVsJyA6ICd1c2VyJyxcbiAgICAgICAgICAgIHBhcnRzOiBbeyB0ZXh0OiBtLmNvbnRlbnQgfV0sXG4gICAgICAgIH0pKTtcblxuICAgICAgICBjb25zdCBzeXN0ZW1JbnN0cnVjdGlvbiA9IGNvbnRleHQgPT09ICdpbnZlc3QnXG4gICAgICAgICAgICA/IFwiWW91IGFyZSBaZW5maSwgYW4gZXhwZXJpbWVudGFsIGZpbmFuY2lhbCBhZHZpc29yIHNwZWNpYWxpemluZyBpbiBzdG9ja3MsIGludmVzdG1lbnRzLCBhbmQgcG9ydGZvbGlvIGRpdmVyc2lpZmljYXRpb24uIEJlIHByb2Zlc3Npb25hbCwgY29uY2lzZSwgYW5kIGhlbHBmdWwuXCJcbiAgICAgICAgICAgIDogXCJZb3UgYXJlIFBhbmRhIFBhbCwgYSBzdXBlci1mdW4sIGNvb2wsIGFuZCBoZWxwZnVsIGZpbmFuY2lhbCBndXJ1IGZvciB0ZWVucyBhbmQga2lkcy4gRm9jdXMgb24gYnVkZ2V0aW5nLCBzYXZpbmdzIGdvYWxzLCBhbmQgZ2VuZXJhbCBmaW5hbmNpYWwgbGl0ZXJhY3kuIFVzZSBlbW9qaXMsIHNsYW5nIChhcHByb3ByaWF0ZWx5KSBhbmQga2VlcCB5b3VyIGV4cGxhbmF0aW9ucyBzaW1wbGUsIGdhbWUtbGlrZSBhbmQgcmVsYXRlZCB0byBzY2hvb2wsIHBvY2tldCBtb25leSwgZ2FtaW5nIGFuZCBzYXZpbmcgZm9yIGJpZyBnb2FscyBsaWtlIGEgbmV3IGNvbnNvbGUgb3IgcGhvbmUuIFVzZSBtZXRhcGhvcnMgbGlrZSAnc2F2aW5nIHBvaW50cycgb3IgJ2xldmVsaW5nIHVwIHlvdXIgbW9uZXkgc2tpbGxzJy5cIjtcbiAgICBcbiAgICAgICAgLy8gc3RhcnQgYSBjaGF0IHNlc3Npb25cbiAgICAgICAgY29uc3QgY2hhdCA9IGFpLmNoYXRzLmNyZWF0ZSh7XG4gICAgICAgICAgICBtb2RlbDogXCJnZW1pbmktMi41LWZsYXNoXCIsXG4gICAgICAgICAgICBoaXN0b3J5OiBoaXN0b3J5LFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgc3lzdGVtSW5zdHJ1Y3Rpb246IHN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2VuZCB0aGUgbGFzdCB1c2VyIG1lc3NhZ2VcbiAgICAgICAgY29uc3QgbGFzdFVzZXJNZXNzYWdlID0gaGlzdG9yeVtoaXN0b3J5Lmxlbmd0aCAtIDFdLnBhcnRzWzBdLnRleHQ7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hhdC5zZW5kTWVzc2FnZSh7IG1lc3NhZ2U6IGxhc3RVc2VyTWVzc2FnZSB9KTtcblxuICAgICAgICAvLyBleHRyYWN0IHJlc3BvbmVzXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlVGV4dCA9IChyZXN1bHQudGV4dCA/PyBcIkknbSBzb3JyeSwgSSBjb3VsZG4ndCBnZW5lcmF0ZSBhIHRleHQgcmVzcG9uc2UuXCIpLnRyaW0oKTtcblxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBjb250ZW50OiByZXNwb25zZVRleHQgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdHZW1pbmkgQVBJIEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgQUkgc2VydmljZS4nIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfVxufSJdLCJuYW1lcyI6WyJHb29nbGVHZW5BSSIsIk5leHRSZXNwb25zZSIsImFpIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIkdFTUlOSV9BUElfS0VZIiwiUE9TVCIsInJlcSIsIm1lc3NhZ2VzIiwiY29udGV4dCIsImpzb24iLCJBcnJheSIsImlzQXJyYXkiLCJlcnJvciIsInN0YXR1cyIsImhpc3RvcnkiLCJtYXAiLCJtIiwicm9sZSIsInBhcnRzIiwidGV4dCIsImNvbnRlbnQiLCJzeXN0ZW1JbnN0cnVjdGlvbiIsImNoYXQiLCJjaGF0cyIsImNyZWF0ZSIsIm1vZGVsIiwiY29uZmlnIiwibGFzdFVzZXJNZXNzYWdlIiwibGVuZ3RoIiwicmVzdWx0Iiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwicmVzcG9uc2VUZXh0IiwidHJpbSIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_roshia_ZenFi_Zenfi_frontend_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"/Users/roshia/ZenFi/Zenfi/frontend/app/api/chat/route.ts\",\n    nextConfigOutput,\n    userland: _Users_roshia_ZenFi_Zenfi_frontend_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnJvc2hpYSUyRlplbkZpJTJGWmVuZmklMkZmcm9udGVuZCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZyb3NoaWElMkZaZW5GaSUyRlplbmZpJTJGZnJvbnRlbmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1E7QUFDckY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9yb3NoaWEvWmVuRmkvWmVuZmkvZnJvbnRlbmQvYXBwL2FwaS9jaGF0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jaGF0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2hhdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY2hhdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9yb3NoaWEvWmVuRmkvWmVuZmkvZnJvbnRlbmQvYXBwL2FwaS9jaGF0L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions","vendor-chunks/google-auth-library","vendor-chunks/uuid","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/jws","vendor-chunks/debug","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/https-proxy-agent","vendor-chunks/gcp-metadata","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/node-fetch","vendor-chunks/@google","vendor-chunks/supports-color","vendor-chunks/has-flag","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/jwa","vendor-chunks/is-stream","vendor-chunks/gtoken","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Froshia%2FZenFi%2FZenfi%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();