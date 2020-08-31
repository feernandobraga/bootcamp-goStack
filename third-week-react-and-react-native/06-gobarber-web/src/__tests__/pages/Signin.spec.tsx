import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Signin from "../../pages/Signin";

const mockedHistoryPush = jest.fn(); // empty function that does nothing to the method useHistory

jest.mock("react-router-dom", () => {
  // use mock to fake the response for certain modules
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children, // React.ReactNode means any React component
  };
});

// mock the Authentication Hook function signIn() so it doesn't do anything
jest.mock("../../hooks/auth", () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(), // empty function that does nothing to the method useHistory
    }),
  };
});

describe("SignIn Page", () => {
  it("should be able to sign in", async () => {
    const { getByPlaceholderText, getByText } = render(<Signin />); // get the element based on its placeholder text

    const emailField = getByPlaceholderText("Email"); // retrieve the component based on its placeholder
    const passwordField = getByPlaceholderText("Password"); // retrieve the component based on its placeholder
    const buttonElement = getByText("LOGIN"); // retrieve the component based on its text

    // fire the event onChange and change the result of event.target.value
    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    // fire the event onChange and change the result of event.target.value
    fireEvent.change(passwordField, { target: { value: "123456" } });

    // fire the click event on the button
    fireEvent.click(buttonElement);

    await waitFor(() => { // the waitFor is used for async functions when we know it may take a moment to get the response
      // once the button clicks we expect the user to be redirect to the dashboard
      expect(mockedHistoryPush).toHaveBeenCalledWith("/dashboard");
    });
  });
});
