import AppError from "@shared/errors/AppError";
// importing the fake repository that has the functions that will be used by the service we want to test against
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";

// importing the service that we will test
import AuthenticateUserService from "./AuthenticateUserService";

// importing the hashing provider
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

// import the service to create user
import CreateUserService from "./CreateUserService";

describe("AuthenticateUser", () => {
  it("should be able to authenticate", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123",
    });

    // create a new user
    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123123",
    });

    // conditions to satisfy the test
    expect(response).toHaveProperty("token"); // response should have a token property
    expect(response.user).toEqual(user); // response.user should be equal to the user we created
  });

  it("should not be able to authenticate with a non-existent user", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    // conditions to satisfy the test
    expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong credentials", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123",
    });

    // conditions to satisfy the test
    expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
