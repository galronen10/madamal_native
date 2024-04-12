import { z } from 'zod';
import { IFormFieldInputData } from '@/models/form';

export enum EAddReportFields {
  IMAGE = 'imageFile',
  DATA = 'data',
  TITLE = 'title',
  DEFAULT_IMAGE_NAME = 'defaultImageName',
}

export const addReportFormDataObject: Record<
  EAddReportFields,
  IFormFieldInputData
> = {
  [EAddReportFields.IMAGE]: {
    fieldName: EAddReportFields.IMAGE,
    label: 'תמונה עבור הדיווח',
  },
  [EAddReportFields.DEFAULT_IMAGE_NAME]: {
    fieldName: EAddReportFields.DEFAULT_IMAGE_NAME,
  },
  [EAddReportFields.DATA]: {
    fieldName: EAddReportFields.DATA,
    label: '*מה קרה',
  },
  [EAddReportFields.TITLE]: {
    fieldName: EAddReportFields.TITLE,
    label: '*כותרת הדיווח',
  },
};

export const schema = z.object({
  [EAddReportFields.IMAGE]: z.instanceof(File).optional(),
  [EAddReportFields.DEFAULT_IMAGE_NAME]: z.string().optional(),
  [EAddReportFields.DATA]: z.string().min(1, 'חובה למלא מה קרה'),
  [EAddReportFields.TITLE]: z.string().min(1, 'חובה למלא את כותרת הדיווח'),
});

export const defaultFormValues = {
  [EAddReportFields.DATA]: '',
  [EAddReportFields.TITLE]: '',
  [EAddReportFields.DEFAULT_IMAGE_NAME]: '',
};
export type AddReportFormData = z.infer<typeof schema>;
