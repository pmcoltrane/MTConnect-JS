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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProtocolRequest {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    buildUrl(components, query) {
        let url = this.baseUrl;
        if (!url.endsWith('/')) url += '/';

        // Join array of URL components into the path
        let pathString = components.filter(i => i).map(encodeURIComponent).join('/');

        // Create the querystring
        let queryComponents = [];
        if (query) for (let i in query) {
            if (!i || !query[i]) continue;

            let key = encodeURIComponent(i);
            let value = encodeURIComponent(query[i]);
            queryComponents.push(key + '=' + value);
        }
        let queryString = queryComponents.join("&");
        if (queryString) queryString = '?' + queryString;

        return url + pathString + queryString;
    }

    async send(url) {
        console.log('Send', url);

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = e => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //console.log(xhr.responseText)
                        resolve(xhr.responseXML);
                    } else {
                        //console.error(xhr.statusText)
                        reject(xhr.statusText);
                    }
                }
            };

            xhr.onerror = e => {
                //console.error(xhr.statusText)
                reject(xhr.statusText);
            };

            xhr.send(null);
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProtocolRequest;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProtocolHeader {
    constructor(xmlElem) {
        this.xmlElement = xmlElem;

        if (!xmlElem || !xmlElem.getAttribute) throw new Error('Header element not valid.');

        // Extract common attributes
        this.creationTime = Date.parse(xmlElem.getAttribute('creationTime'));
        this.sender = xmlElem.getAttribute('sender');
        this.instanceId = Number(xmlElem.getAttribute('instanceId'));
        this.version = xmlElem.getAttribute('version');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProtocolHeader;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProtocolResponse {
    constructor(xmlDoc) {
        this.xmlDocument = xmlDoc;
        this.documentType = xmlDoc.documentElement.tagName;
        this.isError = false;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProtocolResponse;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requests_assets_request__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AssetsRequest", function() { return __WEBPACK_IMPORTED_MODULE_0__requests_assets_request__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__requests_current_request__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentRequest", function() { return __WEBPACK_IMPORTED_MODULE_1__requests_current_request__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__requests_probe_request__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ProbeRequest", function() { return __WEBPACK_IMPORTED_MODULE_2__requests_probe_request__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__requests_sample_request__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SampleRequest", function() { return __WEBPACK_IMPORTED_MODULE_3__requests_sample_request__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__responses_create_protocol_response__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessResponse", function() { return __WEBPACK_IMPORTED_MODULE_4__responses_create_protocol_response__["a"]; });






console.log('MTConnect');

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_request__ = __webpack_require__(0);


class AssetsRequest extends __WEBPACK_IMPORTED_MODULE_0__protocol_request__["a" /* default */] {

    constructor(baseUrl, options) {
        super(baseUrl);
        this._options = options;
    }

    async execute() {
        let url = this.buildUrl(['asset'], this._options);
        return this.send(url);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssetsRequest;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_request_js__ = __webpack_require__(0);


class CurrentRequest extends __WEBPACK_IMPORTED_MODULE_0__protocol_request_js__["a" /* default */] {

    constructor(baseUrl, options) {
        super(baseUrl);
        this._options = options || {};
    }

    get at() {
        return this._options.at;
    }
    set at(value) {
        this._options.at = value;
    }

    get path() {
        return this._options.path;
    }
    set path(value) {
        this._options.path = value;
    }

    async execute() {
        let url = this.buildUrl(['current'], this._options);
        return this.send(url);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CurrentRequest;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_request_js__ = __webpack_require__(0);


class ProbeRequest extends __WEBPACK_IMPORTED_MODULE_0__protocol_request_js__["a" /* default */] {

    constructor(baseUrl, deviceName) {
        super(baseUrl);
        this._deviceName = deviceName;
    }

    get deviceName() {
        return this._deviceName;
    }
    set deviceName(value) {
        this._deviceName = value;
    }

    async execute() {
        let url = this.buildUrl([this.deviceName]);
        return this.send(url);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProbeRequest;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_request_js__ = __webpack_require__(0);


class SampleRequest extends __WEBPACK_IMPORTED_MODULE_0__protocol_request_js__["a" /* default */] {

    constructor(baseUrl, options) {
        super(baseUrl);
        this._options = options || {};
    }

    get from() {
        return this._options.from;
    }
    set from(value) {
        this._options.from = value;
    }

    get count() {
        return this._options.count;
    }
    set count(value) {
        this._options.count = value;
    }

    get path() {
        return this._options.path;
    }
    set path(value) {
        this._options.path = value;
    }

    async execute() {
        let url = this.buildUrl(['sample'], this._options);
        return this.send(url);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SampleRequest;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CreateProtocolResponse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_response__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__devices_response__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error_response__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__streams_response__ = __webpack_require__(15);





function CreateProtocolResponse(xmlDoc) {
    if (!xmlDoc || !xmlDoc.documentElement || !xmlDoc.documentElement.tagName) {
        throw new Error('Document is not a valid document.');
    }

    let documentTag = xmlDoc.documentElement.tagName;

    if (documentTag === 'MTConnectDevices') {
        return new __WEBPACK_IMPORTED_MODULE_1__devices_response__["a" /* default */](xmlDoc);
    } else if (documentTag === 'MTConnectStreams') {
        return new __WEBPACK_IMPORTED_MODULE_3__streams_response__["a" /* default */](xmlDoc);
    } else if (documentTag === 'MTConnectAssets') {
        return new __WEBPACK_IMPORTED_MODULE_0__assets_response__["a" /* default */](xmlDoc);
    } else if (documentTag === 'MTConnectError') {
        return new __WEBPACK_IMPORTED_MODULE_2__error_response__["a" /* default */](xmlDoc);
    } else {
        throw new Error('Document is not a recognized MTConnect document.');
    }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__headers_assets_header__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__protocol_response__ = __webpack_require__(2);



class AssetsResponse extends __WEBPACK_IMPORTED_MODULE_1__protocol_response__["a" /* default */] {
    constructor(xmlDoc) {
        super(xmlDoc);

        let headerElem = xmlDoc.getElementsByTagName('Header')[0];
        this.header = new __WEBPACK_IMPORTED_MODULE_0__headers_assets_header__["a" /* default */](headerElem);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssetsResponse;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_header__ = __webpack_require__(1);


class AssetsHeader extends __WEBPACK_IMPORTED_MODULE_0__protocol_header__["a" /* default */] {
    constructor(xmlElem) {
        super(xmlElem);

        // Extract Assets attributes
        this.assetBufferSize = Number(xmlElem.getAttribute('assetBufferSize'));
        this.assetCount = Number(xmlElem.getAttribute('assetCount'));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssetsHeader;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__headers_devices_header__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__protocol_response__ = __webpack_require__(2);



class DevicesResponse extends __WEBPACK_IMPORTED_MODULE_1__protocol_response__["a" /* default */] {
    constructor(xmlDoc) {
        super(xmlDoc);

        let headerElem = xmlDoc.getElementsByTagName('Header')[0];
        this.header = new __WEBPACK_IMPORTED_MODULE_0__headers_devices_header__["a" /* default */](headerElem);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DevicesResponse;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_header__ = __webpack_require__(1);


class DevicesHeader extends __WEBPACK_IMPORTED_MODULE_0__protocol_header__["a" /* default */] {
    constructor(xmlElem) {
        super(xmlElem);

        // Extract Devices attributes
        this.assetBufferSize = Number(xmlElem.getAttribute('assetBufferSize'));
        this.assetCount = Number(xmlElem.getAttribute('assetCount'));
        this.bufferSize = Number(xmlElem.getAttribute('bufferSize'));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DevicesHeader;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__headers_error_header__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__protocol_response__ = __webpack_require__(2);



class ErrorResponse extends __WEBPACK_IMPORTED_MODULE_1__protocol_response__["a" /* default */] {
    constructor(xmlDoc) {
        super(xmlDoc);

        let headerElem = xmlDoc.getElementsByTagName('Header')[0];
        this.header = new __WEBPACK_IMPORTED_MODULE_0__headers_error_header__["a" /* default */](headerElem);
        this.isError = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ErrorResponse;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_header__ = __webpack_require__(1);


class ErrorHeader extends __WEBPACK_IMPORTED_MODULE_0__protocol_header__["a" /* default */] {
    constructor(xmlElem) {
        super(xmlElem);

        // Extract Error attributes
        this.bufferSize = Number(xmlElem.getAttribute('bufferSize'));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ErrorHeader;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__headers_streams_header__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__protocol_response__ = __webpack_require__(2);



class StreamsResponse extends __WEBPACK_IMPORTED_MODULE_1__protocol_response__["a" /* default */] {
    constructor(xmlDoc) {
        super(xmlDoc);

        let headerElem = xmlDoc.getElementsByTagName('Header')[0];
        this.header = new __WEBPACK_IMPORTED_MODULE_0__headers_streams_header__["a" /* default */](headerElem);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StreamsResponse;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_header__ = __webpack_require__(1);


class StreamsHeader extends __WEBPACK_IMPORTED_MODULE_0__protocol_header__["a" /* default */] {
    constructor(xmlElem) {
        super(xmlElem);

        // Extract Streams attributes
        this.bufferSize = Number(xmlElem.getAttribute('bufferSize'));
        this.nextSequence = Number(xmlElem.getAttribute('nextSequence'));
        this.firstSequence = Number(xmlElem.getAttribute('firstSequence'));
        this.lastSequence = Number(xmlElem.getAttribute('lastSequence'));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StreamsHeader;


/***/ })
/******/ ]);