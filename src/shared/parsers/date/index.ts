/* eslint-disable import/prefer-default-export */
import { format, differenceInMinutes } from 'date-fns';

const DEFAULT_DATE_FORMAT = 'dd/MM/yy hh:mm';

export function formatDate(
  date: number | Date | string,
  formatDate: string = DEFAULT_DATE_FORMAT,
): string {
  if (typeof date === 'string') return format(new Date(date), formatDate);

  return format(date, formatDate);
}

export function getDifferenceInMinutes(start: Date, end: Date): number {
  return differenceInMinutes(start, end);
}

export const dateBrToDefault = (date: string) => {
  const dateArr = date.split('/');
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
};

export const dateDefaultToBr = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy');
};
