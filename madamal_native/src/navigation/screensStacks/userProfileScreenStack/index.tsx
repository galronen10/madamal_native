import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProfileScreen } from '@/screens';

const UserProfileStack = createNativeStackNavigator();

export const UserProfileScreenStack = () => {
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name="UserProfile"
        component={UserProfileScreen}
      />
    </UserProfileStack.Navigator>
  );
};
