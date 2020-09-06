"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _classTransformer = require("class-transformer");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProvidersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CacheProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProvidersService {
  constructor(usersRepository, cacheProvider) {
    this.usersRepository = usersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    user_id
  }) {
    // try to fetch information from the cache database
    let users = await this.cacheProvider.recover(`providers-list:${user_id}`); // users = null;

    if (!users) {
      // if information doesn't exists in the cached database, fetch it from the relational database and save it into redis
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      });
      await this.cacheProvider.save(`providers-list:${user_id}`, (0, _classTransformer.classToClass)(users)); // semi-column is used to separate categories in redis
    }

    return users;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListProvidersService;
exports.default = _default;