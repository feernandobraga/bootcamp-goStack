"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import container for dependency injection
// to apply the class-transformation
//importing the service so we can use it
class ProfileController {
  async show(request, response) {
    const user_id = request.user.id; //capture the user id from the authenticated user

    const showProfile = _tsyringe.container.resolve(_ShowProfileService.default); // instantiate the service using dependency injection


    const user = await showProfile.execute({
      user_id
    }); // run the execute() method from the service

    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const user_id = request.user.id; // this is got from the authenticated user. We can do this because of the middleware ensureAuthenticated

    const {
      name,
      email,
      old_password,
      password
    } = request.body;

    const updateProfile = _tsyringe.container.resolve(_UpdateProfileService.default);

    const user = await updateProfile.execute({
      name,
      email,
      password,
      old_password,
      user_id
    }); // we can delete the user password from the response, so it doesn't show back to the user/API request

    delete user.password;
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = ProfileController;