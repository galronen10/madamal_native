import React, { FC } from 'react';
import { IconButton } from 'react-native-paper';
import { EAppRoutes } from '@/navigation/models';

interface IHeaderAddReportProps {
  navigate: any;
}

export const HeaderAddReport: FC<IHeaderAddReportProps> = ({ navigate }) => {
  return (
    <IconButton
      icon="plus"
      size={20}
      onPress={() => navigate('modals', { screen: EAppRoutes.reportForm })}
    />
  );
};
