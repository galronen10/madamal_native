import { toast } from '@/utils';
import { LoginFormData } from '../formUtils';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';

interface IUseHandleLogin {
  handleValidFormData: (formData: LoginFormData) => Promise<void>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useHandleLogin = (): IUseHandleLogin => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  // const onLoginSucsses = async (data: LoginDecodedData) => {
  // const { accessToken } = data;
  // const decodedAccessToken = parseJwt(accessToken);
  // const userId = decodedAccessToken?._id;
  // if (!userId) {
  //   toast.error('שגיאה בפרטי ההתחברות נא לנסות שוב');
  //   return;
  // }
  // try {
  //   toast.success('התחברת בהצלחה!');
  //   setIsButtonLoading(false);
  // } catch (error: any) {
  //   toast.error('שגיאה בפרטי ההתחברות נא לנסות שוב');
  //   setIsButtonLoading(false);
  // }
  // };

  const handleValidFormData = async (formData: LoginFormData) => {
    setIsButtonLoading(true);

    const { email, password } = formData;
    try {
      // const response = await api.auth.login({ email, password });
      // onLoginSucsses(response.data);
      navigation.navigate(EAppRoutes.main);
    } catch (error: any) {
      setIsButtonLoading(false);

      toast.error(
        error.response.status === 401
          ? 'פרטי ההתחברות שהזנת שגויים'
          : 'אירעה שגיאה בעת התחברות',
      );
    }
  };

  const handleWrongFormData = (): void => {
    toast.error('נא למלא פרטים תקינים');
  };

  return {
    isButtonLoading,
    handleWrongFormData,
    handleValidFormData,
  };
};
