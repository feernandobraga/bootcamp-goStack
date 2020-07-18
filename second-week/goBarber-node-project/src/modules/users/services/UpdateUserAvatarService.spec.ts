import AppError from "@shared/errors/AppError";
// importing the fake repository that has the functions that will be used by the service we want to test against
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";

// importing the fake storage repository
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

// importing the service that we will test
import UpdateUserAvatarService from "./UpdateUserAvatarService";

describe("UpdateUserAvatar", () => {
  it("should be able to add a new avatar", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    // create the service based on the repository
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg",
    });

    // conditions to satisfy the test
    expect(user.avatar).toBe("avatar.jpg");
  });

  it("should not be able to update avatar if not authenticated", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    // create the service based on the repository
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    // conditions to satisfy the test
    expect(
      updateUserAvatar.execute({
        user_id: "non-existant-user",
        avatarFilename: "avatar.jpg",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete the old avatar when updating with a new one", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    // create the service based on the repository
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    // method spy from jest is used to see if certain methods where executed
    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    // create a new user
    const user = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.jpg",
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar2.jpg",
    });

    // conditions to satisfy the test
    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg"); // checks if the methods from jest.spyOn has run
    expect(user.avatar).toBe("avatar2.jpg");
  });
});
