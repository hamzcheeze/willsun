import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateAge = (startDate: string, endDate: string): number => {
  const start = moment(startDate);
  const end = endDate ? moment(endDate) : moment();
  return end.diff(start, 'years');
};
