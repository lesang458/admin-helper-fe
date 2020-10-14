import { DayOffCategory } from './dayoff-category.model';
import { Employee } from './employees.model';

export interface DayOffRequest {
  id?: number;
  user: Employee;
  fromDate: string;
  toDate: string;
  notes: string;
  hoursPerDay: string;
  dayOffCategory: DayOffCategory;
}
