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

let ListProviderMonthAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AppointmentsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderMonthAvailabilityService {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    provider_id,
    year,
    month
  }) {
    // retrieves all appointments for the month for a particular provider
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month
    });
    const numberOfDaysInMonth = (0, _dateFns.getDaysInMonth)(new Date(year, month - 1)); // this creates an array based on the number of days in a month

    const eachDayArray = Array.from({
      length: numberOfDaysInMonth
    }, (value, index) => index + 1); // this will go through each day of the month

    const availability = eachDayArray.map(day => {
      // and then will return all appointments where day is equals to the day from the map() function
      // appointmentsInDay is an array that stores appointments, so by checking its length, we now how many appointments we have on that day
      const compareDate = new Date(year, month - 1, day, 23, 59, 59); // this will create a date in the last second of the day and we use this to compare with the current hour.
      // (continuing from line above) only disables the day if NOW() is greater than > compareDate

      const appointmentsInDay = appointments.filter(appointment => {
        return (0, _dateFns.getDate)(appointment.date) === day;
      });
      return {
        day,
        // se o final do dia(compareDate) eh maior que agora, significa que o dia ainda nao acabou e portanto pode ter horarios disponiveis
        available: (0, _dateFns.isAfter)(compareDate, new Date()) && appointmentsInDay.length < 10 // a day can only have 10 appointments, so if >= 10, no slots are available
        // change to < 1, to pass the test

      };
    });
    return availability;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProviderMonthAvailabilityService;
exports.default = _default;