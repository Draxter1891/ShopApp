import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from './screens/Splash';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Favourite from './screens/Favourite';
import CartScreen from './screens/Cart';


const STACK = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
        <STACK.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
            <STACK.Screen name="Splash" component={Splash}/>
            <STACK.Screen name="Signup" component={Signup}/>
            <STACK.Screen name="Signin" component={Signin}/>
            <STACK.Screen name="Home" component={Home}/>
            <STACK.Screen name="Profile" component={Profile}/>
            <STACK.Screen name="Favourite" component={Favourite}/>
            <STACK.Screen name="Cart" component={CartScreen}/>
        </STACK.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator