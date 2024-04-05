/* eslint-disable @typescript-eslint/ban-types */
import { IFormFieldInput } from '@/models/form';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useImageInputForm } from './useImageInputForm';
import { View, Image } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from './style';

interface IImageFormInputProps extends IFormFieldInput {
  defaultImageUri?: string;
}

export const ImageFormInput: FC<IImageFormInputProps> = ({
  control,
  formData,
  defaultImageUri,
}) => {
  const { handlePickFromCamera, handlePickFromGallery } = useImageInputForm();

  return (
    <Controller
      name={formData.fieldName}
      control={control}
      render={({
        field: { onChange, disabled, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <View style={styles.buttonsContainer}>
            <IconButton
              icon="camera"
              size={25}
              onPress={() => handlePickFromCamera(onChange)}
            />
            <IconButton
              icon="image"
              size={25}
              onPress={() => handlePickFromGallery(onChange)}
            />
            {formData.label && (
              <Text variant="bodyMedium">{formData.label}:</Text>
            )}
          </View>
          {(value || defaultImageUri) && (
            <Image
              style={styles.image}
              source={{ uri: value ? value : defaultImageUri }}
              resizeMode="contain"
            />
          )}
        </View>
      )}
    />
  );
};
