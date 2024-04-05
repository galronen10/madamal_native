import { Main } from '@/components/main';
import { store } from '@/redux';
import React, { FC } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import 'firebase/firestore'; // If you're using Firestore
import { AppRegistry } from 'react-native';
import './config/firebase';

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </StoreProvider>
  );
};

AppRegistry.registerComponent('madamal-native', () => App);
