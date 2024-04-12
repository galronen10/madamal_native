import { FC } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { EAddReportFields, addReportFormDataObject } from '../../formUtils';
import { ImageFormInput, TextFieldFormInput } from '@/components/form';

interface IReportFormBodyProps {
  control: Control<any>;
}

export const ReportFormBody: FC<IReportFormBodyProps> = ({ control }) => {
  const defaultImageName = useWatch({
    control,
    name: EAddReportFields.DEFAULT_IMAGE_NAME,
  });

  return (
    <>
      <TextFieldFormInput
        control={control}
        formData={addReportFormDataObject[EAddReportFields.TITLE]}
      />
      <TextFieldFormInput
        isMultiline
        control={control}
        formData={addReportFormDataObject[EAddReportFields.DATA]}
      />
      <ImageFormInput
        control={control}
        formData={addReportFormDataObject[EAddReportFields.IMAGE]}
        defaultImageUri={defaultImageName}
      />
    </>
  );
};
