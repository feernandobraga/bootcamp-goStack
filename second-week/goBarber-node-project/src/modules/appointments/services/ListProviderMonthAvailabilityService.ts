// import our custom error handling class
import AppError from "@shared/errors/AppError";

// importing dependency injection decorators
import { injectable, inject } from "tsyringe";

// to find out how many days in a month
import { getDaysInMonth, getDate } from "date-fns";

import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

// interface used by the execute
interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

// converts the interface to an interface that returns an array
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
    // retrieves all appointments for the month for a particular provider
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // this creates an array based on the number of days in a month
    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (value, index) => index + 1
    );

    // this will go through each day of the month
    const availability = eachDayArray.map((day) => {
      // and then will return all appointments where day is equals to the day from the map() function
      const appointmentsInDay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length >= 10, // a day can only have 10 appointments, so if >= 10, no slots are available
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
