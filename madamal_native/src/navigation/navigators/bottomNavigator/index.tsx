import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import { HomeScreen, UserProfileScreen, UserReportsScreen } from '@/screens';
import { EAppRoutes, tabDisplayText } from '../../models';
import { HeaderAddReport } from '@/navigation/components';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerTitleAlign: 'center',
        title: tabDisplayText[route.name as EAppRoutes],
        tabBarLabel: tabDisplayText[route.name as EAppRoutes],
      })}
    >
      <Tab.Screen
        name={EAppRoutes.home}
        component={HomeScreen}
        options={({ navigation: { navigate } }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          headerLeft: () => <HeaderAddReport navigate={navigate} />,
        })}
      />
      <Tab.Screen
        name={EAppRoutes.myReports}
        component={UserReportsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={EAppRoutes.myProfile}
        component={UserProfileScreen}
        options={({ navigation: { navigate } }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          headerLeft: () => <HeaderAddReport navigate={navigate} />,
        })}
      />
    </Tab.Navigator>
  );
};
