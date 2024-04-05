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
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';

export const LoginScreen: React.FC = () => {
  // useEffect(() => {
  //   if (storeUserId) {
  //     toast.warn('הינך מחובר כעת');
  //     navigate('/');
  //   }
  // }, []);
  const navigation = useNavigation();

  const { handleWrongFormData, handleValidFormData, isButtonLoading } =
    useHandleLogin();

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  const goToRegister = () => {
    navigation.navigate(EAppRoutes.register);
  };

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
