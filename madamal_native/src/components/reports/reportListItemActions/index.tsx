import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import React, { FC, useState } from 'react';
import { styles } from './styles';
import { DeleteReportDialog } from '../deleteReportDialog';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';

interface IReportListItemActionsProps {
  reportId: string;
}

export const ReportListItemActions: FC<IReportListItemActionsProps> = ({
  reportId,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigation = useNavigation();

  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const openDeleteDialog = (): void => {
    setShowDeleteDialog(true);
  };

  const openEditScreen = (): void => {
    navigation.navigate(EAppRoutes.reportForm, { reportId });
  };

  return (
    <View>
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

      <DeleteReportDialog
        handleClose={closeDeleteDialog}
        isVisible={showDeleteDialog}
        reportId={reportId}
      />
    </View>
  );
};
