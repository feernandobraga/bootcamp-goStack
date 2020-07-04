import styled from "styled-components";

import { shade } from "polished";

import signInBackgrounImg from "../../assets/sign-in-background.png";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`; /* end Container */

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #f4ede8;

      /* every input that is preceded by another input, will get a margin top 8px */
      & + input {
        margin-top: 8px;
      }

      &::placeholder {
        color: #666360;
      }
    } /* end input */

    button {
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      font-weight: 500;
      margin-top: 16px;
      width: 100%;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, "#ff9000")};
      }
    }

    a {
      color: #f4ede8;
      display: block;
      text-decoration: none;
      margin-top: 24px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }
  }
  /*  targets only anchors where the parent is directly the content. Therefore, it won't target the previous anchor */
  > a {
    color: #ff9000;
    display: flex;
    align-items: center;

    text-decoration: none;
    margin-top: 24px;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }

    svg {
      margin-right: 16px;
    }
  }
`; /* end Content */

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgrounImg}) no-repeat center;
  background-size: cover;
`; /* end Background */
