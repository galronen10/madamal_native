import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { titleDisplayText } from '@/navigation/models';
import { EAppRoutes } from '@/models/routes';
import { LoginScreen } from '@/screens';

const LoginStack = createNativeStackNavigator();

export const LoginNavigator = () => {
  return (
    <LoginStack.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        title: titleDisplayText[route.name as EAppRoutes],
        tabBarLabel: titleDisplayText[route.name as EAppRoutes],
      })}
    >
      <LoginStack.Screen name={EAppRoutes.login} component={LoginScreen} />
    </LoginStack.Navigator>
  );
};
