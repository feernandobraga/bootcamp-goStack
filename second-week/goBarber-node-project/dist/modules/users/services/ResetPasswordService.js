"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IUserTokensRepository = _interopRequireDefault(require("../repositories/IUserTokensRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dateFns = require("date-fns");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ResetPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IUserTokensRepository.default === "undefined" ? Object : _IUserTokensRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordService {
  constructor(usersRepository, userTokensRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.hashProvider = hashProvider;
  }
  /**
   * The method receives a token and a password
   * it then checks if the given token exists in the userToken table/repository
   * If it find the token then it looks for the user associated with it and then attributes the new password to the user
   */


  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new _AppError.default("User token does not exist");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new _AppError.default("User does not exist");
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenCreateAt, 2); // console.log(`token created at ${tokenCreateAt}`);
    // console.log("now", new Date(Date.now()));
    // console.log(`compare Date ${new Date(compareDate)}`);

    const newCompareDate = new Date(compareDate); // console.log("is after: ", result);
    // console.log(userToken.created_at);
    // const now = new Date();

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default("Expired Token :(");
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = ResetPasswordService;
exports.default = _default;