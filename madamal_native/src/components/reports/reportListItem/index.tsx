import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { IReport } from '@/models';
import { styles } from './styles';

interface IReportListItemProps {
  report: IReport;
}

export const ReportListItem: FC<IReportListItemProps> = ({ report }) => {
  return (
    <View style={styles.listRow}>
      {/* {report.image && (
        <Image style={styles.listRowImage} source={require(report.image)} />
      )} */}
      <View style={styles.listRowTextContainer}>
        <Text style={styles.listRowName}>{report.ownerId}</Text>
        <Text style={styles.listRowId}>{report.data}</Text>
      </View>
    </View>
  );
};
