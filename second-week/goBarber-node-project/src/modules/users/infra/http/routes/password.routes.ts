import { Router } from "express";

// importing the controller
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

// instantiate the controllers
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

// localhost:3333/password/forgot
passwordRouter.post("/forgot", forgotPasswordController.create);

// localhost:3333/password/reset
passwordRouter.post("/reset", resetPasswordController.create);

export default passwordRouter;
