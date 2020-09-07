import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
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

@Component({
  selector: 'profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss'],
})
export class ProfileCreateComponent implements OnInit {
  public id: number;
  public type: string;
  public refresh: SearchParams;
  public dataSource: Employee;
  public profileForm = new FormGroup({
    firstName: new FormControl('', Validators.maxLength(100)),
    lastName: new FormControl('', Validators.maxLength(100)),
    email: new FormControl('', Validators.email),
    encryptedPassword: new FormControl('', Validators.minLength(6)),
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(12),
    ]),
    birthdate: new FormControl(''),
    joinDate: new FormControl(''),
    dayOffInfos: this.formBuilder.array([
      this.formBuilder.group({
        dayOffCategoryId: 1,
        hours: ['', Validators.pattern('^[0-9]*$')],
      }),
      this.formBuilder.group({
        dayOffCategoryId: 2,
        hours: ['', Validators.pattern('^[0-9]*$')],
      }),
    ]),
  });

  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.dayOffInfos.disable();
    if (this.type !== 'create') {
      this.store.dispatch(new EmployeeActions.DetailEmployee(this.id));
      this.store
        .select((s) => s.employees.detaiEmployee)
        .subscribe((data: Employee) => {
          if (data) {
            this.dataSource = data;
            this.profileForm.patchValue(data);
          }
        });
    } else {
      this.store.dispatch(new DayOffActions.FetchDayOffCategories());
      this.store.select('dayoffCategories').subscribe((data: any) => {
        console.log(data);
      });
    }
    if (this.type === 'detail') {
      this.profileForm.disable();
    }
  }

  get dayOffInfos(): FormArray {
    return this.profileForm.get('dayOffInfos') as FormArray;
  }

  get f() {
    return this.profileForm.controls;
  }

  public getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  public onSubmit() {
    if (this.type === 'create') {
      this.store.dispatch(
        new EmployeeActions.CreateEmployee(this.profileForm.value)
      );
    } else {
      const id = this.id;
      const employee = this.profileForm.value;
      const searchParams = this.refresh;
      const params = { id, employee, searchParams };
      this.store.dispatch(new EmployeeActions.EditEmployee(params));
    }
    this.bsModalRef.hide();
  }
}
