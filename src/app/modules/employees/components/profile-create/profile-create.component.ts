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
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss'],
})
export class ProfileCreateComponent implements OnInit {
  public id: any;
  public type: string;
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
    dayOffInfo: this.formBuilder.array([
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

  ngOnInit(): void {
    if(this.type === 'detail'){
      this.store.dispatch(new EmployeeActions.DetailEmployee(this.id));
      console.log("ProfileCreateComponent -> ngOnInit -> this.id", this.id)
    }
  }

  get dayOffInfo(): FormArray {
    return this.profileForm.get('dayOffInfo') as FormArray;
  }

  get f() {
    return this.profileForm.controls;
  }

  public getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  public onSubmit() {
    this.store.dispatch(
      new EmployeeActions.CreateEmployee(this.profileForm.value)
    );
  }
}
