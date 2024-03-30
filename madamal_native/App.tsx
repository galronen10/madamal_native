import { MainNavigator } from '@/navigation';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <MainNavigator />
      <Toast />
    </PaperProvider>
  );
}
