import { DayOffCategory } from './dayoff-category.model';

export interface DayOffRequest {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  fromDate: string;
  toDate: string;
  notes: string;
  hoursPerDay: string;
  dayOffCategory: DayOffCategory;
}
