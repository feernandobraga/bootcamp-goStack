"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _INotificationRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AppointmentsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("NotificationsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CacheProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationRepository.default === "undefined" ? Object : _INotificationRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAppointmentService {
  constructor(appointmentsRepository, notificationsRepository, cacheProvider) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  } // date and provider are parameters coming from the routes, and strongly type it through the interface IRequest just above this line.


  async execute({
    date,
    provider_id,
    user_id
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      // user should not be able to book an appointment in the past
      throw new _AppError.default("You cannot create an appointment in a past date");
    }

    if (user_id === provider_id) {
      // user should not be able to schedule an appointment with himself
      throw new _AppError.default("You cannot create an appointment with yourself");
    } // runs the method findByDate() from the AppointmentsRepository and if it finds one appointment, returns it,
    // otherwise, it returns null. Since it is querying the database, it needs to be an asynchronous function


    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

    if (findAppointmentInSameDate) {
      // condition for two appointments in the same hour
      throw new _AppError.default("This time slot is not available anymore");
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      // user can only make bookings within the business hours
      throw new _AppError.default("You cannot create appointments out of the business hours - 8AM - 5PM");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    });
    const dateFormatted = (0, _dateFns.format)(appointmentDate, "dd/MM/yyyy 'at' HH:mm'h'"); // formatting the date to pass it on as notification
    // once the appointment is create, it stores a notification on MongoDB

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `You have a new booking on the ${dateFormatted}`
    });
    await this.cacheProvider.invalidatePrefix( // when a new appointment is create, we need to invalidate the cache
    `provider-appointments:${provider_id}:${(0, _dateFns.format)(appointmentDate, "yyyy-M-d")}`);
    console.log(`cache invalidated: provider-appointments:${provider_id}:${(0, _dateFns.format)(appointmentDate, "yyyy-M-d")}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;