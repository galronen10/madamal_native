import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  HomeScreenStack,
  UserProfileScreenStack,
  UserReportsScreenStack,
} from '../screensStacks';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'home') {
              return <FontAwesome name="home" size={size} color={color} />;
            } else if (route.name === 'userProfile') {
              return <FontAwesome name="user" size={size} color={color} />;
            } else if (route.name === 'userReports') {
              return <FontAwesome name="list" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeScreenStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="userProfile"
          component={UserProfileScreenStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="userReports"
          component={UserReportsScreenStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
