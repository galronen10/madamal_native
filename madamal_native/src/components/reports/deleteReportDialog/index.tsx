import { View, Text, Modal, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import React, { FC } from 'react';
import { styles } from './styles';

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
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <BlurView intensity={600} style={styles.blurView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              האם אתה בטוח שברצונך למחוק את דיווח זה
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.deleteButton]}
                onPress={onDelete}
              >
                <Text style={styles.textStyle}>מחק דיווח</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Text style={styles.textStyle}>בטל</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};
