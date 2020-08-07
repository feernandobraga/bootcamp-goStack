import React, { useState } from "react";

import logoImg from "../../assets/logo.svg";

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

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

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
            <span>Today</span>
            <span>7th</span>
            <span>July</span>
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
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
