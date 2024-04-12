import { useState } from 'react';
import { RegisterFormData } from '../formUtils';
import { toast } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';
import { api } from '@/api';

interface IUseRegisterForm {
  handleValidFormData: (formData: RegisterFormData) => Promise<void>;
  handleWrongFormData: () => void;
  goToLogin: () => void;
  isButtonLoading: boolean;
}

export const useRegisterForm = (): IUseRegisterForm => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const finishRegisterLogic = async (formData: RegisterFormData) => {
    const { imageUri, ...registerDto } = formData;
    let uid: string;

    try {
      uid = await api.auth.register(registerDto);
    } catch (error: any) {
      if (error.status === 406) {
        toast.error('משתמש כבר קיים');
      } else {
        toast.error('אירעה שגיאה ביצירת המשתמש');
      }

      return;
    }

    try {
      if (imageUri)
        await api.image.uploadImage(imageUri, `users/${uid}/profile.jpg`);
      toast.success('המשתמש נוצר בהצלחה');
    } catch (error: any) {
      toast.success('המשתמש נוצר בהצלחה אך הייתה שגיאה בשמירת התמונה');
    }

    navigation.reset({
      index: 0,
      routes: [{ name: EAppRoutes.main }],
    });
  };

  const handleValidFormData = async (
    formData: RegisterFormData,
  ): Promise<void> => {
    setIsButtonLoading(true);
    await finishRegisterLogic(formData);
    setIsButtonLoading(false);
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
