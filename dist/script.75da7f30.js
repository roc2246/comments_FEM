// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function fetchData() {
  return _fetchData.apply(this, arguments);
} // GENERATES COMMENTS
function _fetchData() {
  _fetchData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var urlMap, promises, results, combinedResults;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Define an object with key-value pairs where keys represent labels and values are URLs
          urlMap = {
            comments: "http://localhost:3000/comments",
            currentUser: "http://localhost:3000/currentUser"
          }; // Create an array of Promises for fetch requests using Object.entries()
          promises = Object.entries(urlMap).map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
              var _ref3, key, url, response;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _ref3 = _slicedToArray(_ref, 2), key = _ref3[0], url = _ref3[1];
                    _context.next = 3;
                    return fetch(url);
                  case 3:
                    response = _context.sent;
                    if (response.ok) {
                      _context.next = 6;
                      break;
                    }
                    throw new Error("Request for ".concat(url, " failed"));
                  case 6:
                    _context.t0 = _defineProperty;
                    _context.t1 = {};
                    _context.t2 = key;
                    _context.next = 11;
                    return response.json();
                  case 11:
                    _context.t3 = _context.sent;
                    return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2, _context.t3));
                  case 13:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x12) {
              return _ref2.apply(this, arguments);
            };
          }()); // Use Promise.all() to wait for all Promises to resolve
          _context2.next = 5;
          return Promise.all(promises);
        case 5:
          results = _context2.sent;
          // Combine the results into a single object
          combinedResults = results.reduce(function (acc, result) {
            return _objectSpread(_objectSpread({}, acc), result);
          }, {});
          return _context2.abrupt("return", combinedResults);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error("Error:", _context2.t0);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _fetchData.apply(this, arguments);
}
fetchData().then(function (data) {
  var comments = data.comments,
    currentUser = data.currentUser;

  // GENERATES CHILD ELEMENTS FOR POSTS
  var element = {
    content: function content(source) {
      var content = document.createElement("p");
      content.classList.add("comment__content");
      var message = document.createElement("span");
      message.innerText = source.content;
      message.classList.add("comment__message");
      if (source.replyingTo !== undefined) {
        var replyingTo = document.createElement("span");
        replyingTo.innerText = "@".concat(source.replyingTo, " ");
        replyingTo.classList.add("comment__replyingTo");
        content.appendChild(replyingTo);
      }
      content.appendChild(message);
      return content;
    },
    createdAt: function createdAt(source) {
      var createdAt = document.createElement("span");
      createdAt.classList.add("comment__createdAt");
      createdAt.innerText = source.createdAt;
      return createdAt;
    },
    vote: function vote(source) {
      var vote = document.createElement("form");
      vote.classList.add("vote");
      var upvote = document.createElement("button");
      upvote.classList.add("vote__btn");
      upvote.classList.add("vote__btn--upvote");
      vote.appendChild(upvote);
      var plus = document.createElement("img");
      plus.classList.add("vote__img");
      plus.classList.add("vote__img--plus");
      plus.src = "./images/icon-plus.svg";
      upvote.appendChild(plus);
      var score = document.createElement("span");
      score.classList.add("vote__score");
      score.innerText = source.score;
      vote.appendChild(score);
      var downvote = document.createElement("button");
      downvote.classList.add("vote__btn");
      downvote.classList.add("vote__btn--downvote");
      vote.appendChild(downvote);
      var minus = document.createElement("img");
      minus.classList.add("vote__img");
      minus.classList.add("vote__img--minus");
      minus.src = "./images/icon-minus.svg";
      downvote.appendChild(minus);
      return vote;
    },
    avatar: function avatar(source) {
      var avatar = document.createElement("img");
      avatar.classList.add("avatar");
      avatar.classList.add("avatar--comment");
      avatar.src = source.user.image.png;
      avatar.alt = source.user.username;
      return avatar;
    },
    username: function username(source) {
      var currentUser = data.currentUser;
      var username = document.createElement("span");
      username.classList.add("username");
      if (source.user.username === currentUser.username) {
        username.classList.add("username--you");
        var name = document.createElement("span");
        name.classList.add("username__name");
        name.innerText = source.user.username;
        username.appendChild(name);
        var indicator = document.createElement("span");
        indicator.classList.add("username__you");
        indicator.innerText = "you";
        username.appendChild(indicator);
      } else {
        username.innerText = source.user.username;
      }
      return username;
    },
    updateForm: function updateForm(source) {
      var updateForm = document.createElement("form");
      updateForm.classList.add("new-comment");
      updateForm.classList.add("new-comment--update");
      var updateInput = document.createElement("textarea");
      updateInput.classList.add("new-comment__input");
      if (source.replyingTo !== undefined) {
        updateInput.value = "@".concat(source.replyingTo, " ").concat(source.content);
      } else {
        updateInput.value = "".concat(source.content);
      }
      updateForm.appendChild(updateInput);
      var updateSend = document.createElement("button");
      updateSend.classList.add("btn");
      updateSend.classList.add("new-comment__send");
      updateSend.classList.add("new-comment__send--update");
      updateSend.innerText = "UPDATE";
      updateForm.appendChild(updateSend);
      return updateForm;
    },
    CRUD: function CRUD(source) {
      var currentUser = data.currentUser;
      var CRUD = document.createElement("div");
      CRUD.classList.add("CRUD-container");
      function createCRUDbtn(type) {
        var btn = document.createElement("button");
        btn.classList.add("CRUD");
        btn.classList.add("CRUD--".concat(type));
        CRUD.appendChild(btn);
        var btnIcon = document.createElement("img");
        btnIcon.classList.add("CRUD__icon");
        btnIcon.classList.add("CRUD__icon--".concat(type));
        btnIcon.src = "./images/icon-".concat(type, ".svg");
        btn.appendChild(btnIcon);
        var btnTxt = document.createElement("span");
        btnTxt.classList.add("CRUD__text");
        btnTxt.classList.add("CRUD__text--".concat(type));
        btnTxt.innerText = "".concat(type.charAt(0).toUpperCase()).concat(type.slice(1));
        btn.appendChild(btnTxt);
        return btn;
      }
      if (source.user.username === currentUser.username) {
        CRUD.appendChild(createCRUDbtn("delete"));
        CRUD.appendChild(createCRUDbtn("edit"));
      } else {
        CRUD.appendChild(createCRUDbtn("reply"));
      }
      return CRUD;
    }
  };

  // const { comments, currentUser } = data;
  var _loop = function _loop(comment) {
    var container = document.getElementById("comment-wrapper");
    var post = comments[comment];

    // sets current user's avatar in new comment form
    var newCommentAvatar = document.querySelector(".avatar--new-comment");
    newCommentAvatar.src = currentUser[0].image.png;

    // function for generating comments and replies
    function postCont(type, counter) {
      var container = document.createElement("div");
      container.classList.add("comment");

      // sets the type of post (i.e; reply, comment, etc.)
      var post;
      if (type === "reply") {
        container.classList.add("comment--reply");
        post = comments[comment].replies[counter];
      } else if (type === "comment") {
        post = comments[comment];
        counter = null;
      }

      // creates child elements for post
      var newComment = {
        avatar: element.avatar(post),
        username: element.username(post),
        createdAt: element.createdAt(post),
        content: element.content(post),
        updateForm: element.updateForm(post),
        vote: element.vote(post),
        CRUD: element.CRUD(post)
      };
      for (var ele in newComment) {
        if (newComment[ele] !== newComment.updateForm) {
          container.append(newComment[ele]);
        }
      }
      if (currentUser.username === post.user.username) {
        container.append(newComment.updateForm);
        container.classList.add("comment--you");
      }

      // adds other classes if post is reply
      if (type === "reply") {
        newComment.CRUD.classList.add("CRUD-container--reply");
      }
      return container;
    }

    // function for creating reply form
    function createReplyForm(type) {
      var replyForm = document.createElement("form");
      replyForm.classList.add("new-comment");
      replyForm.classList.add("new-comment--reply");

      // sets extra class if form is for a reply to reply
      if (type === "reply") {
        replyForm.classList.add("new-comment--replytoreply");
      } else {
        type = null;
      }
      var avatar = document.createElement("img");
      avatar.classList.add("avatar");
      avatar.classList.add("avatar--new-reply");
      avatar.src = currentUser[0].image.png;
      avatar.alt = post.user.username;
      replyForm.appendChild(avatar);
      var replyInput = document.createElement("textarea");
      replyInput.classList.add("new-comment__input");
      replyInput.placeholder = "...Add a reply";
      replyForm.appendChild(replyInput);
      var replySend = document.createElement("button");
      replySend.classList.add("btn");
      replySend.classList.add("new-comment__send");
      replySend.innerText = "REPLY";
      replyForm.appendChild(replySend);
      return replyForm;
    }

    // Generates comments
    if (post.replies.length > 0) {
      container.appendChild(postCont("comment"));

      // Creates container for replies
      var replyCont = document.createElement("div");
      replyCont.classList.add("reply-wrapper");
      var hr = document.createElement("hr");
      hr.classList.add("reply-wrapper__ruler");
      replyCont.appendChild(hr);
      container.appendChild(replyCont);

      // Generates replies
      for (var reply in post.replies) {
        replyCont.appendChild(postCont("reply", reply));
        if (post.replies[reply].user.username !== currentUser.username) {
          replyCont.appendChild(createReplyForm("reply"));
        }
      }

      // Generates hr hight for reply container
      replyCont.style.gridTemplateRows = "repeat(".concat(replyCont.childElementCount, ", auto)");

      // Generates reply forms
      if (post.user.username !== currentUser.username) {
        container.appendChild(createReplyForm());
      }
    } else {
      container.appendChild(postCont("comment"));
      if (post.user.username !== currentUser.username) {
        container.appendChild(createReplyForm());
      }
    }
  };
  for (var comment in comments) {
    _loop(comment);
  }

  // CONTAINERS

  // CONTAINERS - DOM SELECTORS
  var selectors = {
    reply: ".comment--reply:not(.comment--you)",
    comment: ".comment:not(.comment--you):not(.comment--reply)",
    form: {
      comment: ".new-comment:not(.new-comment--reply):not(.new-comment--update)",
      reply: ".new-comment--reply:not(.new-comment--replytoreply)",
      replyToReply: ".new-comment--replytoreply",
      update: ".new-comment--update"
    },
    btn: {
      reply: ".CRUD-container:not(.CRUD-container--reply) > .CRUD--reply",
      replyToReply: ".CRUD-container--reply > .CRUD--reply",
      deleteComment: "modal__btn-box--delete"
    },
    input: {
      comment: ".new-comment:not(.new-comment--reply):not(.new-comment--update) > .new-comment__input",
      reply: ".new-comment--reply:not(.new-comment--replytoreply)> .new-comment__input",
      replyToReply: ".new-comment--replytoreply> .new-comment__input",
      replyTo: ".comment:not(.comment--reply) > .username",
      replyReplyTo: ".comment--reply:not(.comment--replytoreply) > .username",
      update: ".new-comment--update > .new-comment__input"
    }
  };

  // CONTAINERS - ELEMENTS
  var container = {
    replies: document.querySelectorAll(selectors.reply),
    comments: document.querySelectorAll(selectors.comment),
    userComments: document.getElementsByClassName("comment--you"),
    modal: document.getElementsByClassName("modal__btn-box--cancel")[0],
    btn: {
      deleteComment: document.getElementsByClassName("modal__btn-box--delete")[0]
    },
    form: {
      comment: document.querySelector(selectors.form.comment),
      reply: document.querySelectorAll(selectors.form.reply),
      replyToReply: document.querySelectorAll(selectors.form.replyToReply),
      update: document.querySelectorAll(selectors.form.update)
    },
    input: {
      replyTo: document.querySelectorAll(selectors.input.replyTo),
      replyReplyTo: document.querySelectorAll(selectors.input.replyReplyTo),
      replyContent: document.querySelectorAll(selectors.input.reply),
      replyToReplyContent: document.querySelectorAll(selectors.input.replyToReply),
      update: document.querySelectorAll(selectors.input.update)
    }
  };

  // CONTAINERS - CRUD BUTTONS
  var CRUD = {
    edit: document.getElementsByClassName("CRUD--edit"),
    delete: document.getElementsByClassName("CRUD--delete"),
    reply: document.getElementsByClassName("CRUD--reply")
  };

  // METHODS

  // METHODS - HTTP REQUESTS
  var httpRequest = {
    delete: function _delete(content) {
      for (var x in comments) {
        if (content === comments[x].content) {
          delete comments[x];
        } else {
          for (var y in comments[x].replies) {
            if (content === comments[x].replies[y].content) {
              delete comments[x].replies[y];
            }
          }
        }
      }
    },
    update: function update(oldContent, newContent) {
      for (var x in comments) {
        if (comments[x].content === oldContent.innerText) {
          comments[x].content = newContent;
        } else {
          for (var y in comments[x].replies) {
            if (comments[x].replies[y].content === oldContent.innerText) {
              comments[x].replies[y].content = newContent;
            }
          }
        }
      }
    },
    vote: function vote(scoreContianer, mode) {
      var postContainer = scoreContianer.parentElement.parentElement;
      var content;
      var change;
      var score = scoreContianer.innerText;
      mode === "upvote" ? change = score++ : change = score--;
      if (postContainer.childNodes[3].childNodes[1]) {
        content = postContainer.childNodes[3].childNodes[1];
      } else {
        content = postContainer.childNodes[3];
      }
      for (var x in comments) {
        if (comments[x].content === content) {
          comments[x].score = change;
        } else {
          for (var y in comments[x].replies[y]) {
            var reply = comments[x].replies[y];
            if (reply.content = content) {
              reply.score = change;
            }
          }
        }
      }
    }
  };

  // METHODS - BUTTON TOGGLES
  var toggles = {
    comments: data.comments,
    edit: function edit(container) {
      if (!container.classList.contains("comment--edit")) {
        container.classList.add("comment--edit");
      } else {
        container.classList.remove("comment--edit");
      }
    },
    reply: function reply(container) {
      if (container.style.display === "") {
        container.style.display = "grid";
      } else {
        container.style.display = "";
      }
    },
    delete: function _delete(container) {
      if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "flex";
      }
    }
  };

  // TOGGLES

  // TOGGLES - EDIT MODE
  var _loop2 = function _loop2() {
    var comment = container.userComments[x];
    var editBtn = CRUD.edit[x];
    editBtn.addEventListener("click", function () {
      toggles.edit(comment);
    });
  };
  for (var x = 0; x < container.userComments.length; x++) {
    _loop2();
  }

  // TOGGLES - COMMENT REPLY
  var _loop3 = function _loop3() {
    var replyForm = document.querySelectorAll(selectors.form.reply)[_x];
    var replyBtn = document.querySelectorAll(selectors.btn.reply)[_x];
    replyBtn.addEventListener("click", function () {
      toggles.reply(replyForm);
    });
  };
  for (var _x = 0; _x < container.comments.length; _x++) {
    _loop3();
  }

  // TOGGLES - REPLY TO REPLY
  var _loop4 = function _loop4() {
    var replyForm = document.querySelectorAll(selectors.form.replyToReply)[_x2];
    var replyBtn = document.querySelectorAll(selectors.btn.replyToReply)[_x2];
    replyBtn.addEventListener("click", function () {
      toggles.reply(replyForm);
    });
  };
  for (var _x2 = 0; _x2 < container.replies.length; _x2++) {
    _loop4();
  }

  // TOGGLES - OPEN DELETE MODAL
  var _loop5 = function _loop5() {
    var deleteBtn = CRUD.delete[_x3];
    var deleteModal = document.getElementsByClassName("modal")[0];
    deleteBtn.addEventListener("click", function () {
      toggles.delete(deleteModal);
    });
  };
  for (var _x3 = 0; _x3 < CRUD.delete.length; _x3++) {
    _loop5();
  }

  // TOGGLES - CLOSE DELETE MODAL
  container.modal.addEventListener("click", function () {
    var deleteModal = document.getElementsByClassName("modal")[0];
    if (deleteModal.style.display === "flex") {
      deleteModal.style.display = "none";
    }
  });

  // CRUD

  // CRUD - FUNCTIONS

  // CRUD - FUNCTIONS - GET REPLY COUNT
  function replyCount(no, type) {
    var replyCont;
    if (type === "reply") {
      replyCont = container.form.reply[no].previousElementSibling;
    } else if (type === "replytoreply") {
      replyCont = container.form.replyToReply[no].parentElement;
    }
    return replyCont.childElementCount;
  }

  // CRUD - FUNCTIONS - GENERATE ID
  function generateID() {
    // const { comments } = data;

    var IDarray = [];
    for (var id in comments) {
      IDarray.push(comments[id].id);
      if (comments[id].replies.length > 0) {
        for (var reply in comments[id].replies) IDarray.push(comments[id].replies[reply].id);
      }
    }
    var ID = Math.max.apply(Math, IDarray) + 1;
    return ID;
  }

  // CRUD - FUNCTIONS - ADD FUNCTIONALITY
  function addFunctionality(postContainer) {
    // Adds edit form toggle to new post
    var editBtn = postContainer.childNodes[5].childNodes[1];
    editBtn.addEventListener("click", function () {
      toggles.edit(postContainer);
    });

    // Adds delete modal toggle to new post
    var deleteBtn = postContainer.childNodes[5].childNodes[0];
    var deleteModal = document.getElementsByClassName("modal")[0];
    deleteBtn.addEventListener("click", function () {
      toggles.delete(deleteModal);
    });

    // Adds edit functionality to new post
    var editForm = postContainer.childNodes[6];
    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var newContent = editForm.childNodes[0].value;

      // Sets post content
      var oldContent;
      if (editForm.parentElement.childNodes[3].childNodes[1]) {
        oldContent = editForm.parentElement.childNodes[3].childNodes[1];
      } else {
        oldContent = editForm.parentElement.childNodes[3].childNodes[0];
      }

      // Updates post in DOM
      oldContent.innerText = newContent;

      // Updates post in data
      httpRequest.update(oldContent, newContent);
    });

    // Adds delete functionality to new post
    var deleteComment = container.btn.deleteComment;
    deleteComment.addEventListener("click", function () {
      var comment = document.getElementsByClassName("comment");

      // Deletes post in DOM
      for (var _x4 in comment) {
        if (postContainer === comment[_x4]) {
          comment[_x4].remove();
        }
      }

      // Sets post content
      var chosen = deleteBtn.parentElement.parentElement;
      var content;
      if (chosen.childNodes[3].childNodes[1]) {
        content = chosen.childNodes[3].childNodes[1].innerText;
      } else {
        content = chosen.childNodes[3].childNodes[0].innerText;
      }

      // Deletes post in data
      httpRequest.delete(content);
    });

    // VOTE
    // VOTE - UPVOTE
    var upvote = postContainer.childNodes[4].childNodes[0];
    console.log(upvote);
    upvote.addEventListener("click", function (e) {
      e.preventDefault();

      // Changes score in DOM
      var scoreContianer = upvote.parentElement.childNodes[1];
      var score = scoreContianer.innerText;
      score++;
      scoreContianer.innerText = score;

      // Changes score in data
      httpRequest.vote(scoreContianer, "upvote");
    });

    // VOTE -DOWNVOTE
    var downvote = postContainer.childNodes[4].childNodes[2];
    downvote.addEventListener("click", function (e) {
      e.preventDefault();

      // Changes score in DOM
      var scoreContianer = downvote.parentElement.childNodes[1];
      var score = scoreContianer.innerText;
      score--;
      scoreContianer.innerText = score;

      // Changes score in data
      httpRequest.vote(scoreContianer, "downvote");
    });
  }

  // CRUD - FUNCTIONS - NEW POST
  function newPost(type, source) {
    var currentUser = data.currentUser;
    var postContainer = document.createElement("div");
    postContainer.classList.add("comment");

    // adds extra classes if post isn't a comment
    if (type === "reply") {
      postContainer.classList.add("comment--reply");
    } else if (type === "replytoreply") {
      postContainer.classList.add("comment--reply");
      postContainer.classList.add("comment--replytoreply");
    }
    postContainer.classList.add("comment--you");

    // generates child elements for new post
    var newComment = {
      avatar: element.avatar(source),
      username: element.username(source),
      createdAt: element.createdAt(source),
      content: element.content(source),
      updateForm: element.updateForm(source),
      vote: element.vote(source),
      CRUD: element.CRUD(source)
    };
    for (var ele in newComment) {
      if (newComment[ele] !== newComment.updateForm) {
        postContainer.append(newComment[ele]);
      }
    }
    if (currentUser.username === source.user.username) {
      postContainer.append(newComment.updateForm);
    }

    // adds reply class to crud container
    if (type === "reply") {
      newComment.CRUD.classList.add("CRUD-container--reply");
    }

    // adds CRUD funtionality to new post
    addFunctionality(postContainer);
    return postContainer;
  }

  // CRUD - DOM MANIPULATION
  // CRUD - DOM MANIPULATION - NEW COMMENT
  container.form.comment.addEventListener("submit", function (e) {
    e.preventDefault();
    var comments = data.comments,
      currentUser = data.currentUser;
    var content = document.querySelector(selectors.input.comment).value;
    var newComment = {
      content: content,
      createdAt: "TEST",
      id: generateID(),
      replies: {},
      score: 0,
      user: {
        image: {
          png: currentUser[0].image.png,
          webp: currentUser[0].image.webp
        },
        username: currentUser.username
      }
    };

    // Adds comment in data
    comments[newComment.id] = newComment;

    // Adds comment in DOM
    var wrapper = document.getElementById("comment-wrapper");
    wrapper.appendChild(newPost("comment", newComment));
  });

  // CRUD - DOM MANIPULATION - NEW REPLY
  var _loop6 = function _loop6(_x5) {
    container.form.reply[_x5].addEventListener("submit", function (e) {
      e.preventDefault();
      var comments = data.comments,
        currentUser = data.currentUser;
      var replyTo = container.input.replyTo[_x5].innerText;
      var content = container.input.replyContent[_x5].value;
      var newReply = {
        id: generateID(),
        content: content,
        createdAt: "TEST",
        replyingTo: replyTo,
        replies: {},
        score: 0,
        user: {
          image: {
            png: currentUser[0].image.png,
            webp: currentUser[0].image.webp
          },
          username: currentUser.username
        }
      };
      if (comments[_x5].replies.length === 0) {
        // Creates container for replies
        var replyCont = document.createElement("div");
        replyCont.classList.add("reply-wrapper");
        var hr = document.createElement("hr");
        hr.classList.add("reply-wrapper__ruler");
        replyCont.appendChild(hr);
        container.comments[_x5].insertAdjacentElement("afterend", replyCont);

        // Adds reply in data
        comments[_x5].replies[newReply.id] = newReply;

        // Adds reply in DOM
        replyCont.appendChild(newPost("reply", newReply));

        // Generates hr height for reply container
        replyCont.style.gridTemplateRows = "repeat(".concat(replyCount(_x5, "reply"), ", auto)");
      } else {
        comments[_x5].replies[newReply.id] = newReply;
        var replyWrapper = container.form.reply[_x5].previousElementSibling;
        replyWrapper.appendChild(newPost("reply", newReply));

        // Generates hr height for reply container
        replyWrapper.style.gridTemplateRows = "repeat(".concat(replyCount(_x5, "reply"), ", auto)");
      }
    });
  };
  for (var _x5 = 0; _x5 < container.form.reply.length; _x5++) {
    _loop6(_x5);
  }

  //  CRUD - DOM MANIPULATION - NEW REPLY TO REPLY
  var _loop7 = function _loop7(_x6) {
    container.form.replyToReply[_x6].addEventListener("submit", function (e) {
      e.preventDefault();
      var comments = data.comments,
        currentUser = data.currentUser;
      var replyTo = container.input.replyReplyTo[_x6].innerText;
      var content = container.input.replyToReplyContent[_x6].value;
      var newReply = {
        id: generateID(),
        content: content,
        createdAt: "TEST",
        replyingTo: replyTo,
        replies: {},
        score: 0,
        user: {
          image: {
            png: currentUser[0].image.png,
            webp: currentUser[0].image.webp
          },
          username: currentUser.username
        }
      };

      // Adds replytoreply in DOM
      var replyWrapper = container.form.replyToReply[_x6].parentNode;
      replyWrapper.appendChild(newPost("replytoreply", newReply));

      // Generates hr height for reply container
      replyWrapper.style.gridTemplateRows = "repeat(".concat(replyCount(_x6, "replytoreply"), ", auto)");

      // Adds replytoreply in data
      var parentComment = replyWrapper.previousSibling.childNodes[3].childNodes[0].innerText;
      for (var _x10 in comments) {
        if (comments[_x10].content === parentComment) {
          var replies = comments[_x10].replies;
          replies[replies.length] = newReply;
        }
      }
    });
  };
  for (var _x6 = 0; _x6 < container.form.replyToReply.length; _x6++) {
    _loop7(_x6);
  }

  // CRUD - DOM MANIPULATION - UPDATE
  var _loop8 = function _loop8(_x7) {
    container.form.update[_x7].addEventListener("submit", function (e) {
      e.preventDefault();

      // Sets post content
      var oldContent;
      if (container.input.update[_x7].parentElement.parentElement.childNodes[3].childNodes[1]) {
        oldContent = container.input.update[_x7].parentElement.parentElement.childNodes[3].childNodes[1];
      } else {
        oldContent = container.input.update[_x7].parentElement.parentElement.childNodes[3].childNodes[0];
      }

      // Stores new text for content
      var newContent = container.input.update[_x7].value;

      // Updates post in data
      httpRequest.update(oldContent, newContent);

      // Updates post in DOM
      oldContent.innerText = newContent;
    });
  };
  for (var _x7 = 0; _x7 < container.form.update.length; _x7++) {
    _loop8(_x7);
  }

  // CRUD - DOM MANIPULATION - DELETE
  var _loop9 = function _loop9() {
    var deleteBtn = CRUD.delete[_x8];
    var deleteComment = container.btn.deleteComment;
    deleteBtn.addEventListener("click", function () {
      var chosen = deleteBtn.parentElement.parentElement;

      // Sets post content
      var content;
      if (chosen.childNodes[3].childNodes[1]) {
        content = chosen.childNodes[3].childNodes[1].innerText;
      } else {
        content = chosen.childNodes[3].childNodes[0].innerText;
      }

      // Adds delete functionality
      deleteComment.addEventListener("click", function () {
        var comment = document.getElementsByClassName("comment");

        // Deletes post in DOM
        for (var _x11 in comment) {
          if (chosen === comment[_x11]) {
            comment[_x11].remove();
          }
        }

        // Deletes post in data
        httpRequest.delete(content);
      });
    });
  };
  for (var _x8 = 0; _x8 < CRUD.delete.length; _x8++) {
    _loop9();
  }

  // VOTE
  // VOTE - FUNCTION
  function vote(mode) {
    var vote = document.getElementsByClassName("vote__btn--".concat(mode));
    var _loop10 = function _loop10(_x9) {
      vote[_x9].addEventListener("click", function (e) {
        e.preventDefault();

        // Changes score in DOM
        var scoreContianer = vote[_x9].parentElement.childNodes[1];
        var score = scoreContianer.innerText;
        mode === "upvote" ? score++ : score--;
        scoreContianer.innerText = score;

        // Changes score in data
        mode === "upvote" ? httpRequest.vote(scoreContianer, "upvote") : httpRequest.vote(scoreContianer, "downvote");
      });
    };
    for (var _x9 = 0; _x9 < vote.length; _x9++) {
      _loop10(_x9);
    }
  }

  // VOTE - UPVOTE
  vote("upvote");

  // VOTE -DOWNVOTE
  vote("downvote");
}).catch(function (error) {
  // Handle any errors that occurred during the fetch
  console.error("There was a problem with the fetch operation:", error);
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60294" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map