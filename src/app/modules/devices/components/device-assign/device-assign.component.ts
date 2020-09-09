import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../../employees/store/employees.actions';
import * as DevicesActions from '../../store/devices.actions';
import { SearchParams } from 'src/app/modules/employees/store/employees.actions';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ah-device-assign',
  templateUrl: './device-assign.component.html',
  styleUrls: ['./device-assign.component.scss'],
})
export class DeviceAssignComponent implements OnInit {
  public id: number;
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl('');
  public assigned = new FormControl('');
  public currentPage = 1;
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public sortJoinDateType = 0;
  public searchParams: SearchParams;
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.employeeObs$ = this.store.select('employees');
    this.onPageChanged(1);
    this.searchFormControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
  }

  public onSort(page: number, column: string): void {
    if (column === 'name') {
      this.sortNameType =
        this.sortNameType === 0 ? 1 : this.sortNameType === 1 ? 2 : 1;
      this.sortBirthDateType = 0;
      this.sortJoinDateType = 0;
    } else {
      this.sortBirthDateType =
        this.sortBirthDateType === 0 ? 1 : this.sortBirthDateType === 1 ? 2 : 1;
      this.sortNameType = 0;
      this.sortJoinDateType = 0;
    }
    this.onPageChanged(page);
  }

  public onPageChanged(page: number): void {
    const search = this.searchFormControl.value;
    this.searchParams = {
      search,
      status: 'ACTIVE',
      page,
      perPage: 5,
      sort: {
        sortNameType: this.sortNameType,
        sortBirthDateType: this.sortBirthDateType,
        sortJoinDateType: this.sortJoinDateType,
      },
    };
    this.store.dispatch(new EmployeeActions.SearchEmployees(this.searchParams));
  }

  public onSubmit(): void {
    const id = this.id;
    const userId = {
      userId: this.assigned.value,
    };
    const params = { id, userId };
    this.store.dispatch(new DevicesActions.AssignDevice(params));
    this.bsModalRef.hide();
  }
}
