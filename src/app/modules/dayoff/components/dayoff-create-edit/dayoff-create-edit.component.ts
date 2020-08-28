import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DayOff } from 'src/app/shared/models/dayoff.model';

@Component({
  selector: 'ah-dayoff-create-edit',
  templateUrl: './dayoff-create-edit.component.html',
  styleUrls: ['./dayoff-create-edit.component.scss'],
})
export class DayoffCreateEditComponent implements OnInit {
  public type: string;
  public dayoffSelected: DayOff;
  public f = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    description: new FormControl(),
  });
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    if (this.type === 'edit') {
      this.f.patchValue({
        name:
          this.dayoffSelected.name[0] +
          this.dayoffSelected.name.slice(1).toLowerCase(),
        description: this.dayoffSelected.description,
      });
    }
  }

  public onSubmit() {
    if (this.type === 'create') {
      console.log('Created');
    }
    if (this.type === 'edit') {
      console.log('Edited');
    }
    if (this.type === 'delete') {
      console.log('Deleted');
    }

    this.bsModalRef.hide();
  }
}
