import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../../employees/store/employees.actions';
import * as DevicesActions from '../../store/devices.actions';
import { SearchParams } from 'src/app/modules/employees/store/employees.actions';
import { SearchDevice } from '../../store/devices.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Device } from 'src/app/shared/models/device.model';

@Component({
  selector: 'ah-device-assign',
  templateUrl: './device-assign.component.html',
  styleUrls: ['./device-assign.component.scss'],
})
export class DeviceAssignComponent implements OnInit {
  public device: Device;
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl('');
  public assigned = new FormControl('1');
  public currentPage = 1;
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public sortJoinDateType = 0;
  public paramEmployee: SearchParams;
  public params: SearchDevice;
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.employeeObs$ = this.store.select('employees');
    this.onPageChanged(1);
    this.assigned = new FormControl(
      this.device.user ? this.device?.user?.id.toString() : ''
    );
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
    this.paramEmployee = {
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
    this.store.dispatch(
      new EmployeeActions.SearchEmployees(this.paramEmployee)
    );
  }

  public onSubmit(): void {
    const id = this.device.id;
    const userId = {
      userId: this.assigned.value,
    };
    const params = this.params;
    const data = { id, userId, params };
    this.store.dispatch(new DevicesActions.AssignDevice(data));
    this.bsModalRef.hide();
  }

  public onSearchSubmit(): void {
    if (this.currentPage === 1) {
      this.onPageChanged(1);
    } else {
      this.currentPage = 1;
    }
  }
}
