import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportFormScreen, HomeScreen } from '@/screens';

const HomeStack = createNativeStackNavigator();

export const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="EditReport" component={ReportFormScreen} />
    </HomeStack.Navigator>
  );
};
