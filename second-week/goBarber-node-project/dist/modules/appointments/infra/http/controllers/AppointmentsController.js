"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import the container for dependency injection
// importing the service used to create appointments
class AppointmentsController {
  async create(request, response) {
    // gets the barber and the date to create an appointment
    const {
      provider_id,
      date
    } = request.body; // retrieving the user that is logged in

    const user_id = request.user.id; // gets the date that is coming from the api, converts is to a JS object
    // const parsedDate = parseISO(date);
    // instantiate a new Service -> CreateAppointmentService

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default); // since the execute() will save data to the database, this needs to be an asynchronous function and therefore, needs
    // the await keyword. Also, the method post needs to be an asynchronous function.


    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id
    }); // returns the newly created appointment

    return response.json(appointment);
  }

}

exports.default = AppointmentsController;