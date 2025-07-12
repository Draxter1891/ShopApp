import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './bottomTab/Home';
import Profile from './bottomTab/Profile';
import CartScreen from './bottomTab/Cart';
import Favourite from './bottomTab/Favourite';
import Icon from 'react-native-vector-icons/Ionicons';
import { tabIcons, TabRouteName } from '../components/tabIcons';

const BottomTab = createBottomTabNavigator();
const Main = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        const routeName = route.name as TabRouteName;
        return {
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? tabIcons[routeName].active
              : tabIcons[routeName].inactive;

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6339f2',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        };
      }}
      initialRouteName="Home"
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Liked" component={Favourite} />
      <BottomTab.Screen name="Cart" component={CartScreen} />
      <BottomTab.Screen name="Profile" component={Profile} />
    </BottomTab.Navigator>
  );
};

export default Main;
