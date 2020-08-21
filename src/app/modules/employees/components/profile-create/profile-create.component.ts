import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { HttpParams } from '@angular/common/http';

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
    password: new FormControl('', Validators.minLength(6)),
    phoneNumber: new FormControl(''),
    birthdate: new FormControl(''),
    joinDate: new FormControl(''),
  });

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.profileForm.valueChanges.subscribe(() => {
      this.store.dispatch(
        new EmployeeActions.CreateEmployee(
          new HttpParams({ fromObject: this.profileForm.value })
        )
      );
    });
    console.log(this.profileForm.value);
  }
}
