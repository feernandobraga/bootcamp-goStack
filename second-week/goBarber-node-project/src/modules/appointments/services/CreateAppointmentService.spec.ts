// importing the fake repository that has the functions that will be used by the service we want to test against
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";

import AppError from "@shared/errors/AppError";

// importing the service that we will test
import CreateAppointmentService from "./CreateAppointmentService";

describe("CreateAppointment", () => {
  it("should be able to create a new appointment", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    // create a new appointment
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "123123",
    });

    // conditions to satisfy the test
    expect(appointment).toHaveProperty("id"); // appointment should have an id
    expect(appointment.provider_id).toBe("123123"); // provider_id should be '123123'
  });

  it("should not be able to create two appointments on the same date", async () => {
    // instantiates the repository and then the service, by passing the repository created
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);

    // create a new appointment
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "123123",
    });

    // create a new appointment with the same date
    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
