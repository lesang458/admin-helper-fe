import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';

@Component({
  selector: 'profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss'],
})
export class ProfileCreateComponent implements OnInit {
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
  });

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  get f() {
    return this.profileForm.controls;
  }

  public getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  public onSubmit() {
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

  public resetForm() {
    this.profileForm.reset();
  }
}
