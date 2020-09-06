"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for data validation
// importing the middleware so routes are automatically verified for the token
// import the controller
// instantiating a new controller
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
const appointmentsRouter = (0, _express.Router)(); // adds the middleware checking to all rotes related to appointments

appointmentsRouter.use(_ensureAuthenticated.default);
appointmentsRouter.post("/", (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    // this will get the fields from the API request body
    provider_id: _celebrate.Joi.string().uuid().required(),
    // this ensures that the field provider_id is a string, of uuid type and mandatory
    date: _celebrate.Joi.date().required() // ensures the date has a date formate and is required

  }
}), appointmentsController.create); // display all appointments for the logged provider

appointmentsRouter.get("/me", providerAppointmentsController.index);
var _default = appointmentsRouter;
exports.default = _default;