import { useState } from 'react';
import { RegisterFormData } from '../formUtils';
import { toast } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';
import { api } from '@/api';
import { AuthErrorCodes } from 'firebase/auth';

interface IUseRegisterForm {
  handleValidFormData: (formData: RegisterFormData) => Promise<void>;
  handleWrongFormData: () => void;
  goToLogin: () => void;
  isButtonLoading: boolean;
}

export const useRegisterForm = (): IUseRegisterForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleValidFormData = async (
    formData: RegisterFormData,
  ): Promise<void> => {
    setIsButtonLoading(true);

    try {
      await api.auth.register(formData);
      setIsButtonLoading(false);

      toast.success('נרשמת בהצלחה');
      navigation.reset({
        index: 0,
        routes: [{ name: EAppRoutes.main }],
      });
    } catch (error: any) {
      let errorMessage: string;
      console.log(error.code);
      console.log(error.message);
      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          errorMessage = 'קיים משתמש עם מייל זה';
          break;
        default:
          errorMessage = 'אירעה שגיאה ביצירת המשתמש';
          break;
      }
      toast.error(errorMessage);

      setIsButtonLoading(false);
    }
  };

  const handleWrongFormData = (): void => {
    toast.error('נא למלא פרטים תקינים');
  };

  const goToLogin = (): void => {
    navigation.navigate(EAppRoutes.login);
  };

  return {
    handleWrongFormData,
    handleValidFormData,
    isButtonLoading,
    goToLogin,
  };
};
