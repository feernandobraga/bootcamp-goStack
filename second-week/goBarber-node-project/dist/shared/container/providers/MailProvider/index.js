"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

var _SESMailProvider = _interopRequireDefault(require("./implementations/SESMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dependency injection
// the configuration file that sets the correct driver
const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default),
  ses: _tsyringe.container.resolve(_SESMailProvider.default)
}; //this one is different just to make sure it executes the constructor of this class

_tsyringe.container.registerInstance("MailProvider", providers[_mail.default.driver]); // gets the value from mail config file