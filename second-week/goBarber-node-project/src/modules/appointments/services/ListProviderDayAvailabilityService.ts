// import our custom error handling class
import AppError from "@shared/errors/AppError";

// importing dependency injection decorators
import { injectable, inject } from "tsyringe";

// to find out how many days in a month
import { getDaysInMonth, getDate, getHours } from "date-fns";

import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

// interface used by the execute
interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

// converts the interface to an interface that returns an array
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month, day }: IRequest): Promise<IResponse> {
    // list all appointments(day, month, year) for a particular provider
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day,
    });

    const hourStart = 8;

    // console.log(appointments);

    const eachHourArray = Array.from({ length: 10 }, (value, index) => index + hourStart);

    // scan hours from 8 until 17 (which is hourStart + 10)
    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour // retrieve the hour from the appointment date and compar to the hour in the map function
      );

      // just for the sake of understanding what is going on
      if (hasAppointmentInHour) {
        console.log(
          hasAppointmentInHour.date,
          "is equivalent to ",
          getHours(hasAppointmentInHour.date)
        );

        console.log(
          `${hasAppointmentInHour.date} is equivalent to ${getHours(
            hasAppointmentInHour.date
          )}`
        );
      }

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    console.log(availability);

    return availability;
  }
} // end class

export default ListProviderDayAvailabilityService;
