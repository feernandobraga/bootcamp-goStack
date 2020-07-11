import "react-native-gesture-handler";
import React from "react";
import { View, StatusBar } from "react-native";

// importing the routing component
import Routes from "./routes";

// navigation is done through context, so we import something to wrap the application with the routes
import { NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: "#312e38", flex: 1 }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
