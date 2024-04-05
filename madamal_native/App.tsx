import { MainNavigator } from '@/navigation';
import { store } from '@/redux';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider as StoreProvider } from 'react-redux';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <MainNavigator />
        <Toast />
      </PaperProvider>
    </StoreProvider>
  );
}
