import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';

import Signin from './screens/Signin';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main';

const STACK = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <STACK.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <STACK.Screen name="Splash" component={Splash} />
        <STACK.Screen name="Signin" component={Signin} />
        <STACK.Screen name="Main" component={Main} />
      </STACK.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
