import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import { IReport } from '@/models';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { DeleteReportDialog } from '../deleteReportDialog';

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
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image URL
          style={styles.profileImage}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>{report.ownerId}</Text>
          {/* <Text style={styles.postTime}>{postTime}</Text> */}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={openDeleteDialog}>
            <MaterialIcons
              name="delete"
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Commented')}>
            <MaterialIcons
              name="edit"
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.reportData}>{report.data}</Text>
      {report.image && (
        <Image source={{ uri: report.image }} style={styles.reportImage} />
      )}

      <DeleteReportDialog
        handleClose={closeDeleteDialog}
        isVisible={showDeleteDialog}
      />
    </View>
  );
};
