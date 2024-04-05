import { useState } from 'react';
import { ERegisterFields, RegisterFormData } from '../formUtils';
import { toast } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { IUserRegister } from '@/models/user';
import { EAppRoutes } from '@/models/routes';
import { api } from '@/api';

interface IUseRegisterForm {
  handleValidFormData: (formData: RegisterFormData) => Promise<void>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useRegisterForm = (): IUseRegisterForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const finishRegisterLogic = async (
    formData: RegisterFormData,
    imageName?: string,
  ) => {
    const { email, fullName, password } = formData;

    const registerDto: IUserRegister = {
      email,
      fullName,
      password,
    };

    if (imageName) registerDto.imageUrl = imageName;

    try {
      await api.auth.register(registerDto);
      toast.success('המשתמש נוצר בהצלחה');
      navigation.reset({
        index: 0,
        routes: [{ name: EAppRoutes.main }],
      });
    } catch (error: any) {
      if (error.status === 406) {
        toast.error('משתמש כבר קיים');
      } else {
        console.error('Error during signup:', error);
        toast.error('אירעה שגיאה ביצירת המשתמש');
      }
    }
  };

  const handleValidFormData = async (
    formData: RegisterFormData,
  ): Promise<void> => {
    const imageFile = formData[ERegisterFields.IMAGE];
    setIsButtonLoading(true);
    try {
      // let serverFileName = '';
      // if (imageFile) {
      //   serverFileName = await uploadImage(imageFile);
      // }
      await finishRegisterLogic(formData);
    } catch (error: any) {
      toast.error('אירעה שגיאה בשמירת התמונה בשרת, אנא נסה שנית');
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleWrongFormData = (): void => {
    toast.error('נא למלא פרטים תקינים');
  };

  return {
    handleWrongFormData,
    handleValidFormData,
    isButtonLoading,
  };
};
