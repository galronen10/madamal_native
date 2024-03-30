import { IFormFieldInputData } from '@/models/form';
import { z } from 'zod';

export enum ERegisterFields {
  FULL_NAME = 'fullName',
  EMAIL = 'email',
  PASSWORD = 'password',
  IMAGE = 'imageFile',
}

export const registerFormDataObject: Record<
  ERegisterFields,
  IFormFieldInputData
> = {
  [ERegisterFields.FULL_NAME]: {
    fieldName: ERegisterFields.FULL_NAME,
    label: 'שם מלא',
  },
  [ERegisterFields.EMAIL]: {
    fieldName: ERegisterFields.EMAIL,
    label: 'אימייל',
  },
  [ERegisterFields.PASSWORD]: {
    fieldName: ERegisterFields.PASSWORD,
    label: 'סיסמה',
  },
  [ERegisterFields.IMAGE]: {
    fieldName: ERegisterFields.IMAGE,
  },
};

export const registerSchema = z.object({
  [ERegisterFields.EMAIL]: z.string().email('כתובת המייל לא חוקית'),
  [ERegisterFields.FULL_NAME]: z.string().min(3, 'נא להזין שם מלא'),
  [ERegisterFields.PASSWORD]: z
    .string()
    .min(3, 'נא להזין סיסמה באורך שלושה תווים לפחות'),
  [ERegisterFields.IMAGE]: z.instanceof(File).optional(),
});

export const defaultFormValues = {
  [ERegisterFields.FULL_NAME]: '',
  [ERegisterFields.EMAIL]: '',
  [ERegisterFields.PASSWORD]: '',
};
export type RegisterFormData = z.infer<typeof registerSchema>;
