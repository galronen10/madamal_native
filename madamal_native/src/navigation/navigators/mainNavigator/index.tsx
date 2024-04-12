import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from '../bottomNavigator';
import { RootStack } from '../../utils';
import { EditUserScreen, ReportFormScreen, SplashScreen } from '@/screens';
import { EAppRoutes } from '@/models/routes';
import { LoginNavigator } from '../loginNavigator';

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={EAppRoutes.splash}>
        <RootStack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name={EAppRoutes.splash} component={SplashScreen} />
          <RootStack.Screen
            name={EAppRoutes.main}
            component={BottomNavigator}
          />
          <RootStack.Screen
            name={EAppRoutes.logOrRegister}
            component={LoginNavigator}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name={EAppRoutes.reportForm}
            component={ReportFormScreen}
          />
          <RootStack.Screen
            name={EAppRoutes.editUser}
            component={EditUserScreen}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
