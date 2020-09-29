export interface RequestDayOffModel {
  fromDate: string;
  toDate: string;
  hoursPerDay: number;
  id?: string;
  dayOffCategoryId: number;
}
