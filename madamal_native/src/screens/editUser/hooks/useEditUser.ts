import { useCallback, useEffect, useState } from 'react';
import { EEditUserFields, EditUserFormData } from '../formUtils';
import { useNavigation } from '@react-navigation/native';
import { toast } from '@/utils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/store';
import { selectUser, updateUser } from '@/redux/user';
import { api } from '@/api';
import { IStoreUser } from '@/models/user';

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

  const handleValidFormData = async (
    formData: EditUserFormData,
  ): Promise<void> => {
    setIsButtonLoading(true);

    const { fullName, imageUri } = formData;

    try {
      const payloadForStore: Partial<IStoreUser> = { fullName };

      await api.user.update(userData.uid, fullName);
      if (imageUri) {
        const newImageUri = await api.image.uploadImage(
          imageUri,
          `${userData.uid}/profile.jpg`,
        );

        payloadForStore.imageUri = newImageUri;
      }

      dispatch(updateUser(payloadForStore));

      toast.success('הפרטים עודכנו בהצלחה');
      setIsButtonLoading(false);
      navigation.goBack();
    } catch (error: any) {
      toast.error('אירעה שגיאה בעדכון הפרטים');
      setIsButtonLoading(false);
    }
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
