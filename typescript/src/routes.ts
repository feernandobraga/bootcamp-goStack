import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "fernando@mail.com",
    password: "12345",
    techs: ["Node", "C#", "SQL", { title: "JavaScript", experience: 13 }],
  });

  return response.json({ message: "hi there" });
}
