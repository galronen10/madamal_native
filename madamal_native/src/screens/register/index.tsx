import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterForm } from './hooks';
import {
  RegisterFormData,
  defaultFormValues,
  registerSchema,
} from './formUtils';
import { MadaMalBanner } from '@/components/common';
import { View } from 'react-native';
import { RegisterFormBody } from './components';
import { styles } from './styles';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';

export const RegisterScreen: React.FC = () => {
  const { handleValidFormData, handleWrongFormData, isButtonLoading } =
    useRegisterForm();

  const navigation = useNavigation();

  const { handleSubmit, control, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const tempConfirm = () => {
    navigation.navigate(EAppRoutes.main);
  };

  const goToLogin = () => {
    navigation.navigate(EAppRoutes.login);
  };

  return (
    <View style={styles.container}>
      <MadaMalBanner />
      <View style={styles.formBody}>
        <RegisterFormBody control={control} />
      </View>
      <Button mode="text" onPress={goToLogin}>
        נרשמת בעבר? לחץ כאן על מנת להתחבר
      </Button>
      <Button
        mode="contained"
        // onPress={handleSubmit(handleValidFormData, handleWrongFormData)}
        onPress={tempConfirm}
        style={styles.button}
      >
        הרשם
      </Button>
    </View>
  );
};