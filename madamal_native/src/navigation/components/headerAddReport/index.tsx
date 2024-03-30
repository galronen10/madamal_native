import { EAppRoutes } from '@/models/routes';
import React, { FC } from 'react';
import { IconButton } from 'react-native-paper';

interface IHeaderAddReportProps {
  navigate: any;
}

export const HeaderAddReport: FC<IHeaderAddReportProps> = ({ navigate }) => {
  return (
    <IconButton
      icon="plus"
      size={20}
      onPress={() => navigate(EAppRoutes.reportForm)}
    />
  );
};
