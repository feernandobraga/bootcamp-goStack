import styled, { css } from "styled-components";

import { shade } from "polished";

// we create an interface to handle the hasError property coming from the <Form>
interface FormProps {
  hasError: boolean;
}

// we have access to all html components by using styled.HTMLofYourChoiceHere
// what the code below does is it creates a H1 element with font-size 48 and color #3a3a3a
// Then, we import this whenever we want to use and instead of wrapping it as <H1>, we wrap it using <Title>.
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

// Styling for the Form element.
// since we need to handle the hasError property, we need to add the interface FormProps to it
export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    /* this will now style the input element if the hasError is equals to true */
    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    /* the & sign refers to the element under which it is being used. In this case, it's the input */
    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    /* the & sign refers to the element under which it is being used. In this case, it's button */
    &:hover {
      background: ${shade(0.2, "#04d361")};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    /* 
        what the line below means is: give a margin top to the anchor element, only if it is preceded by another anchor element
        we use it when we have a list and we want to style only from the second element onwards
     */
    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
