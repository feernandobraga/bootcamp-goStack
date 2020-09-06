"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderMonthAvailabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvailabilityController"));

var _ProviderDayAvailabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvailabilityController"));

var _celebrate = require("celebrate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the middleware so routes are automatically verified for the token
// import the controllers
// for data validation
// instantiating the controller
const providersController = new _ProvidersController.default();
const providerMonthAvailabilityController = new _ProviderMonthAvailabilityController.default();
const providerDayAvailabilityController = new _ProviderDayAvailabilityController.default();
const providersRouter = (0, _express.Router)(); // adds the middleware checking to all rotes related to appointments

providersRouter.use(_ensureAuthenticated.default); // localhost:333/providers

providersRouter.get("/", providersController.index); // localhost:333/providers/providers:id

providersRouter.get("/:provider_id/month-availability", (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    // this time it gets the params from the url
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerMonthAvailabilityController.index); // localhost:333/providers/:provider_id/

providersRouter.get("/:provider_id/day-availability", (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    // this time it gets the params from the url
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerDayAvailabilityController.index);
var _default = providersRouter;
exports.default = _default;