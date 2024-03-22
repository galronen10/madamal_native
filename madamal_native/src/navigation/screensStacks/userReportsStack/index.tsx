import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserReportsScreen } from '@/screens';

const UserReportsStack = createNativeStackNavigator();

export const UserReportsScreenStack = () => {
  return (
    <UserReportsStack.Navigator>
      <UserReportsStack.Screen
        name="UserReports"
        component={UserReportsScreen}
      />
    </UserReportsStack.Navigator>
  );
};
