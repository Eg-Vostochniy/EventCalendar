import { Moment } from 'moment';

export const getCurrentDate = (day: Moment, format: string): string => day.format(format)
