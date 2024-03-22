import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigator } from './src/navigation/bottomNavigator';

export default function App() {
  return <BottomNavigator />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
