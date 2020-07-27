import { Router } from "express";

// importing the middleware so routes are automatically verified for the token
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

// import the controller
import ProvidersController from "../controllers/ProvidersController";

// instantiating a new controller
const providersController = new ProvidersController();

const providersRouter = Router();

// adds the middleware checking to all rotes related to appointments
providersRouter.use(ensureAuthenticated);

/**
 * GET to localhost:3333/appointments
 */
// providersRouter.get("/", async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

/**
 * POST to localhost:3333/appointments
 * the route calls the controller that calls the service that calls the repository
 */
providersRouter.get("/", providersController.index);

export default providersRouter;
