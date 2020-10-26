import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import * as DayOffActions from '../../../dayoff-categories/store/dayoff-categories.actions';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ah-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit {
  public hourChecked = [];
  public employeeForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl(''),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    birthdate: new FormControl('', this.birthdayValidator),
    joinDate: new FormControl(''),
    dayOffInfos: this.formBuilder.array([]),
  });
  public dayOffForm = new FormGroup({
    dayOffInfos: this.formBuilder.array([]),
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private formBuilder: FormBuilder,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new DayOffActions.FetchDayOffCategories({ status: 'active' })
    );
    this.store.select('dayoffCategories').subscribe((data: any) => {
      this.dayOffForm = new FormGroup({
        dayOffInfos: this.formBuilder.array(
          data?.dayoff?.map((value) =>
            this.formBuilder.group({
              categoryName: value.name,
              dayOffCategoryId: value.id,
              hours: [
                value.totalHoursDefault / 8,
                Validators.min(0),
              ],
            })
          )
        ),
      });
    });
  }

  get dayOffInfos(): FormArray {
    return this.dayOffForm.get('dayOffInfos') as FormArray;
  }

  get f() {
    return this.employeeForm.controls;
  }

  public getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  private birthdayValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const toDay = new Date();
    return date > toDay  ? { invalidDate: true } : null;
  }

  public getPhoneErrorMessage(): string {
    if (this.f.phoneNumber.errors.required) {
      return this.translateService.instant(
        'PROFILE_CREATE.PHONE_NUMBER_INVALID'
      );
    }
    if (this.f.phoneNumber.errors.pattern) {
      return this.translateService.instant(
        'PROFILE_CREATE.PHONE_NUMBER_PATTERN'
      );
    }
    if (this.f.phoneNumber.errors.minlength) {
      return this.translateService.instant(
        'PROFILE_CREATE.PHONE_NUMBER_MINLENGTH'
      );
    }
    return this.translateService.instant(
      'PROFILE_CREATE.PHONE_NUMBER_MAXLENGTH'
    );
  }

  public checkCheckBoxValue(event, id: number): void {
    if (!event.target.checked) {
      this.hourChecked.push(id);
    } else {
      const index = this.hourChecked.indexOf(id);
      this.hourChecked.splice(index, 1);
    }
  }

  public onSubmit(): void {
    this.employeeForm.value.dayOffInfosAttributes = this.dayOffForm.value.dayOffInfos;
    const employee = { ...this.employeeForm.value };
    delete employee.confirmPassword;
    delete employee.dayOffInfos;
    employee.dayOffInfosAttributes.forEach((element, index) => {
      if (this.dayOffInfos.at(index).get('hours').value === element.hours) {
        element.hours = element.hours * 8;
      }
      delete element.categoryName;
      delete element?.availableHours;
    });
    employee.dayOffInfosAttributes = employee.dayOffInfosAttributes.filter(
      (element) => {
        return this.hourChecked.indexOf(element.dayOffCategoryId) === -1;
      }
    );
    this.store.dispatch(new EmployeeActions.CreateEmployee(employee));
  }

  public disableSaveBtn(): boolean {
    return (
      this.f.firstName.value.trim().length === 0 ||
      this.f.lastName.value.trim().length === 0 ||
      this.f.email.value.trim().length === 0
    );
  }
}
