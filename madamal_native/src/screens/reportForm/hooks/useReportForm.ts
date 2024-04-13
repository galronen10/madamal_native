import { toast } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AddReportFormData,
  EAddReportFields,
  defaultFormValues,
} from '../formUtils';
import { IReport } from '@/models/reports';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '@/api';
import { auth } from 'config/firebase';

type TGetReportForFormRes = Promise<AddReportFormData>;
interface IUseReportForm {
  getReportForForm: () => TGetReportForFormRes;
  handleValidFormData: (formData: AddReportFormData) => Promise<void>;
  handleWrongFormData: () => void;
  submitText: string;
  isButtonLoading: boolean;
}

export const useReportForm = (): IUseReportForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const route = useRoute();

  const selectedReportId: string | undefined = useMemo(
    () => route.params?.reportId,
    [route.params],
  );

  const navigation = useNavigation();

  const getReportForForm = useCallback(async (): TGetReportForFormRes => {
    if (!selectedReportId) return defaultFormValues;

    const report: IReport = await api.report.getById(
      selectedReportId.toString(),
    );

    return {
      [EAddReportFields.DATA]: report.data,
      [EAddReportFields.TITLE]: report.title,
      [EAddReportFields.DEFAULT_IMAGE_NAME]: report.image,
    };
  }, [selectedReportId]);

  const handleValidFormData = useCallback(
    async (formData: AddReportFormData): Promise<void> => {
      setIsButtonLoading(true);

      const { defaultImageName, ...DTO } = formData;

      try {
        if (selectedReportId) {
          await api.report.updateReport({ ...DTO, reportId: selectedReportId });
          toast.success('הדיווח עודכן בהצלחה');
        } else {
          await api.report.addReport({
            ...DTO,
            userId: auth.currentUser!.uid,
          });
          toast.success('הדיווח נוצר בהצלחה');
        }

        setIsButtonLoading(false);
        navigation.goBack();
      } catch (error) {
        toast.error(
          `אירעה שגיאה ${selectedReportId ? 'בעדכון' : 'ביצירת'} הדיווח `,
        );
        setIsButtonLoading(false);
      }
    },
    [selectedReportId],
  );

  const handleWrongFormData = (): void => {
    toast.error('נא למלא פרטים תקינים');
  };

  useEffect(() => {
    navigation.setOptions({
      title: selectedReportId ? 'עדכון דיווח' : 'יצירת דיווח',
    });
  }, [selectedReportId]);

  const submitText = useMemo(
    () => (selectedReportId ? 'שמור שינויים' : 'צור דיווח'),
    [selectedReportId],
  );

  return {
    handleValidFormData,
    handleWrongFormData,
    getReportForForm,
    submitText,
    isButtonLoading,
  };
};
