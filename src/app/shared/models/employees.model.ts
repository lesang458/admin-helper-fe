export class Employees {
  public id: string;
  public email: string;
  public first_name: string;
  public last_name: string;
  public birthdate: string;
  public join_date?: string;
  public status: string;
  public phone_number: string;
  public hours: any;
  public roles?: any;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
