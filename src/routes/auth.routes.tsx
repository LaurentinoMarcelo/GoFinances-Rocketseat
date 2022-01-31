import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Signin } from "../screnns/Signin";


const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerMode: "null",
      }}
    >
      <Screen name="SignIn" component={Signin} />
    </Navigator>
  );
}
