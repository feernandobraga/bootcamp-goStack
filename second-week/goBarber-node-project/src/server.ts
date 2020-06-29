import "reflect-metadata";
import express from "express";
import routes from "./routes";

// importing the database from the database folder
import "./database";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log("👽 Server running on port 3333!");
});
