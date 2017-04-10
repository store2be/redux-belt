(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("redux-belt", [], factory);
	else if(typeof exports === 'object')
		exports["redux-belt"] = factory();
	else
		root["redux-belt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.check = check;
exports.hasOwn = hasOwn;
exports.remove = remove;
exports.deferred = deferred;
exports.arrayOfDeffered = arrayOfDeffered;
exports.delay = delay;
exports.createMockTask = createMockTask;
exports.autoInc = autoInc;
exports.makeIterator = makeIterator;
exports.log = log;
exports.deprecate = deprecate;
exports.wrapSagaDispatch = wrapSagaDispatch;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sym = exports.sym = function sym(id) {
  return '@@redux-saga/' + id;
};
var TASK = exports.TASK = sym('TASK');
var HELPER = exports.HELPER = sym('HELPER');
var MATCH = exports.MATCH = sym('MATCH');
var CANCEL = exports.CANCEL = sym('cancelPromise');
var SAGA_ACTION = exports.SAGA_ACTION = sym('SAGA_ACTION');
var konst = exports.konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue = exports.kTrue = konst(true);
var kFalse = exports.kFalse = konst(false);
var noop = exports.noop = function noop() {};
var ident = exports.ident = function ident(v) {
  return v;
};

var isDev = exports.isDev = process.env.NODE_ENV === 'development';

function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}

var is = exports.is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  array: Array.isArray,
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (typeof pat === 'string' || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  },
  stringableFunc: function stringableFunc(f) {
    return is.func(f) && hasOwn(f, 'toString');
  }
};

function remove(array, item) {
  var index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

function deferred() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var def = _extends({}, props);
  var promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  def.promise = promise;
  return def;
}

function arrayOfDeffered(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }
  return arr;
}

function delay(ms) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var timeoutId = void 0;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(function () {
      return resolve(val);
    }, ms);
  });

  promise[CANCEL] = function () {
    return clearTimeout(timeoutId);
  };

  return promise;
}

function createMockTask() {
  var _ref;

  var running = true;
  var _result = void 0,
      _error = void 0;

  return _ref = {}, _defineProperty(_ref, TASK, true), _defineProperty(_ref, 'isRunning', function isRunning() {
    return running;
  }), _defineProperty(_ref, 'result', function result() {
    return _result;
  }), _defineProperty(_ref, 'error', function error() {
    return _error;
  }), _defineProperty(_ref, 'setRunning', function setRunning(b) {
    return running = b;
  }), _defineProperty(_ref, 'setResult', function setResult(r) {
    return _result = r;
  }), _defineProperty(_ref, 'setError', function setError(e) {
    return _error = e;
  }), _ref;
}

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = exports.uid = autoInc();

var kThrow = function kThrow(err) {
  throw err;
};
var kReturn = function kReturn(value) {
  return { value: value, done: true };
};
function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];

  var iterator = { name: name, next: next, throw: thro, return: kReturn };

  if (isHelper) {
    iterator[HELPER] = true;
  }
  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }
  return iterator;
}

/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/
function log(level, message) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}

function deprecate(fn, deprecationWarning) {
  return function () {
    if (isDev) log('warn', deprecationWarning);
    return fn.apply(undefined, arguments);
  };
}

var internalErr = exports.internalErr = function internalErr(err) {
  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
};

