import AppError from "@shared/errors/AppError";
// importing the fake repository that has the functions that will be used by the service we want to test against
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";

// importing the service that we will test
import CreateUserService from "./CreateUserService";

// importing the hashing provider
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    // create a new user
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123",
    });

    // conditions to satisfy the test
    expect(user).toHaveProperty("id"); // user should have an id
  });

  it("should not be able to create a new user with same email", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    // create a new user
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123",
    });

    // conditions to satisfy the test
    expect(
      createUser.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError); // should generate an error
  });
});
