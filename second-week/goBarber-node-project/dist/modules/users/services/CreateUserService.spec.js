"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the service that we will test
// importing the hashing provider
let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let fakeCacheProvider;
describe("CreateUser", () => {
  beforeEach(() => {
    // instantiates the repository and then the service, by passing the repository created
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it("should be able to create a new user", async () => {
    // create a new user
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123"
    }); // conditions to satisfy the test

    expect(user).toHaveProperty("id"); // user should have an id
  });
  it("should not be able to create a new user with same email", async () => {
    // create a new user
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123"
    }); // conditions to satisfy the test

    await expect(createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123"
    })).rejects.toBeInstanceOf(_AppError.default); // should generate an error
  });
});