import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { titleDisplayText } from '@/navigation/models';
import { EAppRoutes } from '@/models/routes';
import { LoginScreen } from '@/screens';
import { RegisterScreen } from '@/screens/register';

const LoginStack = createNativeStackNavigator();

export const LoginNavigator = () => {
  return (
    <LoginStack.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        title: titleDisplayText[route.name as EAppRoutes],
        tabBarLabel: titleDisplayText[route.name as EAppRoutes],
        headerBackVisible: false,
      })}
    >
      <LoginStack.Screen name={EAppRoutes.login} component={LoginScreen} />
      <LoginStack.Screen
        name={EAppRoutes.register}
        component={RegisterScreen}
      />
    </LoginStack.Navigator>
  );
};
