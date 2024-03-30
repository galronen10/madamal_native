import { FC } from 'react';
import { Control } from 'react-hook-form';
import { EEditUserFields, editUserFormDataObject } from '../../formUtils';
import { TextFieldFormInput, ImageFormInput } from '@/components/form';

interface Props {
  control: Control<any>;
}

export const EditUserFormBody: FC<Props> = ({ control }) => {
  return (
    <>
      <TextFieldFormInput
        control={control}
        formData={editUserFormDataObject[EEditUserFields.FULL_NAME]}
      />

      <ImageFormInput
        control={control}
        formData={editUserFormDataObject[EEditUserFields.IMAGE]}
      />
    </>
  );
};
