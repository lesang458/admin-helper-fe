export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  joinDate?: string;
  status: string;
  phoneNumber: string;
  dayOffInfos: any;
  roles?: any;
}
