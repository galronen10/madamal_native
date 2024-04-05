import { useCallback, useEffect, useState } from 'react';
import { EEditUserFields, EditUserFormData } from '../formUtils';
import { useNavigation } from '@react-navigation/native';
import { toast } from '@/utils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/store';
import { selectUser, updateUser } from '@/redux/user';
import { IUserUpdateDto } from '@/models/user';

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
      [EEditUserFields.DEFAULT_IMAGE_NAME]: userData.imageUrl,
    };
  }, [userData]);

  const finishUpdateLogic = async (fullName: string, imageName?: string) => {
    const userDto: IUserUpdateDto = {
      fullName,
    };

    if (imageName) userDto.imageUrl = imageName;

    try {
      // await api.user.update(userDto);
      dispatch(updateUser(userDto));

      toast.success('הפרטים עודכנו בהצלחה');
    } catch (error: any) {
      toast.error('אירעה שגיאה בעדכון הפרטים');
    }
  };

  const handleValidFormData = async (
    formData: EditUserFormData,
  ): Promise<void> => {
    const imageFile = formData[EEditUserFields.IMAGE];
    setIsButtonLoading(true);
    try {
      const serverFileName = '';
      if (imageFile) {
        // serverFileName = await uploadImage(imageFile);
      }
      await finishUpdateLogic(
        formData[EEditUserFields.FULL_NAME],
        serverFileName,
      );
      navigation.goBack();
    } catch (error: any) {
      toast.error('אירעה שגיאה בשמירת התמונה בשרת, אנא נסה שנית');
    } finally {
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
