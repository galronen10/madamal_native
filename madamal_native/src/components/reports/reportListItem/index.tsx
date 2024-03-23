import { View } from 'react-native';
import { Card, Paragraph, IconButton, Avatar } from 'react-native-paper';
import React, { FC, useState } from 'react';
import { IReport } from '@/models';
import { styles } from './styles';

interface IReportListItemProps {
  report: IReport;
}

export const ReportListItem: FC<IReportListItemProps> = ({ report }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const openDeleteDialog = (): void => {
    setShowDeleteDialog(true);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          style={styles.header}
          title={report.ownerId}
          titleStyle={styles.username}
          // subtitle={postTime}
          right={() => (
            <Avatar.Image
              style={styles.profileImage}
              size={50}
              source={{ uri: 'https://via.placeholder.com/50' }}
            />
          )}
          left={(props) => (
            <View style={styles.actions}>
              <IconButton
                size={20}
                iconColor="black"
                style={styles.icon}
                icon="delete"
                onPress={openDeleteDialog}
              />
              <IconButton
                size={20}
                iconColor="black"
                style={styles.icon}
                icon="pencil"
                onPress={() => console.log('Pressed')}
              />
            </View>
          )}
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
