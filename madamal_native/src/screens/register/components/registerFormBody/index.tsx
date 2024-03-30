import { FC } from 'react';
import { Control } from 'react-hook-form';
import { ERegisterFields, registerFormDataObject } from '../../formUtils';
import { TextFieldFormInput, ImageFormInput } from '@/components/form';
import { View } from 'react-native';

interface Props {
  control: Control<any>;
}

export const RegisterFormBody: FC<Props> = ({ control }) => {
  return (
    <View>
      <TextFieldFormInput
        control={control}
        formData={registerFormDataObject[ERegisterFields.FULL_NAME]}
      />
      <TextFieldFormInput
        control={control}
        formData={registerFormDataObject[ERegisterFields.EMAIL]}
        inputMode="email"
      />
      <TextFieldFormInput
        control={control}
        formData={registerFormDataObject[ERegisterFields.PASSWORD]}
        isPassword
      />
      <ImageFormInput
        control={control}
        formData={registerFormDataObject[ERegisterFields.IMAGE]}
      />
    </View>
  );
};
