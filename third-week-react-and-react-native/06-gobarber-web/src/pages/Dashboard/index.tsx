import React, { useState, useCallback, useEffect, useMemo } from "react";
import { isToday, format } from "date-fns"; // to handle dates\
import enAU from "date-fns/locale/en-AU";
import logoImg from "../../assets/logo.svg";

import DayPicker, { DayModifiers } from "react-day-picker"; // pick date from calendar
import "react-day-picker/lib/style.css"; // pick date from calendar

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from "./styles";
import { FiPower, FiClock } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  //interface to handle each appointment coming back from the api post to /appointments/me
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    //calls for a function whenever currentMonth changes. The function here calls the API to get the provider availability
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    // fetch the appointments from API every time a day is selected
    api
      .get("/appointments/me", {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAppointments(response.data);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    // gets the response from the API containing the month availability and create new dates based on the days that are unavailable
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false) // only gets the days that are not available
      .map((monthDay) => {
        // creates a new date based on on the day inside the array
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "MMMM dd", {
      locale: enAU,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, "cccc", {
      locale: enAU,
    });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="goBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Booked appointments</h1>
          <p>
            {isToday(selectedDate) && <span>Today</span>}
            {/*if today is the day select, display Today*/}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Next appointment</strong>
            <div>
              <img
                src="https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-halloween-monster-square-avatar-funny-cartoon-monster-face-vector-monster-square-avatar-175918891.jpg"
                alt="Client Name"
              />
              <strong>Fernando Braga</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-halloween-monster-square-avatar-funny-cartoon-monster-face-vector-monster-square-avatar-175918891.jpg"
                  alt="Client Name"
                />
                <strong>Fernando Braga</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-halloween-monster-square-avatar-funny-cartoon-monster-face-vector-monster-square-avatar-175918891.jpg"
                  alt="Client Name"
                />
                <strong>Fernando Braga</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Arvo</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-halloween-monster-square-avatar-funny-cartoon-monster-face-vector-monster-square-avatar-175918891.jpg"
                  alt="Client Name"
                />
                <strong>Fernando Braga</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-halloween-monster-square-avatar-funny-cartoon-monster-face-vector-monster-square-avatar-175918891.jpg"
                  alt="Client Name"
                />
                <strong>Fernando Braga</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={["S", "M", "T", "W", "T", "F", "S"]}
            fromMonth={new Date()} // starts calendar from current month
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]} // disables Sunday and Saturday and the days from the API
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }, // add a css class "available" to the given week days
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
