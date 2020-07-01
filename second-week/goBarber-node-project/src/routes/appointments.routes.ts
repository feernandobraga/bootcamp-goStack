import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import { getCustomRepository } from "typeorm";

// importing the middleware so routes are automatically verified for the token
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

// adds the middleware checking to all rotes related to appointments
appointmentsRouter.use(ensureAuthenticated);

/**
 * GET to localhost:3333/appointments
 */
appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

/**
 * POST to localhost:3333/appointments
 * since this will save data to the database, it may take a while, and therefore, we need to handle asynchronous data.
 * We do that by making it an async method and using await in the execute() method.
 */
appointmentsRouter.post("/", async (request, response) => {
  // gets the barber and the date to create an appointment
  const { provider_id, date } = request.body;

  // gets the date that is coming from the api, converts is to a JS object
  const parsedDate = parseISO(date);

  // instantiate a new CreateAppointmentService
  const createAppointment = new CreateAppointmentService();

  // since the execute() will save data to the database, this needs to be an asynchronous function and therefore, needs
  // the await keyword. Also, the method post needs to be an asynchronous function.
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  // returns the newly created appointment
  return response.json(appointment);
});

export default appointmentsRouter;
