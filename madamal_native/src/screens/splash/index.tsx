import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'config/firebase';
import { ActivityIndicator } from 'react-native-paper';
import { EAppRoutes } from '@/models/routes';

export const SplashScreen: FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      navigation.reset({
        index: 0,
        routes: [{ name: user ? EAppRoutes.main : EAppRoutes.logOrRegister }],
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};
