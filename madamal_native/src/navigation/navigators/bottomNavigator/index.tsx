import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { HomeScreen, UserProfileScreen, UserReportsScreen } from '@/screens';
import { HeaderAddReport } from '@/navigation/components';
import { EAppRoutes } from '@/models/routes';
import { tabDisplayText } from '@/navigation/models';

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
        options={({ navigation: { navigate } }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
          headerLeft: () => <HeaderAddReport navigate={navigate} />,
        })}
      />
      <Tab.Screen
        name={EAppRoutes.myProfile}
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
