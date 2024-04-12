import { toast } from '@/utils';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AddReportFormData,
  EAddReportFields,
  defaultFormValues,
} from '../formUtils';
import { IReport, IReportDTO } from '@/models/reports';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppSelector } from '@/hooks/store';
import { selectUserId } from '@/redux/user';
import { api } from '@/api';

type TGetReportForFormRes = Promise<AddReportFormData>;
interface IUseReportForm {
  getReportForForm: () => TGetReportForFormRes;
  handleSave: (
    data: string,
    image: any,
    imageFileName?: string,
  ) => Promise<boolean>;
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
  const userId: string = useAppSelector(selectUserId);
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

  const handleSave = useCallback(
    async (
      data: string,
      imageFile?: File,
      imageFileName?: string,
    ): Promise<boolean> => {
      setIsButtonLoading(false);
      navigation.goBack();

      return true;

      setIsButtonLoading(true);
      const dto: IReportDTO = {
        data,
      };
      try {
        if (imageFile) {
          const image = new FormData();
          // image.append('image', imageFile);

          // const imageName = await api.image.uploadImage(image, imageFileName);
          // dto.imageName = imageName;
        }

        if (selectedReportId) {
          // await api.report.updateReport({ ...dto, _id: selectedReportId });
          toast.success('הדיווח עודכן בהצלחה');
        } else {
          // await api.report.addReport({ ...dto, ownerId: userId });
          toast.success('הדיווח נוצר בהצלחה');
        }

        setIsButtonLoading(false);
        return true;
      } catch (error) {
        toast.error(
          `אירעה שגיאה ${selectedReportId ? 'בעדכון' : 'ביצירת'} הדיווח `,
        );
        setIsButtonLoading(false);
        return false;
      }
    },
    [selectedReportId, userId],
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
    handleSave,
    handleWrongFormData,
    getReportForForm,
    submitText,
    isButtonLoading,
  };
};
