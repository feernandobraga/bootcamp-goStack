"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _appointments = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/appointments.routes"));

var _providers = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providers.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)(); // this redirects every hit to /appointments to the appointments.routes.ts file

routes.use("/appointments", _appointments.default); // this redirects every hit to /users to the users.routes.ts file

routes.use("/users", _users.default); // this redirects every hit to /sessions to the sessions.routes.ts file

routes.use("/sessions", _sessions.default); // redirect the user to the appropriate routes if the route is /password

routes.use("/password", _password.default); // redirect the user to the appropriate routes if the route is /profile

routes.use("/profile", _profile.default); // redirect the user to the appropriate routes if the route is /profile

routes.use("/providers", _providers.default);
var _default = routes;
exports.default = _default;