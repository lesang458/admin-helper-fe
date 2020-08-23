import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';

@Component({
  selector: 'profile-create',
  templateUrl: './profile-create.component.html',
})
export class ProfileCreateComponent implements OnInit {
  public submitted = false;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', Validators.email),
    encryptedPassword: new FormControl('', Validators.minLength(6)),
    phoneNumber: new FormControl(''),
    birthdate: new FormControl(''),
    joinDate: new FormControl(''),
  });

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  get f() {
    return this.profileForm.controls;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  onSubmit() {
    this.submitted = true;
    const dayOffInfo = [
      {
        dayOffCategoryId: 1,
        hours: 160,
      },
      {
        dayOffCategoryId: 2,
        hours: 160,
      },
    ];
    this.profileForm.value.dayOffInfo = dayOffInfo;
    this.store.dispatch(
      new EmployeeActions.CreateEmployee(this.profileForm.value)
    );
  }
}
