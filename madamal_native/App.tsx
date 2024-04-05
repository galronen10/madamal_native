import { Main } from '@/components/main';
import { store } from '@/redux';
import React, { FC } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import 'firebase/firestore'; // If you're using Firestore
import { firebase } from '@react-native-firebase/firestore';
import { AppRegistry } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyBuzORXsqJSJQ1ABnlRsySotRvJMmyPYTo',
  authDomain: 'mada-mal.firebaseapp.com',
  projectId: 'mada-mal',
  storageBucket: 'mada-mal.appspot.com',
  messagingSenderId: '479177647580',
  appId: '1:479177647580:web:33bf253fef5b74ffa95b19',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
