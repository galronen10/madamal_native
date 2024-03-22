import React from 'react';
import { UserReportsScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
