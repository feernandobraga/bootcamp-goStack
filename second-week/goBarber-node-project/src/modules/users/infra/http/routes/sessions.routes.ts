import { Router } from "express";

// importing the controller
import SessionsController from "../controllers/SessionsController";

// instantiate the controller
const sessionsController = new SessionsController();

const sessionsRouter = Router();

/**
 * POST to localhost:3333/sessions
 * since this will save data to the database, it may take a while, and therefore, we need to handle asynchronous data.
 * We do that by making it an async method and using await in the execute() method.
 */
sessionsRouter.post("/", sessionsController.create);

export default sessionsRouter;
