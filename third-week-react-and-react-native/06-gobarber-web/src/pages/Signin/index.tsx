import React from "react";

import { FiLogIn } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <form>
          <h1>Sign In</h1>
          <input placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit">LOGIN</button>

          <a href="forgot">I forgot my password</a>
        </form>

        <a href="signup">
          <FiLogIn />
          Sign Up!
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
