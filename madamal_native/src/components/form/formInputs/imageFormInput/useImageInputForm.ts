/* eslint-disable @typescript-eslint/ban-types */
import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { toast } from '@/utils';

interface IUseImageInputForm {
  handlePickFromCamera: (setFormValue: Function) => void;
  handlePickFromGallery: (setFormValue: Function) => void;
}

export const useImageInputForm = (): IUseImageInputForm => {
  const handlePickFromCamera = useCallback(async (setFormValue: Function) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      toast.error('חובה הרשאות למצלמה על מנת לבחור תמונה');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormValue(result.assets[0].uri);
    }
  }, []);

  const handlePickFromGallery = useCallback(async (setFormValue: Function) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      toast.error('חובה הרשאות לגלריה על מנת לבחור תמונה');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormValue(result.assets[0].uri);
    }
  }, []);

  return {
    handlePickFromCamera,
    handlePickFromGallery,
  };
};
