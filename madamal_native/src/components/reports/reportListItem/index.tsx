import { View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import React, { FC } from 'react';
import { IReport } from '@/models/reports';
import { styles } from './styles';
import { auth } from 'config/firebase';
import { ReportListItemActions } from '../reportListItemActions';

interface IReportListItemProps {
  report: IReport;
}

export const ReportListItem: FC<IReportListItemProps> = ({ report }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          style={styles.header}
          title={report.title}
          titleStyle={styles.username}
          subtitle={report.lastUpdated.toLocaleDateString()}
          subtitleStyle={styles.reportTime}
          left={() =>
            report.userId === auth.currentUser?.uid && (
              <ReportListItemActions reportId={report.id} />
            )
          }
        />
        <Card.Content>
          <Paragraph style={styles.reportData}>{report.data}</Paragraph>
        </Card.Content>
        {report.image && (
          <Card.Cover
            style={styles.reportImage}
            source={{ uri: report.image }}
          />
        )}
      </Card>
    </View>
  );
};
