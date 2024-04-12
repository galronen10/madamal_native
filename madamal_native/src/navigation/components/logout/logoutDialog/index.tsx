/* eslint-disable react-native/no-raw-text */
import React, { FC } from 'react';
import { styles } from './styles';
import { Portal, Dialog, Text, Button } from 'react-native-paper';
import { toast } from '@/utils';
import { api } from '@/api';
import { EAppRoutes } from '@/models/routes';
import { logout } from '@/redux/user';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

interface ILogoutDialogProps {
  isVisible: boolean;
  handleClose: () => void;
}

export const LogoutDialog: FC<ILogoutDialogProps> = ({
  handleClose,
  isVisible,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onDelete = async () => {
    try {
      await api.auth.logout();
      dispatch(logout());
      handleClose();
      navigation.reset({
        index: 0,
        routes: [{ name: EAppRoutes.logOrRegister }],
      });
    } catch (error: any) {
      toast.error('אירעה שגיאה בהתנתקות');
    }
  };

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={handleClose}
        style={styles.container}
      >
        <Dialog.Title style={styles.title}>התנתקות</Dialog.Title>
        <Dialog.Actions>
          <Button
            mode="contained"
            onPress={onDelete}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.textStyle}>התנתק</Text>
          </Button>
          <Button
            onPress={handleClose}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.textStyle}>חזור</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
