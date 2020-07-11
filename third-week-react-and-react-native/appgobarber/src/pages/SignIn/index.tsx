import React from "react";

import { Image } from "react-native";

// logo image
import logoImg from "../../assets/logo.png";
// styled components
import { Container, Title } from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>SIGN IN</Title>
    </Container>
  );
};

export default SignIn;
