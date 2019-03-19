"use strict";

var _src = _interopRequireDefault(require("./src"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Init tracer....');

_src.default.init({
  serviceName: 'test-jeager-wrapper'
});

var span = _src.default.startSpan('test', {
  tags: {
    test: 'hello'
  }
});

span.setTag("Test", "Hello");
span.finish();
//# sourceMappingURL=test.js.map