/* eslint-disable react-native/no-raw-text */
import React, { FC } from 'react';
import { styles } from './styles';
import { Portal, Dialog, Text, Button } from 'react-native-paper';

interface IDeleteReportDialogProps {
  isVisible: boolean;
  handleClose: () => void;
}

export const DeleteReportDialog: FC<IDeleteReportDialogProps> = ({
  handleClose,
  isVisible,
}) => {
  const onDelete = () => {
    // Implement delete logic here
    console.log('Post deleted');
    handleClose();
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={handleClose}>
        <Dialog.Title style={styles.bodyText}>מחק דיווח</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.bodyText}>
            האם אתה בטוח שברצונך למחוק את דיווח זה
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            onPress={onDelete}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.textStyle}>מחק דיווח</Text>
          </Button>
          <Button
            onPress={handleClose}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.textStyle}>בטל</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
