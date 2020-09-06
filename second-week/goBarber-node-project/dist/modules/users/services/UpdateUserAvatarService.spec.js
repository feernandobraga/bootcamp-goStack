"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the fake storage repository
// importing the service that we will test
let fakeUsersRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe("UpdateUserAvatar", () => {
  beforeEach(() => {
    // instantiates the repository and then the service, by passing the repository created
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default(); // create the service based on the repository

    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  });
  it("should be able to add a new avatar", async () => {
    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg"
    }); // conditions to satisfy the test

    expect(user.avatar).toBe("avatar.jpg");
  });
  it("should not be able to update avatar if not authenticated", async () => {
    // conditions to satisfy the test
    expect(updateUserAvatar.execute({
      user_id: "non-existant-user",
      avatarFilename: "avatar.jpg"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should delete the old avatar when updating with a new one", async () => {
    // method spy from jest is used to see if certain methods where executed
    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile"); // create a new user

    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg"
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar2.jpg"
    }); // conditions to satisfy the test

    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg"); // checks if the methods from jest.spyOn has run

    expect(user.avatar).toBe("avatar2.jpg");
  });
});