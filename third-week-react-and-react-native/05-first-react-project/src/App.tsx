import React from "react";

// import the routes file that contain the routes and the components it calls
import Routes from "./routes/";

// BrowserRouter will get the url from the browser
import { BrowserRouter } from "react-router-dom";

// importing global styles
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
