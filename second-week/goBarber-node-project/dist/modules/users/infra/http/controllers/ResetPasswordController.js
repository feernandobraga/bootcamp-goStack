"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordService = _interopRequireDefault(require("../../../services/ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import container for dependency injection
//importing the service so we can use it
class ResetPasswordController {
  async create(request, response) {
    const {
      password,
      token
    } = request.body; // using dependency injection to create a new service and pass the service to it

    const resetPassword = _tsyringe.container.resolve(_ResetPasswordService.default);

    await resetPassword.execute({
      token,
      password
    });
    return response.status(204).json();
  }

}

exports.default = ResetPasswordController;