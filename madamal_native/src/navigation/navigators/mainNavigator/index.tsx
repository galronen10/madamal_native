import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from '../bottomNavigator';
import { RootStack } from '../../utils';
import { EditUserScreen, ReportFormScreen } from '@/screens';
import { EAppRoutes } from '@/models/routes';

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name={EAppRoutes.main}
            component={BottomNavigator}
            options={{
              headerShown: false,
            }}
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
