import { useCallback, useEffect, useState } from 'react';
import { EEditUserFields, EditUserFormData } from '../formUtils';
import { useNavigation } from '@react-navigation/native';
import { userStub } from '@/constants/userStub';
import { StoreUser } from '@/models/user';
import { toast } from '@/utils';

interface IUseEditUser {
  handleValidFormData: (formData: EditUserFormData) => Promise<void>;
  getUserForForm: () => EditUserFormData;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useEditUser = (): IUseEditUser => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<StoreUser>(userStub);

  const navigation = useNavigation();

  const getUserForForm = useCallback((): EditUserFormData => {
    return {
      [EEditUserFields.FULL_NAME]: userData.fullName,
      [EEditUserFields.DEFAULT_IMAGE_NAME]: userData.imageUrl,
    };
  }, [userData]);

  // const finishUpdateLogic = async (fullname: string, imageName?: string) => {
  //   const userDto: UserUpdateDto = {
  //     fullname,
  //   };

  //   if (imageName) userDto.imageUrl = imageName;

  //   try {
  //     await api.user.update(userDto);
  //     dispatch(upadteUser(userDto));

  //     toast.success('הפרטים עודכנו בהצלחה');
  //   } catch (error: any) {
  //     toast.error('אירעה שגיאה בעדכון הפרטים');
  //   }
  // };

  const handleValidFormData = async (
    formData: EditUserFormData,
  ): Promise<void> => {
    // const imageFile = formData[EUserFields.IMAGE];
    // setIsButtonLoading(true);
    // try {
    //   let serverFileName = '';
    //   if (imageFile) {
    //     serverFileName = await uploadImage(imageFile);
    //   }
    //   await finishUpdateLogic(formData[EUserFields.FULL_NAME], serverFileName)
    // } catch (error: any) {
    //   toast.error('אירעה שגיאה בשמירת התמונה בשרת, אנא נסה שנית');
    // } finally {
    //   setIsButtonLoading(false);
    // }
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
