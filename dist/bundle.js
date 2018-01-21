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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProtocolRequest = function () {
    function ProtocolRequest(baseUrl) {
        _classCallCheck(this, ProtocolRequest);

        this.baseUrl = baseUrl;
    }

    _createClass(ProtocolRequest, [{
        key: 'buildUrl',
        value: function buildUrl(components, query) {
            var url = this.baseUrl;
            if (!url.endsWith('/')) url += '/';

            // Join array of URL components into the path
            var pathString = components.filter(function (i) {
                return i;
            }).map(encodeURIComponent).join('/');

            // Create the querystring
            var queryComponents = [];
            if (query) for (var i in query) {
                if (!i || !query[i]) continue;

                var key = encodeURIComponent(i);
                var value = encodeURIComponent(query[i]);
                queryComponents.push(key + '=' + value);
            }
            var queryString = queryComponents.join("&");
            if (queryString) queryString = '?' + queryString;

            return url + pathString + queryString;
        }
    }, {
        key: 'send',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('Send', url);

                                return _context.abrupt('return', new Promise(function (resolve, reject) {
                                    var xhr = new XMLHttpRequest();
                                    xhr.open('GET', url);
                                    xhr.onload = function (e) {
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

                                    xhr.onerror = function (e) {
                                        //console.error(xhr.statusText)
                                        reject(xhr.statusText);
                                    };

                                    xhr.send(null);
                                }));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function send(_x) {
                return _ref.apply(this, arguments);
            }

            return send;
        }()
    }]);

    return ProtocolRequest;
}();

exports.default = ProtocolRequest;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assetRequest = __webpack_require__(2);

Object.defineProperty(exports, 'AssetRequest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_assetRequest).default;
  }
});

var _currentRequest = __webpack_require__(3);

Object.defineProperty(exports, 'CurrentRequest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_currentRequest).default;
  }
});

var _probeRequest = __webpack_require__(4);

Object.defineProperty(exports, 'ProbeRequest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_probeRequest).default;
  }
});

var _sampleRequest = __webpack_require__(5);

Object.defineProperty(exports, 'SampleRequest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sampleRequest).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('MTConnect');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _protocolRequest = __webpack_require__(0);

var _protocolRequest2 = _interopRequireDefault(_protocolRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetRequest = function (_ProtocolRequest) {
    _inherits(AssetRequest, _ProtocolRequest);

    function AssetRequest(baseUrl, options) {
        _classCallCheck(this, AssetRequest);

        var _this = _possibleConstructorReturn(this, (AssetRequest.__proto__ || Object.getPrototypeOf(AssetRequest)).call(this, baseUrl));

        _this._options = options;
        return _this;
    }

    _createClass(AssetRequest, [{
        key: 'execute',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var url;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = this.buildUrl(['asset'], this._options);
                                return _context.abrupt('return', this.send(url));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function execute() {
                return _ref.apply(this, arguments);
            }

            return execute;
        }()
    }]);

    return AssetRequest;
}(_protocolRequest2.default);

exports.default = AssetRequest;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _protocolRequest = __webpack_require__(0);

var _protocolRequest2 = _interopRequireDefault(_protocolRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrentRequest = function (_ProtocolRequest) {
    _inherits(CurrentRequest, _ProtocolRequest);

    function CurrentRequest(baseUrl, options) {
        _classCallCheck(this, CurrentRequest);

        var _this = _possibleConstructorReturn(this, (CurrentRequest.__proto__ || Object.getPrototypeOf(CurrentRequest)).call(this, baseUrl));

        _this._options = options || {};
        return _this;
    }

    _createClass(CurrentRequest, [{
        key: 'execute',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var url;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = this.buildUrl(['current'], this._options);
                                return _context.abrupt('return', this.send(url));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function execute() {
                return _ref.apply(this, arguments);
            }

            return execute;
        }()
    }, {
        key: 'at',
        get: function get() {
            return this._options.at;
        },
        set: function set(value) {
            this._options.at = value;
        }
    }, {
        key: 'path',
        get: function get() {
            return this._options.path;
        },
        set: function set(value) {
            this._options.path = value;
        }
    }]);

    return CurrentRequest;
}(_protocolRequest2.default);

exports.default = CurrentRequest;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _protocolRequest = __webpack_require__(0);

var _protocolRequest2 = _interopRequireDefault(_protocolRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProbeRequest = function (_ProtocolRequest) {
    _inherits(ProbeRequest, _ProtocolRequest);

    function ProbeRequest(baseUrl, deviceName) {
        _classCallCheck(this, ProbeRequest);

        var _this = _possibleConstructorReturn(this, (ProbeRequest.__proto__ || Object.getPrototypeOf(ProbeRequest)).call(this, baseUrl));

        _this._deviceName = deviceName;
        return _this;
    }

    _createClass(ProbeRequest, [{
        key: 'execute',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var url;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = this.buildUrl([this.deviceName]);
                                return _context.abrupt('return', this.send(url));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function execute() {
                return _ref.apply(this, arguments);
            }

            return execute;
        }()
    }, {
        key: 'deviceName',
        get: function get() {
            return this._deviceName;
        },
        set: function set(value) {
            this._deviceName = value;
        }
    }]);

    return ProbeRequest;
}(_protocolRequest2.default);

exports.default = ProbeRequest;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _protocolRequest = __webpack_require__(0);

var _protocolRequest2 = _interopRequireDefault(_protocolRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SampleRequest = function (_ProtocolRequest) {
    _inherits(SampleRequest, _ProtocolRequest);

    function SampleRequest(baseUrl, options) {
        _classCallCheck(this, SampleRequest);

        var _this = _possibleConstructorReturn(this, (SampleRequest.__proto__ || Object.getPrototypeOf(SampleRequest)).call(this, baseUrl));

        _this._options = options || {};
        return _this;
    }

    _createClass(SampleRequest, [{
        key: 'execute',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var url;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = this.buildUrl(['sample'], this._options);
                                return _context.abrupt('return', this.send(url));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function execute() {
                return _ref.apply(this, arguments);
            }

            return execute;
        }()
    }, {
        key: 'from',
        get: function get() {
            return this._options.from;
        },
        set: function set(value) {
            this._options.from = value;
        }
    }, {
        key: 'count',
        get: function get() {
            return this._options.count;
        },
        set: function set(value) {
            this._options.count = value;
        }
    }, {
        key: 'path',
        get: function get() {
            return this._options.path;
        },
        set: function set(value) {
            this._options.path = value;
        }
    }]);

    return SampleRequest;
}(_protocolRequest2.default);

exports.default = SampleRequest;

/***/ })
/******/ ]);