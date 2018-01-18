var MTConnect =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProtocolRequest {

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    buildUrl(components, query) {
        let url = this.baseUrl
        if (!url.endsWith('/')) url += '/'

        // Join array of URL components into the path
        let pathString = components
            .filter(i => i)
            .map(encodeURIComponent)
            .join('/')

        // Create the querystring
        let queryComponents = []
        if (query) for (let i in query) {
            if (!i || !query[i]) continue

            let key = encodeURIComponent(i)
            let value = encodeURIComponent(query[i])
            queryComponents.push(key + '=' + value)
        }
        let queryString = queryComponents.join("&")
        if (queryString) queryString = '?' + queryString

        return (url + pathString + queryString)
    }

    async send(url) {
        console.log('Send', url)

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onload = e => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //console.log(xhr.responseText)
                        resolve(xhr.responseXML)
                    }
                    else {
                        //console.error(xhr.statusText)
                        reject(xhr.statusText)
                    }
                }
            }

            xhr.onerror = e => {
                //console.error(xhr.statusText)
                reject(xhr.statusText)
            }

            xhr.send(null)
        })
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProtocolRequest;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AssetRequest__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AssetRequest", function() { return __WEBPACK_IMPORTED_MODULE_0__AssetRequest__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CurrentRequest__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentRequest", function() { return __WEBPACK_IMPORTED_MODULE_1__CurrentRequest__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProbeRequest__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ProbeRequest", function() { return __WEBPACK_IMPORTED_MODULE_2__ProbeRequest__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SampleRequest__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SampleRequest", function() { return __WEBPACK_IMPORTED_MODULE_3__SampleRequest__["a"]; });





console.log('MTConnect')

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest__ = __webpack_require__(0);


class AssetRequest extends __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest__["a" /* default */]{

    constructor(baseUrl, options){
        super(baseUrl)
        this._options = options
    }

    async execute(){
        let url = this.buildUrl(
            ['asset'], 
            this._options
        )
        return this.send(url)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssetRequest;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest_js__ = __webpack_require__(0);


class CurrentRequest extends __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest_js__["a" /* default */] {

    constructor(baseUrl, options) {
        super(baseUrl)
        this._options = options || {}
    }

    get at() { return this._options.at }
    set at(value) { this._options.at = value }

    get path() { return this._options.path }
    set path(value) { this._options.path = value }

    async execute() {
        let url = this.buildUrl(
            ['current'],
            this._options
        )
        return this.send(url)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CurrentRequest;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest_js__ = __webpack_require__(0);


class ProbeRequest extends __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest_js__["a" /* default */] {

    constructor(baseUrl, deviceName) {
        super(baseUrl)
        this._deviceName = deviceName
    }

    get deviceName() { return this._deviceName }
    set deviceName(value) { this._deviceName = value }

    async execute() {
        let url = this.buildUrl([this.deviceName])
        return this.send(url)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProbeRequest;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest_js__ = __webpack_require__(0);


class SampleRequest extends __WEBPACK_IMPORTED_MODULE_0__ProtocolRequest_js__["a" /* default */] {

    constructor(baseUrl, options) {
        super(baseUrl)
        this._options = options || {}
    }

    get from() { return this._options.from }
    set from(value) { this._options.from = value }

    get count() { return this._options.count }
    set count(value) { this._options.count = value }

    get path() { return this._options.path }
    set path(value) { this._options.path = value }

    async execute() {
        let url = this.buildUrl(
            ['sample'],
            this._options
        )
        return this.send(url)
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SampleRequest;


/***/ })
/******/ ]);