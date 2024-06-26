import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'config/firebase';
import { EAppRoutes } from '@/models/routes';
import { FullSizeLoader } from '@/components/common';

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

  return <FullSizeLoader />;
};
