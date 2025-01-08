"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OPCClient = void 0;
var _nodeOpcua = require("node-opcua");
var _rxjs = require("rxjs");
var _environment = require("../../environment");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var OPCClient = exports.OPCClient = /*#__PURE__*/function () {
  function OPCClient(endpointUrl, namespace) {
    var _this = this;
    _classCallCheck(this, OPCClient);
    _defineProperty(this, "subscription$", new _rxjs.Subject());
    this.endpointUrl = endpointUrl;
    this.namespace = namespace;
    this.ready = new Promise(/*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
        var _Environment$opcuaSer;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (!(_environment.Environment.opcuaServer.options.securityPolicy !== 'Invalid' && _environment.Environment.opcuaServer.options.securityPolicy !== 'None')) {
                _context.next = 5;
                break;
              }
              _context.next = 4;
              return _this.createClientCertificateManager(((_Environment$opcuaSer = _environment.Environment.opcuaServer) === null || _Environment$opcuaSer === void 0 ? void 0 : _Environment$opcuaSer.certificateManager) || {});
            case 4:
              _this.clientCertificateManager = _context.sent;
            case 5:
              _context.next = 7;
              return _this.createClient(_this.buildClientOptions());
            case 7:
              _this.client = _context.sent;
              console.log(_this.buildClientOptions());
              //discoveryUrl: `${this.endpointUrl}/discovery`, clientCertificateManager: this.clientCertificateManager, securityPolicy: SecurityPolicy.Basic256Sha256, securityMode: MessageSecurityMode.SignAndEncrypt});
              _context.next = 11;
              return _this.client.connect(_this.endpointUrl);
            case 11:
              _context.next = 13;
              return _this.createSession(_this.client);
            case 13:
              _this.session = _context.sent;
              _context.next = 16;
              return _this.createSubscription(_this.session, {
                requestedPublishingInterval: 1000,
                requestedLifetimeCount: 100,
                requestedMaxKeepAliveCount: 20,
                maxNotificationsPerPublish: 10,
                publishingEnabled: true,
                priority: 10
              });
            case 16:
              _this.subscription = _context.sent;
              resolve(undefined);
              _context.next = 23;
              break;
            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);
            case 23:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 20]]);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  return _createClass(OPCClient, [{
    key: "browseNamespace",
    value: function () {
      var _browseNamespace = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(baseNode) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
                  var namespaceIndex, browseResult, response;
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _this2.session.readNamespaceArray();
                      case 3:
                        namespaceIndex = _context2.sent.findIndex(function (x) {
                          return x === _this2.namespace;
                        });
                        if (!(namespaceIndex === undefined)) {
                          _context2.next = 6;
                          break;
                        }
                        throw 'Namespace not found!';
                      case 6:
                        _context2.next = 8;
                        return _this2.session.browse({
                          nodeId: "ns=".concat(namespaceIndex, ";").concat(baseNode),
                          browseDirection: _nodeOpcua.BrowseDirection.Forward,
                          referenceTypeId: _nodeOpcua.ReferenceTypeIds.Organizes
                        });
                      case 8:
                        browseResult = _context2.sent;
                        response = [];
                        if (!(browseResult.statusCode === _nodeOpcua.StatusCodes.Good)) {
                          _context2.next = 14;
                          break;
                        }
                        browseResult.references.forEach(function (result) {
                          response.push(result);
                        });
                        _context2.next = 15;
                        break;
                      case 14:
                        throw 'Could not browse!';
                      case 15:
                        resolve(response);
                        _context2.next = 21;
                        break;
                      case 18:
                        _context2.prev = 18;
                        _context2.t0 = _context2["catch"](0);
                        reject(_context2.t0);
                      case 21:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2, null, [[0, 18]]);
                }));
                return function (_x4, _x5) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function browseNamespace(_x3) {
        return _browseNamespace.apply(this, arguments);
      }
      return browseNamespace;
    }()
  }, {
    key: "buildClientOptions",
    value: function buildClientOptions() {
      var options = {};
      var property;
      for (property in _environment.Environment.opcuaServer.options) {
        options[property] = _environment.Environment.opcuaServer.options[property];
      }
      return options;
    }
  }, {
    key: "createClient",
    value: function () {
      var _createClient = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(options) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve) {
                var _options$connectionSt, _options$connectionSt2, _options$connectionSt3;
                resolve(_nodeOpcua.OPCUAClient.create({
                  //discoveryUrl: options.discoveryUrl,
                  //certificateFile: options.certificateFile,
                  clientCertificateManager: options.clientCertificateManager,
                  connectionStrategy: {
                    initialDelay: ((_options$connectionSt = options.connectionStrategy) === null || _options$connectionSt === void 0 ? void 0 : _options$connectionSt.initialDelay) || 3000,
                    maxDelay: ((_options$connectionSt2 = options.connectionStrategy) === null || _options$connectionSt2 === void 0 ? void 0 : _options$connectionSt2.maxDelay) || 10 * 1000,
                    maxRetry: ((_options$connectionSt3 = options.connectionStrategy) === null || _options$connectionSt3 === void 0 ? void 0 : _options$connectionSt3.maxRetry) || 2
                  },
                  endpointMustExist: options.endpointMustExist || false,
                  //privateKeyFile: options.privateKeyFile,
                  securityMode: options.securityMode || _nodeOpcua.MessageSecurityMode.None,
                  securityPolicy: options.securityPolicy || _nodeOpcua.SecurityPolicy.Basic256Sha256
                }));
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function createClient(_x6) {
        return _createClient.apply(this, arguments);
      }
      return createClient;
    }()
  }, {
    key: "createClientCertificateManager",
    value: function () {
      var _createClientCertificateManager = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(options) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
                  var clientCertificateManager;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        try {
                          clientCertificateManager = new _nodeOpcua.OPCUACertificateManager({
                            automaticallyAcceptUnknownCertificate: options.automaticallyAcceptUnknownCertificate || true,
                            keySize: options.keySize || 2048,
                            name: options.name,
                            rootFolder: options.rootFolder || './pki/'
                          });
                          resolve(clientCertificateManager);
                        } catch (error) {
                          reject(error);
                        }
                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x8, _x9) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function createClientCertificateManager(_x7) {
        return _createClientCertificateManager.apply(this, arguments);
      }
      return createClientCertificateManager;
    }()
  }, {
    key: "createSession",
    value: function () {
      var _createSession = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(client) {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
                  var _Environment$opcuaSer3, _Environment$opcuaSer4;
                  var _Environment$opcuaSer2, sessionOptions;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        _context7.t0 = (_Environment$opcuaSer2 = _environment.Environment.opcuaServer.sessionOptions) === null || _Environment$opcuaSer2 === void 0 ? void 0 : _Environment$opcuaSer2.type;
                        _context7.next = _context7.t0 === 'Anonymous' ? 4 : _context7.t0 === 'Certificate' ? 6 : _context7.t0 === 'Username' ? 8 : 10;
                        break;
                      case 4:
                        sessionOptions = {
                          type: _nodeOpcua.UserTokenType.Anonymous
                        };
                        return _context7.abrupt("break", 12);
                      case 6:
                        sessionOptions = {
                          certificateData: client.getCertificate(),
                          privateKey: client.privateKeyFile,
                          type: _nodeOpcua.UserTokenType.Certificate
                        };
                        return _context7.abrupt("break", 12);
                      case 8:
                        sessionOptions = {
                          password: (_Environment$opcuaSer3 = _environment.Environment.opcuaServer.sessionOptions) === null || _Environment$opcuaSer3 === void 0 ? void 0 : _Environment$opcuaSer3.password,
                          type: _nodeOpcua.UserTokenType.UserName,
                          userName: (_Environment$opcuaSer4 = _environment.Environment.opcuaServer.sessionOptions) === null || _Environment$opcuaSer4 === void 0 ? void 0 : _Environment$opcuaSer4.userName
                        };
                        return _context7.abrupt("break", 12);
                      case 10:
                        sessionOptions = {
                          type: _nodeOpcua.UserTokenType.Anonymous
                        };
                        return _context7.abrupt("break", 12);
                      case 12:
                        client.createSession2(sessionOptions, function (error, session) {
                          if (error) {
                            throw error;
                          } else if (session) {
                            resolve(session);
                          } else {
                            throw 'No session was returned!';
                          }
                        });
                        _context7.next = 18;
                        break;
                      case 15:
                        _context7.prev = 15;
                        _context7.t1 = _context7["catch"](0);
                        reject(_context7.t1);
                      case 18:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7, null, [[0, 15]]);
                }));
                return function (_x11, _x12) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function createSession(_x10) {
        return _createSession.apply(this, arguments);
      }
      return createSession;
    }()
  }, {
    key: "createSubscription",
    value: function () {
      var _createSubscription = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(session, options) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
                  var subscription;
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.prev = 0;
                        _context9.next = 3;
                        return session.createSubscription2(options);
                      case 3:
                        subscription = _context9.sent;
                        resolve(subscription);
                        _context9.next = 10;
                        break;
                      case 7:
                        _context9.prev = 7;
                        _context9.t0 = _context9["catch"](0);
                        reject(_context9.t0);
                      case 10:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9, null, [[0, 7]]);
                }));
                return function (_x15, _x16) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function createSubscription(_x13, _x14) {
        return _createSubscription.apply(this, arguments);
      }
      return createSubscription;
    }()
  }, {
    key: "getNamespaces",
    value: function () {
      var _getNamespaces = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
                  return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                    while (1) switch (_context11.prev = _context11.next) {
                      case 0:
                        try {
                          resolve(_this3.session.readNamespaceArray());
                        } catch (error) {
                          reject(error);
                        }
                      case 1:
                      case "end":
                        return _context11.stop();
                    }
                  }, _callee11);
                }));
                return function (_x17, _x18) {
                  return _ref6.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      function getNamespaces() {
        return _getNamespaces.apply(this, arguments);
      }
      return getNamespaces;
    }()
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(nodes) {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(resolve, reject) {
                  var namespaceIndex, monitoredItems;
                  return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                    while (1) switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.prev = 0;
                        _this4.subscription.on('started', function () {
                          _this4.subscription$.next({
                            action: 'created'
                          });
                        });
                        _this4.subscription.on('keepalive', function () {
                          _this4.subscription$.next({
                            action: 'keepalive'
                          });
                        });
                        _this4.subscription.on('terminated', function () {
                          _this4.subscription$.next({
                            action: 'terminated'
                          });
                        });
                        _context13.next = 6;
                        return _this4.session.readNamespaceArray();
                      case 6:
                        namespaceIndex = _context13.sent.findIndex(function (namespace) {
                          return namespace === _this4.namespace;
                        });
                        monitoredItems = [];
                        nodes.forEach(function (node) {
                          monitoredItems.push(_nodeOpcua.ClientMonitoredItem.create(_this4.subscription, {
                            attributeId: _nodeOpcua.AttributeIds.Value,
                            nodeId: "ns=".concat(namespaceIndex, ";").concat(node)
                          }, {
                            discardOldest: true,
                            queueSize: 10,
                            samplingInterval: 100
                          }, _nodeOpcua.TimestampsToReturn.Both).on('changed', function (dataValue) {
                            var nodeNameLength = node.split('=')[1].split('.').length - 1;
                            var nodeName = node.split('=')[1].split('.')[nodeNameLength];
                            _this4.subscription$.next({
                              action: 'changed',
                              value: {
                                fullTag: node,
                                namespace: _this4.namespace,
                                serverTimestamp: dataValue.serverTimestamp,
                                sourceTimestamp: dataValue.sourceTimestamp,
                                status: dataValue.statusCode.name,
                                statusCode: dataValue.statusCode.value,
                                tag: nodeName,
                                type: _nodeOpcua.DataType[dataValue.value.dataType],
                                typeCode: dataValue.value.dataType,
                                value: dataValue.value.value
                              }
                            });
                          }));
                        });
                        resolve();
                        _context13.next = 15;
                        break;
                      case 12:
                        _context13.prev = 12;
                        _context13.t0 = _context13["catch"](0);
                        reject(_context13.t0);
                      case 15:
                      case "end":
                        return _context13.stop();
                    }
                  }, _callee13, null, [[0, 12]]);
                }));
                return function (_x20, _x21) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context14.stop();
          }
        }, _callee14);
      }));
      function subscribe(_x19) {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }()
  }, {
    key: "readValue",
    value: function () {
      var _readValue = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(node) {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(resolve, reject) {
                  var _this5$session, namespaceIndex, result;
                  return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                    while (1) switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.prev = 0;
                        _context15.next = 3;
                        return _this5.session.readNamespaceArray();
                      case 3:
                        namespaceIndex = _context15.sent.findIndex(function (namespace) {
                          return namespace === _this5.namespace;
                        });
                        _context15.next = 6;
                        return (_this5$session = _this5.session) === null || _this5$session === void 0 ? void 0 : _this5$session.read({
                          attributeId: _nodeOpcua.AttributeIds.Value,
                          nodeId: "ns=".concat(namespaceIndex, ";").concat(node)
                        });
                      case 6:
                        result = _context15.sent;
                        if (result) {
                          _context15.next = 9;
                          break;
                        }
                        throw 'could not read tag!';
                      case 9:
                        resolve(result);
                        _context15.next = 15;
                        break;
                      case 12:
                        _context15.prev = 12;
                        _context15.t0 = _context15["catch"](0);
                        reject(_context15.t0);
                      case 15:
                      case "end":
                        return _context15.stop();
                    }
                  }, _callee15, null, [[0, 12]]);
                }));
                return function (_x23, _x24) {
                  return _ref8.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context16.stop();
          }
        }, _callee16);
      }));
      function readValue(_x22) {
        return _readValue.apply(this, arguments);
      }
      return readValue;
    }()
  }, {
    key: "writeTag",
    value: function () {
      var _writeTag = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(tag, value, valueType) {
        var _this6 = this;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(resolve, reject) {
                  var _this6$session, namespaceIndex, nodeToWrite, response;
                  return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                    while (1) switch (_context17.prev = _context17.next) {
                      case 0:
                        _context17.prev = 0;
                        _context17.next = 3;
                        return _this6.session.readNamespaceArray();
                      case 3:
                        namespaceIndex = _context17.sent.findIndex(function (namespace) {
                          return namespace === _this6.namespace;
                        });
                        nodeToWrite = {
                          attributeId: _nodeOpcua.AttributeIds.Value,
                          nodeId: "ns=".concat(namespaceIndex, ";").concat(tag),
                          value: {
                            value: {
                              dataType: valueType,
                              value: value
                            }
                          }
                        };
                        _context17.next = 7;
                        return (_this6$session = _this6.session) === null || _this6$session === void 0 ? void 0 : _this6$session.write(nodeToWrite);
                      case 7:
                        response = _context17.sent;
                        resolve(response);
                        // if (response) {
                        //     if (!response?.cause) resolve(`Tag ${nodeToWrite.nodeId} written with value: ${nodeToWrite.value?.value?.value}`);
                        //     resolve(response);
                        // } else {
                        //     throw(`COULD NOT WRITE TAG ${nodeToWrite.nodeId}`);
                        // }
                        // });
                        _context17.next = 14;
                        break;
                      case 11:
                        _context17.prev = 11;
                        _context17.t0 = _context17["catch"](0);
                        reject(_context17.t0);
                      case 14:
                      case "end":
                        return _context17.stop();
                    }
                  }, _callee17, null, [[0, 11]]);
                }));
                return function (_x28, _x29) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context18.stop();
          }
        }, _callee18);
      }));
      function writeTag(_x25, _x26, _x27) {
        return _writeTag.apply(this, arguments);
      }
      return writeTag;
    }() // public async browseWithClient(): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await this.client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
    //                 const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
    //                 // const browseResult: BrowseResult = (await session.browse({
    //                 //     nodeId: `ns=9;s=ChevronLD.CommDrivers.RAEtherNet_IPDriver1.RAEtherNet_IPStation1.Tags.Controller Tags.LS01_ManPosnHMI`,
    //                 //     referenceTypeId: ReferenceTypeIds.Organizes,
    //                 //     includeSubtypes: true,
    //                 //     browseDirection: BrowseDirection.Forward
    //                 // })) as BrowseResult;
    //                 // console.log('====>> GOT BROWSE RESULT', browseResult);
    //                 // for (const reference of browseResult!.references!) {
    //                 //     console.log('->', reference.browseName.toString());
    //                 // };
    //                 //console.log('===>>> NAMESPACES ARE:', await session.readNamespaceArray());
    //                 // console.log(
    //                 //     browseResult?.references?.map((r: ReferenceDescription) => r.browseName.toString())
    //                 // );
    //                 // const browsePath = makeBrowsePath('RootFolder', '/Types');
    //                 // const result = (await session.translateBrowsePath(browsePath));
    //                 // console.log('===>>>> BROWSE PATH RESULT:', result);
    //                 // result.targets?.forEach((res) => {
    //                 //     console.log(res);
    //                 //     console.log(res.targetId.toString());
    //                 // });
    //                 const dataValue = await session.read({ nodeId: `ns=${namespaceIndex};${this.nodeId}`, attributeId: AttributeIds.Value });
    //                 if (dataValue.statusCode !== StatusCodes.Good) {
    //                     console.log('Could not read ', this.nodeId);
    //                     console.log(dataValue);
    //                 } else {
    //                     console.log(` value of ${this.nodeId.toString()} = ${dataValue.value.toString()}`);
    //                     const nodeToWrite: WriteValueOptions = {
    //                         nodeId: `ns=${namespaceIndex};${this.nodeId}`,
    //                         value: {
    //                             value: {
    //                                 dataType: DataType.Float,
    //                                 value: 10014
    //                             }
    //                         }
    //                     };
    //                     session.write(nodeToWrite, (response) => {
    //                         if (!response?.cause) {
    //                             console.log('wrote tag!');
    //                             console.log(response?.message);
    //                         } else {
    //                             console.log('COULD NOT WRITE TAG!');
    //                         }
    //                     });
    //                 }
    //             });
    //             resolve(undefined);
    //         } catch(error) {
    //             reject(error);
    //         }
    //     });
    // }
    //public async monitorSubscription(): Promise<any> {
    // const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
    // const nodeId = `ns=${namespaceIndex};${this.nodeId}`;
    // const monitoredItem = await this.subscription.monitor({
    //         nodeId,
    //         attributeId: AttributeIds.Value,
    //     },
    //     {
    //         samplingInterval: 100,
    //         discardOldest: true,
    //         queueSize: 10,
    //     },
    //     TimestampsToReturn.Both
    // );
    // monitoredItem.on('changed', (dataValue: DataValue) => {
    //     console.log(` VALUE CHANGED TO = ${dataValue.value.value.toString()}`);
    // });
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    // await subscription.terminate();
    // }
    // public async writeTag(): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await this.client!.withSessionAsync(this.endpointUrl, async (session: ClientSession) => {
    //                 const namespaceIndex = (await session.readNamespaceArray()).findIndex((namespace) => namespace === this.namespace);
    //                 const nodeToWrite: WriteValueOptions = {
    //                     nodeId: `ns=${namespaceIndex};${this.nodeId}`,
    //                     value: {
    //                         value: {
    //                             dataType: DataType.Float,
    //                             value: 10014
    //                         }
    //                     }
    //                 };
    //                 session.write(nodeToWrite, (response) => {
    //                     if (!response?.cause) {
    //                         console.log('wrote tag!');
    //                         console.log(response?.message);
    //                     } else {
    //                         console.log('COULD NOT WRITE TAG!');
    //                     }
    //                 });
    //             });
    //             resolve(undefined);
    //         } catch(error) {
    //             reject(error);
    //         }
    //     });
    // }
  }]);
}(); //   await client.withSessionAsync(endpointUrl, async (session) => {
//     // step 5: install a subscription and monitored item
//     const subscription = await session.createSubscription2({
//       requestedPublishingInterval: 1000,
//       requestedLifetimeCount: 100,
//       requestedMaxKeepAliveCount: 20,
//       maxNotificationsPerPublish: 10,
//       publishingEnabled: true,
//       priority: 10,
//     });
//     subscription
//       .on("started", () =>
//         console.log(
//           "subscription started - subscriptionId=",
//           subscription.subscriptionId
//         )
//       )
//       .on("keepalive", () => console.log("keepalive"))
//       .on("terminated", () => console.log("subscription terminated"));
//     const monitoredItem = await subscription.monitor(
//       {
//         nodeId,
//         attributeId: AttributeIds.Value,
//       },
//       {
//         samplingInterval: 100,
//         discardOldest: true,
//         queueSize: 10,
//       },
//       TimestampsToReturn.Both
//     );
//     monitoredItem.on("changed", (dataValue: DataValue) => {
//       console.log(` Temperature = ${dataValue.value.value.toString()}`);
//     });
//     await new Promise((resolve) => setTimeout(resolve, 10000));
//     await subscription.terminate();
//     const statusCode = await session.write({
//       nodeId: "ns=7;s=Scalar_Static_Double",
//       attributeId: AttributeIds.Value,
//       value: {
//         statusCode: StatusCodes.Good,
//         sourceTimestamp: new Date(),
//         value: {
//           dataType: DataType.Double,
//           value: 25.0,
//         },
//       },
//     });
//     console.log("statusCode = ", statusCode.toString());
//     console.log(" closing session");
//   });