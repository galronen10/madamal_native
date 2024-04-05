import { View } from 'react-native';
import React, { FC } from 'react';
import { ReportList } from '@/components/reports';
import { useAppSelector } from '@/hooks/store';
import { IReport } from '@/models/reports';
import { selectReportsOfLoggedUser } from '@/redux/reports';

export const UserReportsScreen: FC = () => {
  const allReports: IReport[] = useAppSelector(selectReportsOfLoggedUser);

  return (
    <View>
      <ReportList reportsList={allReports} />
    </View>
  );
};
