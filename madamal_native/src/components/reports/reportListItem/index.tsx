import { View } from 'react-native';
import { Card, Paragraph, IconButton, Avatar } from 'react-native-paper';
import React, { FC, useState } from 'react';
import { IReport } from '@/models/reports';
import { styles } from './styles';
import { DeleteReportDialog } from '../deleteReportDialog';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';

interface IReportListItemProps {
  report: IReport;
}

export const ReportListItem: FC<IReportListItemProps> = ({ report }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigation = useNavigation();

  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const openDeleteDialog = (): void => {
    setShowDeleteDialog(true);
  };

  const openEditScreen = (): void => {
    navigation.navigate(EAppRoutes.reportForm, { reportId: report.id });
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
                onPress={openEditScreen}
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

      <DeleteReportDialog
        handleClose={closeDeleteDialog}
        isVisible={showDeleteDialog}
        reportId={report.id}
      />
    </View>
  );
};
