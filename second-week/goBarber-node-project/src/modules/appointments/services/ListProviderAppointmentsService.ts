// import our custom error handling class
import AppError from "@shared/errors/AppError";

// importing dependency injection decorators
import { injectable, inject } from "tsyringe";

// to find out how many days in a month
import { getDaysInMonth, getDate } from "date-fns";

import Appointment from "../infra/typeorm/entities/Appointment";

import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

// interface used by the execute
interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day,
    });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
