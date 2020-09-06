"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import container for dependency injection
// to apply the class-transformation
//importing the service so we can use it
class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      name,
      email,
      password
    }); // we can delete the user password from the response, so it doesn't show back to the user/API request
    // delete user.password;

    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;