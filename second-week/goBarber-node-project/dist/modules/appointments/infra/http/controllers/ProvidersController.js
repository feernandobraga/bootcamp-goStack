"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProvidersService = _interopRequireDefault(require("../../../services/ListProvidersService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import the container for dependency injection
// importing the service used to create appointments
class ProvidersController {
  async index(request, response) {
    const user_id = request.user.id; // this gets the id from the logged user
    // instantiate a new Service -> CreateAppointmentService

    const listProviders = _tsyringe.container.resolve(_ListProvidersService.default); // since the execute() will save data to the database, this needs to be an asynchronous function and therefore, needs
    // the await keyword. Also, the method post needs to be an asynchronous function.


    const providers = await listProviders.execute({
      user_id
    }); // returns the newly created providers

    return response.json((0, _classTransformer.classToClass)(providers));
  }

}

exports.default = ProvidersController;