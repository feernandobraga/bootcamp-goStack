import { Router } from "express";

// importing the middleware so routes are automatically verified for the token
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

// import the controller
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

// instantiating a new controller
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

const appointmentsRouter = Router();

// adds the middleware checking to all rotes related to appointments
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post("/", appointmentsController.create);

// display all appointments for the logged provider
appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;
