import { Router } from "express";

import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

// this redirects every hit to /appointments to the appointments.routes.ts file
routes.use("/appointments", appointmentsRouter);

// this redirects every hit to /users to the users.routes.ts file
routes.use("/users", usersRouter);

// this redirects every hit to /sessions to the sessions.routes.ts file
routes.use("/sessions", sessionsRouter);

export default routes;
