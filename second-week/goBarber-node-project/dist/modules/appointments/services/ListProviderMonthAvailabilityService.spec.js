"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("./ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the service that we will test
let fakeAppointmentsRepository;
let listProviderMonthAvailabilityService;
describe("ListProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default(); // create the service based on the repository

    listProviderMonthAvailabilityService = new _ListProviderMonthAvailabilityService.default(fakeAppointmentsRepository);
  });
  it("should be able to list the month's availability from provider", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "123123",
      date: new Date(2020, 3, 20, 8, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "123123",
      date: new Date(2020, 4, 20, 8, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "123123",
      date: new Date(2020, 4, 20, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "123123",
      date: new Date(2020, 4, 21, 8, 0, 0)
    });
    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: "user",
      year: 2020,
      month: 5
    }); //

    expect(availability).toEqual(expect.arrayContaining([{
      day: 19,
      available: true
    }, {
      day: 20,
      available: false
    }, {
      day: 21,
      available: false
    }, {
      day: 22,
      available: true
    }]));
  }); //
});