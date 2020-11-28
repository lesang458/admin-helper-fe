import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { Employee } from 'src/app/shared/models/employees.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchDevice } from '../../../devices/store/devices.actions';
import { Observable } from 'rxjs';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestDayOffComponent } from '../request-day-off/request-day-off.component';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { DatePipe } from '@angular/common';
import { Device } from 'src/app/shared/models/device.model';

@Component({
  selector: 'ah-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public employee: Employee;
  public searchParams: SearchDevice;
  public id: number;
  public dayoff = this.route.snapshot.queryParams.dayoff;
  public deviceHistories: DeviceHistory[];
  public devices: Device[];

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    public translateService: TranslateService,
    private modalService: BsModalService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.store.dispatch(new EmployeeActions.DetailEmployee(this.id));
    this.store.dispatch(
      new EmployeeActions.FetchEmployeeDeviceHistories(this.id)
    );
    this.store.dispatch(new EmployeeActions.FetchEmployeeDevices(this.id));
    this.store.select('employees').subscribe((data) => {
      if (data.detaiEmployee) {
        this.employee = data.detaiEmployee;
      }
      this.devices = data.devices;
      this.deviceHistories = data.deviceHistories;
    });
  }

  public navigateEdit(bl?: boolean): void {
    this.router.navigateByUrl(
      `/${RouteConstant.employees}/${this.id}/edit${bl ? '?dayoff=true' : ''}`
    );
  }

  public navigateTab(isDayOff?: boolean): void {
    this.router.navigateByUrl(
      `/${RouteConstant.employees}/${this.id}${isDayOff ? '?dayoff=true' : ''}`
    );
  }

  public openModalWithComponent(selectedEmployee, searchParams): void {
    const id = this.id;
    const initialState = {
      selectedEmployee,
      searchParams,
      id,
    };
    this.bsModalRef = this.modalService.show(RequestDayOffComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public getToDate(date: Date): string {
    return date
      ? this.datePipe.transform(date, 'dd/MM/yyyy')
      : this.translateService.instant('DEVICE_HISTORY.PRESENT');
  }

  public back(): void {
    this.dayoff
      ? this.router.navigateByUrl(`/${RouteConstant.dayOff}`)
      : this.router.navigateByUrl(`/${RouteConstant.employees}`);
  }
}
