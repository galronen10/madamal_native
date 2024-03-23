import { View } from 'react-native';
import React from 'react';
import { ReportList } from '@/components/reports';
import { reportListStub } from '@/constants/reportsStub';

export const UserReportsScreen = () => {
  return (
    <View>
      <ReportList reportsList={reportListStub} />
    </View>
  );
};
