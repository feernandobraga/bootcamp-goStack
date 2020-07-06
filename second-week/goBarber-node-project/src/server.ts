import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
// the express-async-errors lib needs to be imported right after the express
import "express-async-errors";

import routes from "./routes";

import uploadConfig from "./config/upload";

// import our custom error handling class
import AppError from "./errors/AppError";

// importing the database from the database folder
import "./database";

// importing CORS to use the API with a front-end
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

// this NEEDS to be created RIGHT AFTER the app.use(routes)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  // first we need to check if the err occurred is an instance of our custom error.
  // if this is true, this is an error that we "know" as like an error that we forecasted that could happen
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // we console log this so at least we can debug it
  console.error(err);

  // however, if the error originated from somewhere that I didn't expect, then I will return a generic message
  return response.status(500).json({
    status: "error",
    message: "Opss... I did not see this one coming",
  });
});

app.listen(3333, () => {
  console.log("👽 Server running on port 3333!");
});
