import { Router } from "express";

import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";

const routes = Router();

// this redirects every hit to /appointments to the appointments.routes.ts file
routes.use("/appointments", appointmentsRouter);

// this redirects every hit to /users to the users.routes.ts file
routes.use("/users", usersRouter);

export default routes;
