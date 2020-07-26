import { Router } from "express";

// import container for dependency in

// we need to import the ensureAuthenticated middleware to make sure a user can only update the avatar if he/she is Authenticated
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

// import the user controller
import ProfileController from "../controllers/ProfileController";

// instantiate the controller
const profileController = new ProfileController();

const profileRouter = Router();

profileRouter.use(ensureAuthenticated); // will guarantee that all routes in this file will use ensureAuthenticated middleware

profileRouter.put("/", profileController.update);

profileRouter.get("/", profileController.show);

export default profileRouter;
