"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// importing the interface so the method can implement it
class FakeMailTemplateProvider {
  async parse() {
    return "Fake Mail Content";
  }

}

var _default = FakeMailTemplateProvider;
exports.default = _default;