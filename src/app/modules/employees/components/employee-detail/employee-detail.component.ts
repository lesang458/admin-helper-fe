import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { Employee } from 'src/app/shared/models/employees.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as DevicesActions from '../../../devices/store/devices.actions';
import * as DayOffActions from '../../../dayoff-categories/store/dayoff-categories.actions';
import { SearchDevice } from '../../../devices/store/devices.actions';
import { Observable } from 'rxjs';
import { State } from '../../../devices/store/devices.reducer';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ah-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  public employee: Employee;
  public searchParams: SearchDevice;
  public device$: Observable<State>;
  public id: number;
  public employeeForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    email: new FormControl('', Validators.email),
    encryptedPassword: new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl(''),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    birthdate: new FormControl(''),
    joinDate: new FormControl(''),
    dayOffInfos: this.formBuilder.array([]),
  });
  public dayOffForm = new FormGroup({
    dayOffInfos: this.formBuilder.array([]),
  });
  public edit = location.pathname.split('/')[3] === 'edit';
  public create = location.pathname.split('/employees/')[1] === 'create';

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (!this.create) {
      this.id = this.route.snapshot.params.id;
      this.store.dispatch(new EmployeeActions.DetailEmployee(this.id));
      this.store
        .select((s) => s.employees.detaiEmployee)
        .subscribe((data: Employee) => {
          if (data) {
            this.employeeForm.patchValue(data);
            this.employee = data;
            this.dayOffForm = new FormGroup({
              dayOffInfos: this.formBuilder.array(
                data?.dayOffInfos?.map((value) =>
                  this.formBuilder.group({
                    availableHours: value.availableHours,
                    categoryName: value.categoryName,
                    hours: [
                      {
                        value: value.hours,
                        disabled: this.edit ? false : true,
                      },
                      Validators.pattern('^[0-9]*$'),
                    ],
                  })
                )
              ),
            });
          }
        });
    }
    if (this.create) {
      this.store.dispatch(new DayOffActions.FetchDayOffCategories());
      this.store.select('dayoffCategories').subscribe((data: any) => {
        this.dayOffForm = new FormGroup({
          dayOffInfos: this.formBuilder.array(
            data?.dayoff?.map((value) =>
              this.formBuilder.group({
                categoryName: value.name,
                dayOffCategoryId: value.id,
                hours: [
                  value.totalHoursDefault,
                  Validators.pattern('^[0-9]*$'),
                ],
              })
            )
          ),
        });
      });
    }
    if (!this.edit && !this.create) {
      this.employeeForm.disable();
      this.device$ = this.store.select('devices');
      this.searchParams = {
        status: 'ASSIGNED',
        userId: this.id,
      };
      this.store.dispatch(new DevicesActions.FetchDevices(this.searchParams));
    }
  }

  public navigateEdit(): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}/${this.id}/edit`);
  }

  public navigateDetail(): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}/${this.id}`);
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

  public onSubmit(): void {
    this.employeeForm.value.dayOffInfos = this.dayOffForm.value.dayOffInfos;
    const employee = { ...this.employeeForm.value };
    delete employee.confirmPassword;
    if (this.create) {
      this.store.dispatch(new EmployeeActions.CreateEmployee(employee));
    } else {
      const id = this.id;
      const params = { id, employee };
      this.store.dispatch(new EmployeeActions.EditEmployee(params));
    }
  }
}
