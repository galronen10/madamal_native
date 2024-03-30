import { FC } from 'react';
import { Control } from 'react-hook-form';
import { ELoginFields, loginFormDataObject } from '../../formUtils';
import { TextFieldFormInput } from '@/components/form';

interface Props {
  control: Control<any>;
}

export const LoginFormBody: FC<Props> = ({ control }) => {
  return (
    <>
      <TextFieldFormInput
        control={control}
        formData={loginFormDataObject[ELoginFields.EMAIL]}
        inputMode="email"
      />
      <TextFieldFormInput
        control={control}
        formData={loginFormDataObject[ELoginFields.PASSWORD]}
        isPassword
      />
    </>
  );
};
