import { View, Text } from 'react-native';
import React from 'react';
import { ReportList } from '@/components/reports';
import { reportListStub } from '@/assets/reportsStub';

export const UserReportsScreen = () => {
  return (
    <View>
      <Text>UserReportsScreen</Text>
      <Text>UserReportsScreen</Text>
      <ReportList reportsList={reportListStub} />
    </View>
  );
};
