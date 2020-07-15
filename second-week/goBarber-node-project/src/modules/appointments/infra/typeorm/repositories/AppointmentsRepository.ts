import { getRepository, Repository } from "typeorm";

import Appointment from "../entities/Appointment";

// importing the interface with the methods from the repository
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

// importing the type required to create an appointment
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  //injecting/instantiating the repository from ORM
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // .findOne() is one of the many methods available to the Repository Interface that we inherited in this class
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date },
    });

    // returns the appointment if it finds it, otherwise, returns undefined
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
