"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ForgotPasswordController = _interopRequireDefault(require("../controllers/ForgotPasswordController"));

var _ResetPasswordController = _interopRequireDefault(require("../controllers/ResetPasswordController"));

var _celebrate = require("celebrate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the controller
// for validating the data coming from the API call
// instantiate the controllers
const forgotPasswordController = new _ForgotPasswordController.default();
const resetPasswordController = new _ResetPasswordController.default();
const passwordRouter = (0, _express.Router)(); // localhost:3333/password/forgot

passwordRouter.post("/forgot", (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required()
  }
}), forgotPasswordController.create); // localhost:3333/password/reset

passwordRouter.post("/reset", (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _celebrate.Joi.string().uuid().required(),
    password: _celebrate.Joi.string().required(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref("password")) // we reference the field password, so these must have the same value

  }
}), resetPasswordController.create);
var _default = passwordRouter;
exports.default = _default;