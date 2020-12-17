import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
import { Router } from '@angular/router';
import { RouteConstant } from 'src/app/shared/constants/route.constant';

@Component({
  selector: 'ah-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit, AfterViewChecked {
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
    salaryPerMonth: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]),
    password: new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl('', Validators.minLength(6)),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    birthdate: new FormControl('', this.birthdayValidator),
    joinDate: new FormControl(''),
  });
  public dayOffForm = new FormGroup({
    dayOffInfos: this.formBuilder.array([]),
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private formBuilder: FormBuilder,
    public translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router
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
              hours: [value.totalHoursDefault / 8, Validators.min(1)],
            })
          )
        ),
      });
    });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
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

  private birthdayValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    const toDay = new Date();
    return date > toDay ? { invalidDate: true } : null;
  }

  public passwordIsIncorrect(): boolean {
    const statusValidate =
      this.f.password.value !== this.f.confirmPassword.value;
    if (statusValidate) {
      this.f.confirmPassword.setErrors({ incorrect: true });
    } else {
      this.f.confirmPassword.setErrors({ incorrect: null });
      this.f.confirmPassword.updateValueAndValidity();
    }
    return statusValidate;
  }

  public getErrorMessage(): string {
    if (this.f.confirmPassword.errors?.required) {
      return this.translateService.instant('PROFILE_CREATE.PASSWORD_INVALID');
    }
    if (this.passwordIsIncorrect()) {
      return this.translateService.instant('RESET_PASSWORD.INCORRECT');
    }
    if (this.f.confirmPassword.errors?.minlength) {
      return this.translateService.instant('PROFILE_CREATE.PASS_MINLENGTH');
    }
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

  public back(): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}`);
  }
}
