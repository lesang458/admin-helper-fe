import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { Employee } from 'src/app/shared/models/employees.model';
import { ActivatedRoute, Router } from '@angular/router';
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
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import { RouteConstant } from 'src/app/shared/constants/route.constant';

@Component({
  selector: 'ah-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit, AfterViewChecked {
  private arr = [];
  public employee: Employee;
  public types: DayOffCategory[];
  public id: number;
  public dayoff = this.route.snapshot.queryParams.dayoff;
  public hourChecked = [];
  public selectedType = new FormControl('');
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public translateService: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.store.dispatch(new EmployeeActions.DetailEmployee(this.id));
    this.store
      .select((s) => s.employees.detaiEmployee)
      .subscribe((data: Employee) => {
        if (data) {
          this.store.select('dayoffCategories').subscribe((arr) => {
            arr.dayoff.forEach((val) => {
              this.arr.push(val.id);
            });
            this.selectedType.patchValue('No select');
            this.types = arr.dayoff.filter((obj) => {
              return !data?.dayOffInfos.some((obj2) => {
                return obj.id === obj2.dayOffCategoryId;
              });
            });
          });
          this.employeeForm.patchValue(data);
          this.employee = data;
          this.dayOffForm = new FormGroup({
            dayOffInfos: this.formBuilder.array(
              data?.dayOffInfos?.map((value) =>
                this.formBuilder.group({
                  availableHours: value.availableHours / 8,
                  categoryName: value.categoryName,
                  dayOffCategoryId: value.dayOffCategoryId,
                  status: value.status,
                  hours: [
                    {
                      value: value.hours / 8,
                      disabled: false,
                    },
                    Validators.pattern('^[0-9]*$'),
                  ],
                })
              )
            ),
          });
        }
      });
    this.store.dispatch(
      new DayOffActions.FetchDayOffCategories({ status: 'active' })
    );
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

  public addDayoffCatetory(types: DayOffCategory[]): void {
    if (this.selectedType.value !== 'No select') {
      const filter = types.filter(
        (e) => e.id.toString() === this.selectedType.value
      );
      const dayOffForm = this.formBuilder.group({
        categoryName: filter[0]?.name,
        dayOffCategoryId: filter[0]?.id,
        hours: filter[0].totalHoursDefault / 8,
        status: filter[0].status,
      });
      this.dayOffInfos.push(dayOffForm);
      this.types = types.filter((e) => e.id !== filter[0]?.id);
      this.selectedType.patchValue('No select');
    }
  }

  public removeDayoffCategory(types, dayOff): void {
    const index = this.dayOffForm.value.dayOffInfos.findIndex(
      (e) => e.dayOffCategoryId === dayOff.controls.dayOffCategoryId.value
    );
    this.dayOffInfos.removeAt(index);
    if (this.arr.indexOf(dayOff.controls.dayOffCategoryId.value) !== -1) {
      const param = {
        id: dayOff.controls.dayOffCategoryId.value,
        name: dayOff.controls.categoryName.value,
        totalHoursDefault: dayOff.controls.hours.value * 8,
        status: dayOff.status,
      };
      types.push(param);
      this.selectedType.patchValue('No select');
    }
  }

  public navigateTab(isDayOff?: boolean): void {
    this.router.navigateByUrl(
      `/${RouteConstant.employees}/${this.id}/edit${
        isDayOff ? '?dayoff=true' : ''
      }`
    );
  }

  public navigateDetail(): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}/${this.id}`);
  }

  public onSubmit(): void {
    this.employeeForm.value.dayOffInfosAttributes = this.dayOffForm.value.dayOffInfos;
    const employee = { ...this.employeeForm.value };
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
    const id = this.id;
    const params = { id, employee };
    this.store.dispatch(new EmployeeActions.EditEmployee(params));
  }
}
