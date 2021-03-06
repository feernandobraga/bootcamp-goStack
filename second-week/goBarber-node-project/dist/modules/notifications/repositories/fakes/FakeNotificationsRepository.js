"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _Notification = _interopRequireDefault(require("../../infra/typeorm/schemas/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// used to create a fake objectID
// schema is used to strongly type the return type of methods in the class
class NotificationsRepository {
  constructor() {
    this.notifications = [];
  }

  async create({
    content,
    recipient_id
  }) {
    const notification = new _Notification.default();
    Object.assign(notification, {
      id: new _mongodb.ObjectID(),
      content,
      recipient_id
    }); // new ObjectID creates a new id as mongo does

    this.notifications.push(notification);
    return notification;
  }

}

var _default = NotificationsRepository;
exports.default = _default;