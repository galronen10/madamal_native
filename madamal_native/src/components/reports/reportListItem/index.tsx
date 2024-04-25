import { View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import React, { FC, useMemo } from 'react';
import { IReport } from '@/models/reports';
import { styles } from './styles';
import { auth } from 'config/firebase';
import { ReportListItemActions } from '../reportListItemActions';
import { dateUtils } from '@/utils';

interface IReportListItemProps {
  report: IReport;
}

export const ReportListItem: FC<IReportListItemProps> = ({ report }) => {
  const dateDisplay = useMemo(
    () => dateUtils.dateFormatter(report?.lastUpdated),
    [report?.lastUpdated],
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          style={styles.header}
          title={report.title}
          titleStyle={styles.username}
          subtitle={dateDisplay}
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
