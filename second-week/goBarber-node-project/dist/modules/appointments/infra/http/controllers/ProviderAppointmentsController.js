"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderAppointmentsService = _interopRequireDefault(require("../../../services/ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import the container for dependency injection
// importing the service used to create appointments
class ProviderAppointmentsController {
  async index(request, response) {
    // gets the barber and the date to create an appointment
    const {
      day,
      month,
      year
    } = request.query; // retrieving the user that is logged in

    const provider_id = request.user.id; // instantiate a new Service -> CreateAppointmentService

    const listProviderAppointments = _tsyringe.container.resolve(_ListProviderAppointmentsService.default); // since the execute() will save data to the database, this needs to be an asynchronous function and therefore, needs
    // the await keyword. Also, the method post needs to be an asynchronous function.


    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    }); // returns the newly created appointment

    return response.json(appointments);
  }

}

exports.default = ProviderAppointmentsController;