"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the service that we will test
let fakeUsersRepository;
let showProfile;
describe("UpdateProfile", () => {
  beforeEach(() => {
    // instantiates the repository and then the service, by passing the repository created
    fakeUsersRepository = new _FakeUsersRepository.default(); // create the service based on the repository

    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  });
  it("should be able to display the user profile", async () => {
    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    });
    const profile = await showProfile.execute({
      user_id: user.id
    }); // conditions to satisfy the test

    expect(profile.name).toBe("john doe");
    expect(profile.email).toBe("johndoe@example.com");
  }); //

  it("should not be able to display the user profile if the user doesn't exist", async () => {
    await expect(showProfile.execute({
      user_id: "non-existing user id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});