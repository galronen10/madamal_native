import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigator } from '../bottomNavigator';
import { ReportFormScreen } from '@/screens';
import { EAppRoutes } from '../../models';
import { RootStack } from '../../utils';

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
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
