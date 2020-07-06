import React, { useCallback, useRef } from "react";

import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

// import function that get errors from forms
import getValidationErrors from "../../utils/getValidationErrors";

// import for form validation
// imports everything from yup as a variable called Yup
import * as Yup from "yup";

//import to handle forms
import { FormHandles } from "@unform/core";

// importing unform
import { Form } from "@unform/web";

import { Container, Content, Background } from "./styles";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      // we create a validation schema and pass the data from the from to it
      const schema = Yup.object().shape({
        name: Yup.string().required("You must enter a name"),
        email: Yup.string()
          .required("You must enter an email")
          .email("Please enter a valid email address"),
        password: Yup.string().min(6, "At least 6 characters"),
      });

      // abortEarly: false is used so Yub doesn't stop at the first validation error and keeps going
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      /**
       * errors will look like this:
       * email: "You must enter an email"
       * name: "You must enter an email"
       * password: "Password needs to be at least 6 characters"
       */

      // this function attributes error messages based on what input field triggered the validation error
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input name="password" icon={FiLock} type="password" placeholder="Password" />

          <Button type="submit">REGISTER</Button>
        </Form>

        <a href="signup">
          <FiArrowLeft />
          Back to login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
