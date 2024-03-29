import React from 'react';
import { BottomNavigator } from './src/navigation/bottomNavigator';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <BottomNavigator />
      <Toast />
    </PaperProvider>
  );
}
