"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || "ethereal",
  defaults: {
    // default fields for sending the email
    from: {
      email: "contact@fernandobraga.me",
      name: 'Fernando Braga'
    }
  }
};
exports.default = _default;