function wrapSagaDispatch(dispatch) {
  return function sagaDispatch(action) {
    var wrappedAction = Object.defineProperty(action, SAGA_ACTION, { value: true });
    return dispatch(wrappedAction);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.action = action;
exports.actionCreator = actionCreator;
exports.snakeCaseToCamel = snakeCaseToCamel;
exports.refresh = refresh;
exports.identity = identity;
exports.noop = noop;
function action(type, payload, meta) {
  return { type: type, payload: payload, meta: meta };
}

function actionCreator(actionType) {
  return function (payload, meta) {
    return action(actionType, payload, meta);
  };
}

function snakeCaseToCamel(actionType) {
  return actionType.toLowerCase().replace(/_[a-z0-9]/g, function (match) {
    return match[1].toUpperCase();
  });
}

/**
 * This is a combinator that works with makeSimpleAsync. It takes an action
 * creator and returns the same action creator but with a refresh field added
 * to action.meta. This will cause makeSimpleAsync to bypass the shouldRun
 * checks.
 */
function refresh(actionCreatorFunction) {
  return function (payload) {
    var innerAction = actionCreatorFunction(payload);
    var meta = _extends({}, innerAction.meta, { refresh: true });
    return _extends({}, innerAction, { meta: meta });
  };
}

function identity(argument) {
  return argument;
}

function noop() {}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffers = exports.BUFFER_OVERFLOW = undefined;

var _utils = __webpack_require__(0);

var BUFFER_OVERFLOW = exports.BUFFER_OVERFLOW = 'Channel\'s Buffer overflow!';

var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;

var zeroBuffer = { isEmpty: _utils.kTrue, put: _utils.noop, take: _utils.noop };

function ringBuffer() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var overflowAction = arguments[1];

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];
    while (length) {
      items.push(take());
    }
    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit = void 0;
        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);
          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;
          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;

            arr = flush();

            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;

            arr.length = doubledLimit;
            limit = doubledLimit;

            push(it);
            break;
          default:
          // DROP
        }
      }
    },
    take: take, flush: flush
  };
}

var buffers = exports.buffers = {
  none: function none() {
    return zeroBuffer;
  },
  fixed: function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  },
  dropping: function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  },
  sliding: function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  },
  expanding: function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asEffect = exports.takem = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.take = take;
exports.put = put;
exports.race = race;
exports.call = call;
exports.apply = apply;
exports.cps = cps;
exports.fork = fork;
exports.spawn = spawn;
exports.join = join;
exports.cancel = cancel;
exports.select = select;
exports.actionChannel = actionChannel;
exports.cancelled = cancelled;
exports.flush = flush;
exports.takeEvery = takeEvery;
exports.takeLatest = takeLatest;
exports.throttle = throttle;

var _utils = __webpack_require__(0);

var _sagaHelpers = __webpack_require__(10);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IO = (0, _utils.sym)('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';

var deprecationWarning = function deprecationWarning(deprecated, preferred) {
  return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
};

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, IO, true), _defineProperty(_ref, type, payload), _ref;
};

