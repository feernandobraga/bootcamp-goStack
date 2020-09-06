"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import container for dependency injection
// to apply the class-transformation
// import AvatarService
class UserAvatarController {
  async update(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);
    /**
     * the method execute is passing the user_id for the logged user and the filename generated through the middleware upload.singe('avatar')
     * we can only retrieve the user_id from the request, because if you remember, we appended the type user inside the Request.
     * More on that you can find it in your notes about Route Guard - Advanced Routing
     */


    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    delete user.password;
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserAvatarController;