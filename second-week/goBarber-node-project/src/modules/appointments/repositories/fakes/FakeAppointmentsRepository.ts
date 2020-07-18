import { uuid } from "uuidv4";

// import isEqual to compare two dates
import { isEqual } from "date-fns";

import Appointment from "../../infra/typeorm/entities/Appointment";

// importing the interface with the methods from the repository
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

// importing the type required to create an appointment
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  // creating an array of appointments
  private appointments: Appointment[] = [];

  /**
   * find an appointment by date
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  /**
   * function to create an appointment
   */
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id }); // is the same of writing it as per the comments below
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
