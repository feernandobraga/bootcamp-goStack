"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Notification = _interopRequireDefault(require("../schemas/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// schema is used to strongly type the return type of methods in the class
class NotificationsRepository {
  // instantiating the repository from ORM
  constructor() {
    this.ormRepository = void 0;
    // getMongoRepository requires 2 params, one is the schema and the other one is the connection name as per typeorm config file
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Notification.default, "mongo"); // instantiating the repository from ORM with the schema
  }

  async create({
    content,
    recipient_id
  }) {
    const notification = this.ormRepository.create({
      content,
      recipient_id
    });
    await this.ormRepository.save(notification);
    return notification;
  }

}

var _default = NotificationsRepository;
exports.default = _default;