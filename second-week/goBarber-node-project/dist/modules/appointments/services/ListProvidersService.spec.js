"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the fake repository that has the functions that will be used by the service we want to test against
// importing the service that we will test
let fakeUsersRepository;
let listProviders;
let fakeCacheProvider;
describe("ListProviders", () => {
  beforeEach(() => {
    // instantiates the repository and then the service, by passing the repository created
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default(); // create the service based on the repository

    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it("should be able to list the providers", async () => {
    // create a new user
    const user1 = await fakeUsersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password: "123123"
    });
    const user2 = await fakeUsersRepository.create({
      name: "john tre",
      email: "johndoe@example.com",
      password: "123123"
    });
    const loggedUser = await fakeUsersRepository.create({
      name: "john qua",
      email: "johndoe@example.com",
      password: "123123"
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    }); // conditions to satisfy the test
    // we use toEqual to compare the contents from the variables

    expect(providers).toEqual([user1, user2]);
  }); //
});