"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the fake storage repository
// importing the service that we will test
let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe("UpdateProfile", () => {
  beforeEach(() => {
    // instantiates the repository and then the service, by passing the repository created
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default(); // create the service based on the repository

    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it("should be able to update the user profile", async () => {
    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "James Smith",
      email: "jamessmith@example.com"
    }); // conditions to satisfy the test

    expect(updatedUser.name).toBe("James Smith");
    expect(updatedUser.email).toBe("jamessmith@example.com");
  }); //

  it("should not be able to update the email to an already taken one", async () => {
    // create a new user
    await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    });
    const user = await fakeUsersRepository.create({
      name: "James Smith",
      email: "jamessmith@example.com",
      password: "123456"
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: "Pafuncio",
      email: "johndoe@example.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  }); //

  it("should be able update the password", async () => {
    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "James Smith",
      email: "jamessmith@example.com",
      old_password: "123123",
      password: "abcde"
    }); // conditions to satisfy the test

    expect(updatedUser.password).toBe("abcde");
  }); //

  it("should not be able update the password without providing the old password", async () => {
    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    }); // conditions to satisfy the test

    await expect(updateProfile.execute({
      user_id: user.id,
      name: "James Smith",
      email: "jamessmith@example.com",
      password: "abcde"
    })).rejects.toBeInstanceOf(_AppError.default);
  }); //

  it("should not be able update the password providing the wrong old password", async () => {
    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    }); // conditions to satisfy the test

    await expect(updateProfile.execute({
      user_id: user.id,
      name: "James Smith",
      email: "jamessmith@example.com",
      old_password: "wrong-old-password",
      password: "abcde"
    })).rejects.toBeInstanceOf(_AppError.default);
  }); //

  it("should not be able to update the user profile if the user doesn't exist", async () => {
    await expect(updateProfile.execute({
      user_id: "non-existing user id",
      name: "any name",
      email: "jamessmith@example.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});