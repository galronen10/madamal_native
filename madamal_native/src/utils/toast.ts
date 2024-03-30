import Toast from 'react-native-toast-message';

export const success = (text: string) =>
  Toast.show({
    type: 'success',
    text1: text,
  });

export const error = (text: string) =>
  Toast.show({
    type: 'error',
    text1: text,
  });
