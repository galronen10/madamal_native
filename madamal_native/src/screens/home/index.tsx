import { View } from 'react-native';
import React, { FC } from 'react';
import { ReportList } from '@/components/reports';
import { useAppSelector } from '@/hooks/store';
import { IReport } from '@/models/reports';
import { selectAllReports } from '@/redux/reports';

export const HomeScreen: FC = () => {
  const allReports: IReport[] = useAppSelector(selectAllReports);

  return (
    <View>
      <ReportList
        reportsList={allReports}
        noDataText="לא נוצרו דיווחים במערכת"
      />
    </View>
  );
};
