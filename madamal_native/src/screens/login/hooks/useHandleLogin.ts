import { toast } from '@/utils';
import { LoginFormData } from '../formUtils';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/redux/user';
import { auth } from 'config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface IUseHandleLogin {
  handleValidFormData: (formData: LoginFormData) => Promise<void>;
  handleWrongFormData: () => void;
  isButtonLoading: boolean;
}

export const useHandleLogin = (): IUseHandleLogin => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUser({ userId: user.providerId }));
        navigation.reset({
          index: 0,
          routes: [{ name: EAppRoutes.main }],
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const onLoginSuccess = async (userId: string | null) => {
    if (!userId) {
      toast.error('שגיאה בפרטי ההתחברות נא לנסות שוב');
      return;
    }

    try {
      toast.success('התחברת בהצלחה!');
      setIsButtonLoading(false);
      dispatch(updateUser({ userId }));
      navigation.reset({
        index: 0,
        routes: [{ name: EAppRoutes.main }],
      });
    } catch (error: any) {
      toast.error('שגיאה בפרטי ההתחברות נא לנסות שוב');
      setIsButtonLoading(false);
    }
  };

  const handleValidFormData = async (formData: LoginFormData) => {
    setIsButtonLoading(true);

    const { email, password } = formData;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      await onLoginSuccess(response.providerId);
    } catch (error: any) {
      setIsButtonLoading(false);

      console.log(error);
      toast.error(
        error.status === 401
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
