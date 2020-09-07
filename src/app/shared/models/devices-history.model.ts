import { Employee } from './employees.model';
import { Device } from './device.model';

export interface DeviceHistory {
  id?: string;
  fromDate: string;
  toDate: string;
  status: string;
  user: Employee;
  device: Device;
}
