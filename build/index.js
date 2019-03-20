"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jaegerClient = require("jaeger-client");

var _opentracing = require("opentracing");

var _ramda = _interopRequireDefault(require("ramda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tracer;
var DEFAULT_CONFIG = {
  sampler: {
    type: 'const',
    param: 1
  },
  reporter: {
    logSpans: true
  }
};
var DEFAULT_OPTIONS = {
  logger: {
    info: function info(msg) {
      console.log('INFO : ', msg);
    },
    error: function error(msg) {
      console.log('ERROR : ', msg);
    }
  }
};

var init = function init(config, options) {
  var tracerConfig = _objectSpread({}, config, DEFAULT_CONFIG);

  var tracerOptions = _objectSpread({}, options, DEFAULT_OPTIONS);

  tracer = (0, _jaegerClient.initTracer)(tracerConfig, tracerOptions);
};

var getParentSpan = function getParentSpan(format, injectData) {
  return tracer.extract(format, injectData);
};

var startSpan = function startSpan(spanName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var spanOptions = _ramda.default.omit(['isChild', 'isFollowsFrom'], options);

  if (options.isChild && _typeof(options.isChild) === 'object') {
    var parentSpanContext = getParentSpan(options.isChild.format, options.isChild.injectData);
    spanOptions.childOf = parentSpanContext;
  }

  if (options.isFollowsFrom && _typeof(options.isChild) === 'object') {
    var _parentSpanContext = getParentSpan(options.isFollowsFrom.format, options.isFollowsFrom.injectData);

    spanOptions.references = [(0, _opentracing.followsFrom)(_parentSpanContext)];
  }

  return tracer.startSpan(spanName, spanOptions);
};

var inject = function inject(span, format, payload) {
  return tracer.inject(span, format, payload);
};

var _default = {
  tracer: tracer,
  init: init,
  startSpan: startSpan,
  inject: inject,
  getParentSpan: getParentSpan
};
exports.default = _default;
//# sourceMappingURL=index.js.map