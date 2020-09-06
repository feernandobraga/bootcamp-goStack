"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the service that we will reset the password
//import the repository responsible for creating fake tokens
//importing fake hash provider to hash the password
let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPassword;
describe("ResetPasswordService", () => {
  beforeEach(() => {
    // instantiates the repository and then the service, by passing the repository created
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default(); // instantiate the service with the repositories via dependency injection

    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it("should be able to reset the password", async () => {
    //monitor if the method sendMail was called
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");
    await resetPassword.execute({
      password: "123123",
      token
    });
    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe("123123");
  }); //

  it("should not be able to reset the password with non-existent token", async () => {
    await expect(resetPassword.execute({
      token: "non-existent-token",
      password: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
  }); //

  it("should not be able to reset the password with non-existent user", async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate("non-existent-user");
    await expect(resetPassword.execute({
      token,
      password: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
  }); //

  it("should not be able to reset the password with expired token", async () => {
    //monitor if the method sendMail was called
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      // this will return the time 3 hours ahead from now
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 14);
    });
    await expect(resetPassword.execute({
      password: "123123",
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  }); //
});