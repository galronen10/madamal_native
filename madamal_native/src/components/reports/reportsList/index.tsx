import { FlatList, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { IReport } from '@/models/reports';
import { ReportListItem } from '../reportListItem';
import { Text } from 'react-native-paper';

interface IReportListProps {
  reportsList: IReport[];
  noDataText: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export const ReportList: FC<IReportListProps> = ({
  reportsList,
  noDataText,
}) => {
  return reportsList.length ? (
    <FlatList
      data={reportsList}
      renderItem={({ item }) => <ReportListItem report={item} />}
      keyExtractor={(item) => item?.id?.toString() ?? 'q'}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>{noDataText}</Text>
    </View>
  );
};
