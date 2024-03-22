import React from 'react';
import { UserProfileScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
