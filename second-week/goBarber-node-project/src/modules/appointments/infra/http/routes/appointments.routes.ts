import { Router } from "express";

// importing the middleware so routes are automatically verified for the token
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

// import the controller
import AppointmentsController from "../controllers/AppointmentsController";

// instantiating a new controller
const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();

// adds the middleware checking to all rotes related to appointments
appointmentsRouter.use(ensureAuthenticated);

/**
 * GET to localhost:3333/appointments
 */
// appointmentsRouter.get("/", async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

/**
 * POST to localhost:3333/appointments
 * the route calls the controller that calls the service that calls the repository
 */
appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;
