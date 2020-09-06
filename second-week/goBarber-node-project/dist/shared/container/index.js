"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This files is responsible for the dependency injection
 * it links an interface with a repository
 */
// importing the dependency injection for the hashing provider
// importing the dependency injection for the disk storage provider

/**
 * the register.Singleton gets 2 parameters
 * an ID -> AppointmentsRepository
 * the repository that will be injected when the ID is called
 */
_tsyringe.container.registerSingleton("AppointmentsRepository", _AppointmentsRepository.default);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.default);

_tsyringe.container.registerSingleton("UserTokensRepository", _UserTokensRepository.default);

_tsyringe.container.registerSingleton("NotificationsRepository", _NotificationsRepository.default);