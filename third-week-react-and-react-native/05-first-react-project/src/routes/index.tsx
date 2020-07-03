import React from "react";
import { Switch, Route } from "react-router-dom";

// importing the pages
import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const Routes: React.FC = () => {
  return (
    // The switch component is used so the browser only displays one route.
    // Since the routes are read from top to bottom, if we don't use switch,
    // the application will return the first route, and then the subsequent routes
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repository" exact component={Repository} />
    </Switch>
  );
};

export default Routes;
