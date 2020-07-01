import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { getCustomRepository } from "typeorm";

import { startOfHour } from "date-fns";

// import our custom error handling class
import AppError from "../errors/AppError";

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // date and provider are parameters coming from the routes, and strongly type it through the interface Request just above this line.
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    // this line will import the AppointmentsRepository functions from the repository
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // runs the method findByDate() from the AppointmentsRepository and if it finds one appointment, returns it,
    // otherwise, it returns null. Since it is querying the database, it needs to be an asynchronous function
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This time slot is not available anymore");
    }

    /**
     * the method create doesn't save the information in the database yet, it just creates the object. We need to call the method
     * .save() to actually save it into the database. Since it may take a while to return, we need to use await, and for that, the method
     * execute needs to be converted to an asynchronous method that returns a promise of type Appointment
     */
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // method that saves the record into the database.
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
