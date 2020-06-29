import { Router } from "express";

import appointmentsRouter from "./appointments.routes";

const routes = Router();

// this redirects every hit to /appointments to the appointments.routes.ts file
routes.use("/appointments", appointmentsRouter);

export default routes;
