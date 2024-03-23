import { FlatList } from 'react-native';
import React, { FC } from 'react';
import { IReport } from '@/models';
import { ReportListItem } from '../reportListItem';

interface IReportListProps {
  reportsList: IReport[];
}

export const ReportList: FC<IReportListProps> = ({ reportsList }) => {
  console.log(JSON.stringify(reportsList));
  return (
    <FlatList
      data={reportsList}
      renderItem={({ item }) => <ReportListItem report={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
