import { Router } from "express";

// importing the middleware so routes are automatically verified for the token
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

// import the controllers
import ProvidersController from "../controllers/ProvidersController";
import ProviderMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";

// instantiating the controller
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

const providersRouter = Router();

// adds the middleware checking to all rotes related to appointments
providersRouter.use(ensureAuthenticated);

// localhost:333/providers
providersRouter.get("/", providersController.index);

// localhost:333/providers/providers:id
providersRouter.get(
  "/:provider_id/month-availability",
  providerMonthAvailabilityController.index
);

// localhost:333/providers/:provider_id/
providersRouter.get(
  "/:provider_id/day-availability",
  providerDayAvailabilityController.index
);

export default providersRouter;
