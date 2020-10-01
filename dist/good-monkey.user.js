// ==UserScript==
// @name         Good Monkey
// @version      0.0.1
// @description  This is a good monkey
// @author       SettingDust
//
// @include      http*://tampermonkey.net/*
//
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.js
//
// @grant        GM_addStyle
// @grant        GM_setValue
// ==/UserScript==

!function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
}([ function(module, exports, __webpack_require__) {
    $("body").css("background", "#212121"), GM_addStyle(__webpack_require__(1).toString());
}, function(module, exports) {
    throw new Error("Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\nError: true is not a PostCSS plugin\n    at Processor.normalize (E:\\TamperMonkey\\webpack-tampermonkey\\node_modules\\postcss\\lib\\processor.js:168:15)\n    at new Processor (E:\\TamperMonkey\\webpack-tampermonkey\\node_modules\\postcss\\lib\\processor.js:52:25)\n    at postcss (E:\\TamperMonkey\\webpack-tampermonkey\\node_modules\\postcss\\lib\\postcss.js:55:10)\n    at Object.loader (E:\\TamperMonkey\\webpack-tampermonkey\\node_modules\\postcss-loader\\dist\\index.js:94:41)");
} ]);