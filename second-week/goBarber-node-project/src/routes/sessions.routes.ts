import { Router } from "express";

//importing the service so we can use it
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

/**
 * POST to localhost:3333/sessions
 * since this will save data to the database, it may take a while, and therefore, we need to handle asynchronous data.
 * We do that by making it an async method and using await in the execute() method.
 */
sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
