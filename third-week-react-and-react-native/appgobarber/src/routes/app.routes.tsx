import React from "react";

// used to create the stack style navigation
import { createStackNavigator } from "@react-navigation/stack";

// importing the pages
import Dashboard from "../pages/Dashboard";

// having access to the stack navigation
const App = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#312e38" },
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
    </App.Navigator>
  );
};

export default AuthRoutes;
