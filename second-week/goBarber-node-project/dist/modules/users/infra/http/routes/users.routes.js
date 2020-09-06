"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _multer = _interopRequireDefault(require("multer"));

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import container for dependency in
// we need to import the ensureAuthenticated middleware to make sure a user can only update the avatar if he/she is Authenticated
// import multer to handle the avatar
// for validating the data coming from the API call
//import the upload configuration file
// import the user avatar controller
// import the user controller
// instantiate the controller
const usersController = new _UsersController.default(); // instantiate the user avatar controller

const userAvatarController = new _UserAvatarController.default();
const usersRouter = (0, _express.Router)(); // we will use this variable to handle the upload file

const upload = (0, _multer.default)(_upload.default.multer);
/**
 * POST to localhost:3333/users
 * route to create a new user
 */

usersRouter.post("/", (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.create);
/**
 * PATCH to localhost:3333/users/avatar
 * Route to update the user with an avatar image.
 * We use PATCH when we need to update just a single piece of information about the entity
 * We use PUT when we update the entire entity
 * The route also takes the middleware to ensure the user must be authenticated before updating the avatar
 * It also takes a SECOND middleware (upload.single('avatar')) that will handle the file that is passed
 * The method .single() takes as a parameter the name of the field that will contain the image when the route is called
 */

usersRouter.patch("/avatar", _ensureAuthenticated.default, upload.single("avatar"), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;