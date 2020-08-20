import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'profile-create',
  templateUrl: './profile-create.component.html',
})
export class ProfileCreateComponent implements OnInit {
  public submitted = false;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
    birthdate: new FormControl(''),
    joinDate: new FormControl(''),
    dayOffCategoryId: new FormControl(''),
    hours: new FormControl('')
  });
 
  constructor() {}

  ngOnInit(): void {}

  get f() {
    return this.profileForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    console.log(this.profileForm.value)
  }
}
