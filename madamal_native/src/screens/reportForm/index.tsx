import { useEffect } from 'react';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AddReportFormData, defaultFormValues, schema } from './formUtils';
import { useReportForm } from './hooks';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import { ReportFormBody } from './components';

export const ReportFormScreen: FC = () => {
  const {
    getReportForForm,
    handleValidFormData,
    handleWrongFormData,
    submitText,
    isButtonLoading,
  } = useReportForm();

  const { handleSubmit, control, reset } = useForm<AddReportFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    const func = async () => {
      const reportForForm = await getReportForForm();
      reset(reportForForm);
    };

    func();
  }, [getReportForForm, reset]);

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <ReportFormBody control={control} />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit(handleValidFormData, handleWrongFormData)}
        style={styles.button}
      >
        {submitText}
      </Button>
    </View>
  );
};
