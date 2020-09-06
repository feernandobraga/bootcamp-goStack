"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointment = _interopRequireDefault(require("../entities/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  //injecting/instantiating the repository from ORM
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointment.default);
  }

  async findByDate(date, provider_id) {
    // .findOne() is one of the many methods available to the Repository Interface that we inherited in this class
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    }); // returns the appointment if it finds it, otherwise, returns undefined

    return findAppointment;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    /**
     * retrieve the availability for the month from a given provider
     */
    // reading padStart() -> if the variable doesn't have two digits, add 0 as the first digit
    const parsedMonth = String(month).padStart(2, "0"); //this will convert the month to two digits, ie 1 becomes 01, 3 becomes 03, 10 remains 10

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)((dateFieldName // Raw() is used to deal with SQL query directly
        ) => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }) {
    /**
     * retrieve the availability for the day from a given provider
     */
    // reading padStart() -> if the variable doesn't have two digits, add 0 as the first digit
    const parsedMonth = String(month).padStart(2, "0"); //this will convert the month to two digits, ie 1 becomes 01, 3 becomes 03, 10 remains 10

    const parsedDay = String(day).padStart(2, "0");
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)((dateFieldName // Raw() is used to deal with SQL query directly
        ) => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      },
      relations: ["user"] // this will bring the user associated to that appointment

    });
    return appointments;
  }

  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;