import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData, defaultFormValues, schema } from './formUtils';
import { useHandleLogin } from './hooks';
import { MadaMalBanner } from '@/components/common';
import { View } from 'react-native';
import { LoginFormBody } from './components';
import { styles } from './styles';
import { Button } from 'react-native-paper';

export const LoginScreen: React.FC = () => {
  const {
    handleWrongFormData,
    handleValidFormData,
    isButtonLoading,
    goToRegister,
  } = useHandleLogin();

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  return (
    <View style={styles.container}>
      <MadaMalBanner />
      <View style={styles.formBody}>
        <LoginFormBody control={control} />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="text" onPress={goToRegister}>
          להרשמה לחץ כאן
        </Button>
        <Button
          loading={isButtonLoading}
          mode="contained"
          onPress={handleSubmit(handleValidFormData, handleWrongFormData)}
          style={styles.loginButton}
        >
          התחבר
        </Button>
      </View>
    </View>
  );
};
