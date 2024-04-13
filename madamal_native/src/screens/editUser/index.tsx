import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEditUser } from './hooks';
import {
  EditUserFormData,
  defaultFormValues,
  editUserSchema,
} from './formUtils';
import { EditUserFormBody } from './components';
import { View } from 'react-native';
import { styles } from './styles';
import { Button } from 'react-native-paper';
import { MadaMalBanner } from '@/components/common';

export const EditUserScreen: React.FC = () => {
  const {
    getUserForForm,
    handleValidFormData,
    handleWrongFormData,
    isButtonLoading,
  } = useEditUser();

  const { handleSubmit, control, reset } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    const func = async () => {
      const reportForForm = await getUserForForm();
      reset(reportForForm);
    };

    func();
  }, [getUserForForm, reset]);

  return (
    <View style={styles.container}>
      <MadaMalBanner />
      <View style={styles.formBody}>
        <EditUserFormBody control={control} />
      </View>
      <Button
        loading={isButtonLoading}
        mode="contained"
        onPress={handleSubmit(handleValidFormData, handleWrongFormData)}
        style={styles.button}
      >
        שמור שינויים
      </Button>
    </View>
  );
};
