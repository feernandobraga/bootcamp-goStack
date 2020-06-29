import { Router } from "express";

import CreateUserService from "../services/CreateUserService";

const usersRouter = Router();

/**
 * POST to localhost:3333/users
 * since this will save data to the database, it may take a while, and therefore, we need to handle asynchronous data.
 * We do that by making it an async method and using await in the execute() method.
 */
usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    return response.json(user);
  } catch (err) {
    // if an error occurs, we send a json response based on the message we used in the service
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
