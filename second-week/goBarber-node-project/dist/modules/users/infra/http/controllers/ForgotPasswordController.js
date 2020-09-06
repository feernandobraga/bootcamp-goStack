"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordEmailService = _interopRequireDefault(require("../../../services/SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import container for dependency injection
//importing the service so we can use it
class ForgotPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body; // using dependency injection to create a new service and pass the service to it

    const sendForgotPasswordEmail = _tsyringe.container.resolve(_SendForgotPasswordEmailService.default);

    await sendForgotPasswordEmail.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = ForgotPasswordController;