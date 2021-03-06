export interface DayOffCategory {
  id?: number;
  name: string;
  status?: string;
  description: string;
  totalHoursDefault: number;
  applyForAllEmployees?: boolean;
  employeeIds?: Array<number>;
}
