import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  HomeScreenStack,
  UserProfileScreenStack,
  UserReportsScreenStack,
} from '../screensStacks';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let iconName;

      //     if (route.name === 'Home') {
      //       iconName = focused ? 'home' : 'home-outline';
      //     } else if (route.name === 'Profile') {
      //       iconName = focused ? 'person' : 'person-outline';
      //     }

      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      // })}
      // tabBarOptions={{
      //   activeTintColor: 'blue',
      //   inactiveTintColor: 'gray',
      // }}
      >
        <Tab.Screen name="home" component={HomeScreenStack} />
        <Tab.Screen name="userProfile" component={UserProfileScreenStack} />
        <Tab.Screen name="userReports" component={UserReportsScreenStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
