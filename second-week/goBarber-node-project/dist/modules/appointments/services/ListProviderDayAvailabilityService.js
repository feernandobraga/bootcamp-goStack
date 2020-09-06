"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderDayAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AppointmentsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderDayAvailabilityService {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    provider_id,
    year,
    month,
    day
  }) {
    // list all appointments(day, month, year) for a particular provider
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    });
    const hourStart = 8; // console.log(appointments);

    const eachHourArray = Array.from({
      length: 10
    }, (value, index) => index + hourStart);
    const currentDate = new Date(Date.now()); // scan hours from 8 until 17 (which is hourStart + 10)

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => (0, _dateFns.getHours)(appointment.date) === hour // retrieve the hour from the appointment date and compar to the hour in the map function
      ); // just for the sake of understanding what is going on

      if (hasAppointmentInHour) {
        console.log(hasAppointmentInHour.date, "is equivalent to ", (0, _dateFns.getHours)(hasAppointmentInHour.date));
        console.log(`${hasAppointmentInHour.date} is equivalent to ${(0, _dateFns.getHours)(hasAppointmentInHour.date)}`);
      } // this is so we can display availability, but excluding the hours of the day that have already passed.
      // it creates a new date based on the params given to the function and compares it to the value of current date


      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !hasAppointmentInHour && (0, _dateFns.isAfter)(compareDate, currentDate) // check if there is not appointment on that time, and if the time is not from hours ago

      };
    });
    console.log(availability);
    return availability;
  }

}) || _class) || _class) || _class) || _class); // end class

var _default = ListProviderDayAvailabilityService;
exports.default = _default;