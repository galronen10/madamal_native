import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { IFormFieldInput } from '@/models/form';
import { HelperText, TextInput } from 'react-native-paper';
import { InputModeOptions, View } from 'react-native';

interface ITextFieldFormInputProps extends IFormFieldInput {
  isMultiline?: boolean;
  inputMode?: InputModeOptions;
  isDisabled?: boolean;
  labelOverride?: string;
}

export const TextFieldFormInput: FC<ITextFieldFormInputProps> = ({
  control,
  formData,
  isMultiline = false,
  inputMode = 'text',
  isDisabled = false,
  labelOverride,
}) => {
  return (
    <Controller
      name={formData.fieldName}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <TextInput
            inputMode={inputMode}
            numberOfLines={4}
            multiline={isMultiline}
            style={formData.style}
            placeholder={formData.placeholder ?? ''}
            label={labelOverride || formData.label}
            disabled={isDisabled}
            value={value ?? ''}
            textAlign="right"
            onChangeText={onChange}
            error={!!error}
          />
          <HelperText type="error" visible={!!error}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  );
};
