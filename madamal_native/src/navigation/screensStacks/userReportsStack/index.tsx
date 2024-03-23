import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportFormScreen, UserReportsScreen } from '@/screens';

const UserReportsStack = createNativeStackNavigator();

export const UserReportsScreenStack = () => {
  return (
    <UserReportsStack.Navigator>
      <UserReportsStack.Screen
        name="UserReports"
        component={UserReportsScreen}
      />
      <UserReportsStack.Screen name="EditReport" component={ReportFormScreen} />
    </UserReportsStack.Navigator>
  );
};
