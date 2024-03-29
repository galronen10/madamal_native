import { useCallback, useEffect } from 'react';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import {
  AddReportFormData,
  EAddReportFields,
  defaultFormValues,
  schema,
} from './formUtils';
import { useAddDialog } from './hooks';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import { AddReportFormBody } from './components';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface IReportFormScreenProps
  extends Pick<NativeStackHeaderProps, 'navigation'> {}

export const ReportFormScreen: FC<IReportFormScreenProps> = ({
  navigation,
}) => {
  const {
    getReportForForm,
    handleSave,
    handleWrongFormData,
    titleText,
    submitText,
    isButtonLoading,
  } = useAddDialog();

  const { handleSubmit, control, reset } = useForm<AddReportFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: titleText,
    });
  }, [titleText]);

  useEffect(() => {
    const func = async () => {
      const reportForForm = await getReportForForm();
      reset(reportForForm);
    };

    func();
  }, [getReportForForm, , reset]);

  const handleClose = useCallback(() => {
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    async (form: FieldValues): Promise<void> => {
      const isSaved = await handleSave(
        form[EAddReportFields.DATA],
        form[EAddReportFields.IMAGE],
        form[EAddReportFields.DEFAULT_IMAGE_NAME],
      );
      if (isSaved) handleClose();
    },
    [handleSave, handleClose],
  );

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <AddReportFormBody control={control} />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit, handleWrongFormData)}
        style={styles.button}
      >
        {submitText}
      </Button>
    </View>
  );
};
