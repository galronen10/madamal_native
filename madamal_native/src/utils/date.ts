import { format } from 'date-fns';

export const dateFormatter = (date: string | Date) =>
  format(new Date(date), 'HH:mm - dd.MM.yyyy');
