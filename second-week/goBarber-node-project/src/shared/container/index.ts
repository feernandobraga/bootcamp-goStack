import { container } from "tsyringe";

// importing the dependency injection for the hashing provider
import "@modules/users/providers";

// importing the dependency injection for the disk storage provider
import "./providers";

//importing the repository and interface for appointments
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";

//importing the repository and interface for users
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

/**
 * the register.Singleton gets 2 parameters
 * an ID -> AppointmentsRepository
 * the repository that will be injected when the ID is called
 */
container.registerSingleton<IAppointmentsRepository>(
  "AppointmentsRepository",
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