function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    (0, _utils.check)(arguments[0], _utils.is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (_utils.is.pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (_utils.is.channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};

var takem = exports.takem = (0, _utils.deprecate)(take.maybe, deprecationWarning('takem', 'take.maybe'));

function put(channel, action) {
  if (arguments.length > 1) {
    (0, _utils.check)(channel, _utils.is.notUndef, 'put(channel, action): argument channel is undefined');
    (0, _utils.check)(channel, _utils.is.channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    (0, _utils.check)(action, _utils.is.notUndef, 'put(channel, action): argument action is undefined');
  } else {
    (0, _utils.check)(channel, _utils.is.notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = (0, _utils.deprecate)(put.resolve, deprecationWarning('put.sync', 'put.resolve'));

function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  (0, _utils.check)(fn, _utils.is.notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (_utils.is.array(fn)) {
    var _fn = fn;

    var _fn2 = _slicedToArray(_fn, 2);

    context = _fn2[0];
    fn = _fn2[1];
  } else if (fn.fn) {
    var _fn3 = fn;
    context = _fn3.context;
    fn = _fn3.fn;
  }
  (0, _utils.check)(fn, _utils.is.func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

function apply(context, fn) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
}

function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return effect(CPS, getFnCallDesc('cps', fn, args));
}

function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  var eff = fork.apply(undefined, [fn].concat(args));
  eff[FORK].detached = true;
  return eff;
}

var isForkedTask = function isForkedTask(task) {
  return task[_utils.TASK];
};

function join(task) {
  if (_utils.is.array(task)) {
    return task.map(join);
  }
  (0, _utils.check)(task, _utils.is.notUndef, 'join(task): argument task is undefined');
  if (!isForkedTask(task)) {
    throw new Error('join(task): argument ' + task + ' is not a valid Task object \n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)');
  }

  return effect(JOIN, task);
}

function cancel(task) {
  (0, _utils.check)(task, _utils.is.notUndef, 'cancel(task): argument task is undefined');
  if (!isForkedTask(task)) {
    throw new Error('cancel(task): argument ' + task + ' is not a valid Task object \n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)');
  }

  return effect(CANCEL, task);
}

function select(selector) {
  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (arguments.length === 0) {
    selector = _utils.ident;
  } else {
    (0, _utils.check)(selector, _utils.is.notUndef, 'select(selector,[...]): argument selector is undefined');
    (0, _utils.check)(selector, _utils.is.func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
function actionChannel(pattern, buffer) {
  (0, _utils.check)(pattern, _utils.is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    (0, _utils.check)(buffer, _utils.is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    (0, _utils.check)(buffer, _utils.is.buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

function cancelled() {
  return effect(CANCELLED, {});
}

function flush(channel) {
  (0, _utils.check)(channel, _utils.is.channel, 'flush(channel): argument ' + channel + ' is not valid channel');
  return effect(FLUSH, channel);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    args[_key6 - 2] = arguments[_key6];
  }

  return fork.apply(undefined, [_sagaHelpers.takeEveryHelper, patternOrChannel, worker].concat(args));
}

function takeLatest(patternOrChannel, worker) {
  for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
    args[_key7 - 2] = arguments[_key7];
  }

  return fork.apply(undefined, [_sagaHelpers.takeLatestHelper, patternOrChannel, worker].concat(args));
}

function throttle(ms, pattern, worker) {
  for (var _len8 = arguments.length, args = Array(_len8 > 3 ? _len8 - 3 : 0), _key8 = 3; _key8 < _len8; _key8++) {
    args[_key8 - 3] = arguments[_key8];
  }

  return fork.apply(undefined, [_sagaHelpers.throttleHelper, ms, pattern, worker].concat(args));
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

var asEffect = exports.asEffect = {
  take: createAsEffectType(TAKE),
  put: createAsEffectType(PUT),
  race: createAsEffectType(RACE),
  call: createAsEffectType(CALL),
  cps: createAsEffectType(CPS),
  fork: createAsEffectType(FORK),
  join: createAsEffectType(JOIN),
  cancel: createAsEffectType(CANCEL),
  select: createAsEffectType(SELECT),
  actionChannel: createAsEffectType(ACTION_CHANNEL),
  cancelled: createAsEffectType(CANCELLED),
  flush: createAsEffectType(FLUSH)
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = actionsNamespace;

var _utils = __webpack_require__(1);

function actionsNamespace(prefix, baseActionTypes) {
  if (!(baseActionTypes instanceof Array)) {
    throw new Error('Please supply an array of actions as strings as a second argument');
  }

  var actions = {};
  var types = {};

  for (var i = 0; i < baseActionTypes.length; i += 1) {
    var actionType = baseActionTypes[i];
    types[actionType] = prefix + '/' + actionType;
    types[actionType + '_SUCCESS'] = prefix + '/' + actionType + '_SUCCESS';
    types[actionType + '_FAILURE'] = prefix + '/' + actionType + '_FAILURE';

    var camelCaseActionType = (0, _utils.snakeCaseToCamel)(actionType);
    actions[camelCaseActionType] = (0, _utils.actionCreator)(types[actionType]);
  }

  return { types: types, actions: actions };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simpleAsync;

var _effects = __webpack_require__(7);

var _utils = __webpack_require__(1);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function simpleAsync(descriptor) {
  if (typeof descriptor.effect !== 'function') {
    throw new Error('invalid descriptor for simpleAsync: "effect" must be a function');
  }
  return regeneratorRuntime.mark(function simpleSaga(action) {
    var state, _action$meta, failureType, successType, response, pending, i, _pending, _i;

    return regeneratorRuntime.wrap(function simpleSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(descriptor.shouldRun && (!action.meta || !action.meta.refresh))) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return (0, _effects.select)(utils.identity);

          case 3:
            state = _context.sent;

            if (descriptor.shouldRun(state, action)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return');

          case 6:
            _action$meta = action.meta, failureType = _action$meta.failureType, successType = _action$meta.successType;
            _context.prev = 7;
            _context.next = 10;
            return _effects.call.apply(undefined, _toConsumableArray(descriptor.effect(action.payload)));

          case 10:
            response = _context.sent;
            _context.next = 13;
            return (0, _effects.put)({ type: successType, payload: response.data, meta: { originalAction: action } });

          case 13:
            if (!descriptor.afterSuccess) {
              _context.next = 27;
              break;
            }

            pending = descriptor.afterSuccess(response, action.payload);

            if (!(pending instanceof Array)) {
              _context.next = 25;
              break;
            }

            i = 0;

          case 17:
            if (!(i < pending.length)) {
              _context.next = 23;
              break;
            }

            _context.next = 20;
            return (0, _effects.put)(pending[i]);

          case 20:
            i += 1;
            _context.next = 17;
            break;

          case 23:
            _context.next = 27;
            break;

          case 25:
            _context.next = 27;
            return (0, _effects.put)(pending);

          case 27:
            _context.next = 49;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context['catch'](7);

            if (!(_context.t0.response && _context.t0.response.status === 404 && descriptor.on404)) {
              _context.next = 47;
              break;
            }

            _pending = descriptor.on404(action.payload);

            if (!(_pending instanceof Array)) {
              _context.next = 43;
              break;
            }

            _i = 0;

          case 35:
            if (!(_i < _pending.length)) {
              _context.next = 41;
              break;
            }

            _context.next = 38;
            return (0, _effects.put)(_pending[_i]);

          case 38:
            _i += 1;
            _context.next = 35;
            break;

          case 41:
            _context.next = 45;
            break;

          case 43:
            _context.next = 45;
            return (0, _effects.put)(_pending);

          case 45:
            _context.next = 49;
            break;

          case 47:
            _context.next = 49;
            return (0, _effects.put)(utils.action(failureType, _context.t0.response, { originalAction: action }));

          case 49:
          case 'end':
            return _context.stop();
        }
      }
    }, simpleSaga, this, [[7, 29]]);
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8)

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _io = __webpack_require__(4);

Object.defineProperty(exports, 'take', {
  enumerable: true,
  get: function get() {
    return _io.take;
  }
});
Object.defineProperty(exports, 'takem', {
  enumerable: true,
  get: function get() {
    return _io.takem;
  }
});
Object.defineProperty(exports, 'put', {
  enumerable: true,
  get: function get() {
    return _io.put;
  }
});
Object.defineProperty(exports, 'race', {
  enumerable: true,
  get: function get() {
    return _io.race;
  }
});
Object.defineProperty(exports, 'call', {
  enumerable: true,
  get: function get() {
    return _io.call;
  }
});
Object.defineProperty(exports, 'apply', {
  enumerable: true,
  get: function get() {
    return _io.apply;
  }
});
Object.defineProperty(exports, 'cps', {
  enumerable: true,
  get: function get() {
    return _io.cps;
  }
});
Object.defineProperty(exports, 'fork', {
  enumerable: true,
  get: function get() {
    return _io.fork;
  }
});
Object.defineProperty(exports, 'spawn', {
  enumerable: true,
  get: function get() {
    return _io.spawn;
  }
});
Object.defineProperty(exports, 'join', {
  enumerable: true,
  get: function get() {
    return _io.join;
  }
});
Object.defineProperty(exports, 'cancel', {
  enumerable: true,
  get: function get() {
    return _io.cancel;
  }
});
Object.defineProperty(exports, 'select', {
  enumerable: true,
  get: function get() {
    return _io.select;
  }
});
Object.defineProperty(exports, 'actionChannel', {
  enumerable: true,
  get: function get() {
    return _io.actionChannel;
  }
});
Object.defineProperty(exports, 'cancelled', {
  enumerable: true,
  get: function get() {
    return _io.cancelled;
  }
});
Object.defineProperty(exports, 'flush', {
  enumerable: true,
  get: function get() {
    return _io.flush;
  }
});
Object.defineProperty(exports, 'takeEvery', {
  enumerable: true,
  get: function get() {
    return _io.takeEvery;
  }
});
Object.defineProperty(exports, 'takeLatest', {
  enumerable: true,
  get: function get() {
    return _io.takeLatest;
  }
});
Object.defineProperty(exports, 'throttle', {
  enumerable: true,
  get: function get() {
    return _io.throttle;
  }
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNDEFINED_INPUT_ERROR = exports.INVALID_BUFFER = exports.isEnd = exports.END = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.emitter = emitter;
exports.channel = channel;
exports.eventChannel = eventChannel;
exports.stdChannel = stdChannel;

var _utils = __webpack_require__(0);

var _buffers = __webpack_require__(3);

var _scheduler = __webpack_require__(11);

var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
var END = exports.END = { type: CHANNEL_END_TYPE };
var isEnd = exports.isEnd = function isEnd(a) {
  return a && a.type === CHANNEL_END_TYPE;
};

function emitter() {
  var subscribers = [];

  function subscribe(sub) {
    subscribers.push(sub);
    return function () {
      return (0, _utils.remove)(subscribers, sub);
    };
  }

  function emit(item) {
    var arr = subscribers.slice();
    for (var i = 0, len = arr.length; i < len; i++) {
      arr[i](item);
    }
  }

  return {
    subscribe: subscribe,
    emit: emit
  };
}

var INVALID_BUFFER = exports.INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = exports.UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';

if (process.env.NODE_ENV !== 'production') {
  exports.UNDEFINED_INPUT_ERROR = UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
}

function channel() {
  var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _buffers.buffers.fixed();

  var closed = false;
  var takers = [];

  (0, _utils.check)(buffer, _utils.is.buffer, INVALID_BUFFER);

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw (0, _utils.internalErr)('Cannot have a closed channel with pending takers');
    }
    if (takers.length && !buffer.isEmpty()) {
      throw (0, _utils.internalErr)('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    checkForbiddenStates();
    (0, _utils.check)(input, _utils.is.notUndef, UNDEFINED_INPUT_ERROR);
    if (closed) {
      return;
    }
    if (!takers.length) {
      return buffer.put(input);
    }
    for (var i = 0; i < takers.length; i++) {
      var cb = takers[i];
      if (!cb[_utils.MATCH] || cb[_utils.MATCH](input)) {
        takers.splice(i, 1);
        return cb(input);
      }
    }
  }

  function take(cb) {
    checkForbiddenStates();
    (0, _utils.check)(cb, _utils.is.func, 'channel.take\'s callback must be a function');

    if (closed && buffer.isEmpty()) {
      cb(END);
    } else if (!buffer.isEmpty()) {
      cb(buffer.take());
    } else {
      takers.push(cb);
      cb.cancel = function () {
        return (0, _utils.remove)(takers, cb);
      };
    }
  }

  function flush(cb) {
    checkForbiddenStates(); // TODO: check if some new state should be forbidden now
    (0, _utils.check)(cb, _utils.is.func, 'channel.flush\' callback must be a function');
    if (closed && buffer.isEmpty()) {
      cb(END);
      return;
    }
    cb(buffer.flush());
  }

  function close() {
    checkForbiddenStates();
    if (!closed) {
      closed = true;
      if (takers.length) {
        var arr = takers;
        takers = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          arr[i](END);
        }
      }
    }
  }

  return { take: take, put: put, flush: flush, close: close,
    get __takers__() {
      return takers;
    },
    get __closed__() {
      return closed;
    }
  };
}

function eventChannel(subscribe) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _buffers.buffers.none();
  var matcher = arguments[2];

  /**
    should be if(typeof matcher !== undefined) instead?
    see PR #273 for a background discussion
  **/
  if (arguments.length > 2) {
    (0, _utils.check)(matcher, _utils.is.func, 'Invalid match function passed to eventChannel');
  }

  var chan = channel(buffer);
  var unsubscribe = subscribe(function (input) {
    if (isEnd(input)) {
      chan.close();
      return;
    }
    if (matcher && !matcher(input)) {
      return;
    }
    chan.put(input);
  });

  if (!_utils.is.func(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
  }

  return {
    take: chan.take,
    flush: chan.flush,
    close: function close() {
      if (!chan.__closed__) {
        chan.close();
        unsubscribe();
      }
    }
  };
}

function stdChannel(subscribe) {
  var chan = eventChannel(function (cb) {
    return subscribe(function (input) {
      if (input[_utils.SAGA_ACTION]) {
        cb(input);
        return;
      }
      (0, _scheduler.asap)(function () {
        return cb(input);
      });
    });
  });

  return _extends({}, chan, {
    take: function take(cb, matcher) {
      if (arguments.length > 1) {
        (0, _utils.check)(matcher, _utils.is.func, 'channel.take\'s matcher argument must be a function');
        cb[_utils.MATCH] = matcher;
      }
      chan.take(cb);
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = exports.takeLatest = exports.takeEvery = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.takeEveryHelper = takeEveryHelper;
exports.takeLatestHelper = takeLatestHelper;
exports.throttleHelper = throttleHelper;

var _channel = __webpack_require__(9);

var _utils = __webpack_require__(0);

var _io = __webpack_require__(4);

var _buffers = __webpack_require__(3);

var done = { done: true, value: undefined };
var qEnd = {};

function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          _fsm$qNext2 = _slicedToArray(_fsm$qNext, 3),
          q = _fsm$qNext2[0],
          output = _fsm$qNext2[1],
          _updateState = _fsm$qNext2[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return (0, _utils.makeIterator)(next, function (error) {
    return next(null, error);
  }, name, true);
}

function safeName(patternOrChannel) {
  if (_utils.is.channel(patternOrChannel)) {
    return 'channel';
  } else if (Array.isArray(patternOrChannel)) {
    return String(patternOrChannel.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(patternOrChannel);
  }
}

function takeEveryHelper(patternOrChannel, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: (0, _io.take)(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === _channel.END ? [qEnd] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function takeLatestHelper(patternOrChannel, worker) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  var yTake = { done: false, value: (0, _io.take)(patternOrChannel) };
  var yFork = function yFork(ac) {
    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
  };
  var yCancel = function yCancel(task) {
    return { done: false, value: (0, _io.cancel)(task) };
  };

  var task = void 0,
      action = void 0;
  var setTask = function setTask(t) {
    return task = t;
  };
  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === _channel.END ? [qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
}

function throttleHelper(delayLength, pattern, worker) {
  for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  var action = void 0,
      channel = void 0;

  var yActionChannel = { done: false, value: (0, _io.actionChannel)(pattern, _buffers.buffers.sliding(1)) };
  var yTake = function yTake() {
    return { done: false, value: (0, _io.take)(channel, pattern) };
  };
  var yFork = function yFork(ac) {
    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
  };
  var yDelay = { done: false, value: (0, _io.call)(_utils.delay, delayLength) };

  var setAction = function setAction(ac) {
    return action = ac;
  };
  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yActionChannel, setChannel];
    },
    q2: function q2() {
      return ['q3', yTake(), setAction];
    },
    q3: function q3() {
      return action === _channel.END ? [qEnd] : ['q4', yFork(action)];
    },
    q4: function q4() {
      return ['q2', yDelay];
    }
  }, 'q1', 'throttle(' + safeName(pattern) + ', ' + worker.name + ')');
}

var deprecationWarning = function deprecationWarning(helperName) {
  return 'import ' + helperName + ' from \'redux-saga\' has been deprecated in favor of import ' + helperName + ' from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
};
var takeEvery = exports.takeEvery = (0, _utils.deprecate)(takeEveryHelper, deprecationWarning('takeEvery'));
var takeLatest = exports.takeLatest = (0, _utils.deprecate)(takeLatestHelper, deprecationWarning('takeLatest'));
var throttle = exports.throttle = (0, _utils.deprecate)(throttleHelper, deprecationWarning('throttle'));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asap = asap;
exports.suspend = suspend;
exports.flush = flush;

var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/
var semaphore = 0;

/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    flush();
  }
}

/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/
function asap(task) {
  if (!semaphore) {
    exec(task);
  } else {
    queue.push(task);
  }
}

/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/
function suspend() {
  semaphore++;
}

/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/
function flush() {
  semaphore--;
  if (!semaphore && queue.length) {
    exec(queue.shift());
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleAsync = exports.actionsNamespace = undefined;

var _actionsNamespace = __webpack_require__(5);

var _actionsNamespace2 = _interopRequireDefault(_actionsNamespace);

var _simpleAsync = __webpack_require__(6);

var _simpleAsync2 = _interopRequireDefault(_simpleAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.actionsNamespace = _actionsNamespace2.default;
exports.simpleAsync = _simpleAsync2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=redux-belt.js.map