"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the service that we will test
// import fake mail provider
//import the repository responsible for creating fake tokens
let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    // instantiates the repository and then the service, by passing the repository created
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default(); // instantiate the service with the repositories via dependency injection

    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it("should be able to retrieve password via email", async () => {
    //monitor if the method sendMail was called
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    await sendForgotPasswordEmail.execute({
      email: "johndoe@example.com"
    }); // conditions to satisfy the test - checks if the method sendMail was ever executed

    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to recover the password for a non-existent user", async () => {
    // conditions to satisfy the test - checks if the method sendMail was ever executed
    await expect(sendForgotPasswordEmail.execute({
      email: "johndoe@example.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should generate a forgot password token", async () => {
    //monitor if the method sendMail was called
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    await sendForgotPasswordEmail.execute({
      email: "johndoe@example.com"
    }); // conditions to satisfy the test - checks if the method sendMail was ever executed

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});