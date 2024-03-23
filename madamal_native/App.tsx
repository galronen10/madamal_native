import React from 'react';
import { BottomNavigator } from './src/navigation/bottomNavigator';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <BottomNavigator />
    </PaperProvider>
  );
}
