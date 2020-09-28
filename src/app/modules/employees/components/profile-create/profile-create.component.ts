import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import * as DayOffActions from '../../../dayoff-categories/store/dayoff-categories.actions';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/shared/models/employees.model';
import { SearchParams } from '../../store/employees.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss'],
})
export class ProfileCreateComponent implements OnInit {
  public state: boolean[];
  public id: number;
  public type: string;
  public refresh: SearchParams;
  public profileForm = new FormGroup({
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

  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    public translateService: TranslateService
  ) {}

  ngOnInit() {
    if (this.type === 'create') {
      this.store.dispatch(new DayOffActions.FetchDayOffCategories());
      this.store.select('dayoffCategories').subscribe((data: any) => {
        this.initState(data?.dayoff?.length);
        this.dayOffForm = new FormGroup({
          dayOffInfos: this.formBuilder.array(
            data?.dayoff?.map((value) =>
              this.formBuilder.group({
                nameDayOff: { value: value.name, disabled: true },
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

  public initState(length: number): void {
    this.state = new Array<boolean>(length).fill(false);
  }

  get dayOffInfos(): FormArray {
    return this.dayOffForm.get('dayOffInfos') as FormArray;
  }

  get f() {
    return this.profileForm.controls;
  }

  public getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  public onSubmit() {
    this.profileForm.value.dayOffInfos = this.dayOffForm.value.dayOffInfos;
    const employee = this.profileForm.value;
    const searchParams = this.refresh;
    if (this.type === 'create') {
      const params = { employee, searchParams };
      this.store.dispatch(new EmployeeActions.CreateEmployee(params));
    }
    const id = this.id;
    if (this.type === 'delete' || this.type === 'active') {
      const status = this.type === 'delete' ? 'FORMER' : 'ACTIVE';
      const params = { id, status, searchParams };
      this.store.dispatch(new EmployeeActions.UpdateEmployeeStatus(params));
    }
    this.bsModalRef.hide();
  }
}
