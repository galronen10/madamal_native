import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportFormScreen, HomeScreen } from '@/screens';
import { IconButton } from 'react-native-paper';

const HomeStack = createNativeStackNavigator();

export const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="plus"
              size={20}
              onPress={() => navigation.navigate('EditReport')}
            />
          ),
        })}
      />
      <HomeStack.Screen
        name="EditReport"
        component={ReportFormScreen}
        options={{ headerBackButtonMenuEnabled: true }}
      />
    </HomeStack.Navigator>
  );
};
