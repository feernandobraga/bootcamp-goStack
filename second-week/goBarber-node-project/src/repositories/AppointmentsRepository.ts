import { EntityRepository, Repository } from "typeorm";

import Appointment from "../models/Appointment";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /**
   * the findByDate function fetches an appointment from the database where the appointment date is equals to the date passed
   * in the parameters.
   * Since the function may take a while to return, we need to use Async/Await to wait for the data to come back.
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    // .findOne() is one of the many methods available to the Repository Interface that we inherited in this class
    const findAppointment = await this.findOne({
      where: { date: date },
    });

    // returns the appointment if it finds it, otherwise, returns null
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
