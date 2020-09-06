"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the service that we will test
// importing the hashing provider
let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let authenticateUser;
describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it("should be able to authenticate", async () => {
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    }); // create a new user

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123123"
    }); // conditions to satisfy the test

    expect(response).toHaveProperty("token"); // response should have a token property

    expect(response.user).toEqual(user); // response.user should be equal to the user we created
  });
  it("should not be able to authenticate with a non-existent user", async () => {
    // conditions to satisfy the test
    await expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to authenticate with wrong credentials", async () => {
    await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    }); // conditions to satisfy the test

    await expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: "wrong-password"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});