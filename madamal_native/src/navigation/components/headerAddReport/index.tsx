import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { EAppRoutes } from '@/navigation/models';

export const HeaderAddReport: FC = () => {
  const { navigate } = useNavigation();

  return (
    <IconButton
      icon="plus"
      size={20}
      onPress={() => navigate(EAppRoutes.reportForm)}
    />
  );
};
