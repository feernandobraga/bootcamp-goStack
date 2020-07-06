import React from "react";

import GlobalStyle from "./styles/global";

import SignIn from "./pages/Signin/";
import SignUp from "./pages/SignUp";

import AppProvider from "./hooks";

const App: React.FC = () => {
  return (
    <>
      {/* AppProvider needs to wrap all elements that will have access to the context API */}
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
