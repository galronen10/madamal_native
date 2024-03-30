import { View } from 'react-native';
import React, { FC } from 'react';
import { ReportList } from '@/components/reports';
import { reportListStub } from '@/constants/reportsStub';

export const HomeScreen: FC = () => {
  return (
    <View>
      <ReportList reportsList={reportListStub} />
    </View>
  );
};
