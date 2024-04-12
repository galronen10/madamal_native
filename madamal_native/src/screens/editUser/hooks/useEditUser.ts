import { useCallback, useEffect, useState } from 'react';
import { EEditUserFields, EditUserFormData } from '../formUtils';
import { useNavigation } from '@react-navigation/native';
import { toast } from '@/utils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/store';
import { selectUser, updateUser } from '@/redux/user';
import { api } from '@/api';

interface IUseEditUser {
  handleValidFormData: (formData: EditUserFormData) => Promise<void>;
  getUserForForm: () => EditUserFormData;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useEditUser = (): IUseEditUser => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const userData = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const getUserForForm = useCallback((): EditUserFormData => {
    return {
      [EEditUserFields.FULL_NAME]: userData.fullName,
      [EEditUserFields.DEFAULT_IMAGE_NAME]: userData.imageUri,
    };
  }, [userData]);

  const finishUpdateLogic = async (formData: EditUserFormData) => {
    const { fullName, imageUri } = formData;

    try {
      await api.user.update(userData.uid, fullName);
      if (imageUri)
        await api.image.uploadImage(imageUri, `${userData.uid}/profile.jpg`);
      dispatch(updateUser({ fullName, imageUri }));

      toast.success('הפרטים עודכנו בהצלחה');
    } catch (error: any) {
      toast.error('אירעה שגיאה בעדכון הפרטים');
    }
  };

  const handleValidFormData = async (
    formData: EditUserFormData,
  ): Promise<void> => {
    setIsButtonLoading(true);
    await finishUpdateLogic(formData);
    setIsButtonLoading(false);
    navigation.goBack();
  };

  const handleWrongFormData = (): void => {
    toast.error('נא למלא פרטים תקינים');
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'ערוך פרופיל',
    });
  }, []);

  return {
    handleWrongFormData,
    handleValidFormData,
    getUserForForm,
    isButtonLoading,
  };
};
