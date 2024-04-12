import { IFormFieldInputData } from '@/models/form';
import { z } from 'zod';

export enum EEditUserFields {
  FULL_NAME = 'fullName',
  IMAGE = 'imageUri',
  DEFAULT_IMAGE_NAME = 'defaultImageName',
}

export const editUserFormDataObject: Record<
  EEditUserFields,
  IFormFieldInputData
> = {
  [EEditUserFields.FULL_NAME]: {
    fieldName: EEditUserFields.FULL_NAME,
    label: 'שם מלא',
  },

  [EEditUserFields.IMAGE]: {
    fieldName: EEditUserFields.IMAGE,
    label: 'תמונת המשתמש',
  },
  [EEditUserFields.DEFAULT_IMAGE_NAME]: {
    fieldName: EEditUserFields.DEFAULT_IMAGE_NAME,
  },
};

export const editUserSchema = z.object({
  [EEditUserFields.FULL_NAME]: z.string().min(3, 'נא להזין שם מלא'),

  [EEditUserFields.IMAGE]: z.string().optional(),
  [EEditUserFields.DEFAULT_IMAGE_NAME]: z.string().optional(),
});

export const defaultFormValues = {
  [EEditUserFields.FULL_NAME]: '',
  [EEditUserFields.DEFAULT_IMAGE_NAME]: undefined,
};
export type EditUserFormData = z.infer<typeof editUserSchema>;
