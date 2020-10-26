import { SearchParams } from './../../store/employees.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { TranslateService } from '@ngx-translate/core';
import { RequestDayOffModel } from 'src/app/shared/models/request-day-off.model';
import { DatePipe } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const milisecondOfADay = 86400000;
@Component({
  selector: 'ah-request-day-off',
  templateUrl: './request-day-off.component.html',
  styleUrls: ['./request-day-off.component.scss'],
})
export class RequestDayOffComponent implements OnInit {
  public selectedEmployee: Employee;
  public searchParams: SearchParams;
  public editData: any;
  public currentDateString: string;
  public dayOffAvailable: number;
  public dayOffs: number;
  public dayOffInfos: any;
  public toDateError = false;
  public f = new FormGroup({
    fullName: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    morningBreak: new FormControl(),
    afternoonBreak: new FormControl(),
    kindOfLeave: new FormControl(),
    unpaidLeave: new FormControl(),
  });
  private currentDate = new Date();
  constructor(
    private store: Store<fromApp.AppState>,
    public translate: TranslateService,
    private datePipe: DatePipe,
    public bsModalRef: BsModalRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.f.get('fullName').disable();
    if (this.selectedEmployee) {
      this.currentDateString = this.setDateString();
      this.f.patchValue({
        fullName: `${this.selectedEmployee.lastName} ${this.selectedEmployee.firstName}`,
        fromDate: this.currentDateString,
        toDate: this.currentDateString,
        morningBreak: true,
        afternoonBreak: true,
        kindOfLeave: this.selectedEmployee.dayOffInfos[0].categoryName,
      });
    }
    if (this.editData) {
      this.f.patchValue({
        fromDate: this.datePipe.transform(this.editData.fromDate, 'yyyy-MM-dd'),
        toDate: this.datePipe.transform(this.editData.toDate, 'yyyy-MM-dd'),
        morningBreak:
          this.editData.notes === 'Morning' ||
          (this.editData.hoursPerDay === 8 &&
            this.editData.fromDate === this.editData.toDate),
        afternoonBreak:
          this.editData.notes === 'Afternoon' ||
          (this.editData.hoursPerDay === 8 &&
            this.editData.fromDate === this.editData.toDate),
        kindOfLeave: this.editData.dayOffCategory.name,
      });

      if (this.selectedEmployee?.id !== this.editData.user.id) {
        this.store.dispatch(
          new EmployeeActions.DetailEmployee(this.editData.user.id)
        );
      }
    }
    if (this.selectedEmployee || this.editData) {
      this.f.get('morningBreak').valueChanges.subscribe((val) => {
        this.onDayOffChanged('afternoonBreak', val);
      });

      this.f.get('afternoonBreak').valueChanges.subscribe((val) => {
        this.onDayOffChanged('morningBreak', val);
      });

      this.f.get('kindOfLeave').valueChanges.subscribe(() => {
        this.setHoursAvailable();
      });

      this.f
        .get('toDate')
        .valueChanges.pipe(debounceTime(300))
        .subscribe(() => {
          this.setDayOffs();
        });
    }
    if (this.editData) {
      this.store
        .select((s) => s.employees.detaiEmployee)
        .subscribe((data: Employee) => {
          this.selectedEmployee = data;
          this.setDayOffs();
          this.setHoursAvailable();
        });
    }
    this.setHoursAvailable();
    this.setDayOffs();
  }

  public setDayOffs(): void {
    const to = new Date(`${this.f.get('toDate').value}`).getTime();
    const from = new Date(`${this.f.get('fromDate').value}`).getTime();
    if (to < from) {
      this.f.get('toDate').setValue(this.f.get('fromDate').value);
      this.dayOffs = 1;
      setTimeout(() => {
        this.toDateError = true;
      }, 300);
      setTimeout(() => {
        this.toDateError = false;
      }, 4000);
      this.toDateError = true;
    } else {
      if (this.dayOffs) {
        this.dayOffs = (to - from) / milisecondOfADay + 1;
        if (this.dayOffs === 1) {
          this.f.patchValue({
            morningBreak: true,
            afternoonBreak: true,
          });
        }
      } else {
        this.dayOffs =
          this.editData?.hoursPerDay === 4
            ? 0.5
            : (to - from) / milisecondOfADay + 1;
      }
    }
  }

  public setDateString(ascDays: number = 1, dateString?: string): string {
    let date: Date;
    if (dateString) {
      date = new Date(
        new Date(dateString).getTime() + milisecondOfADay * (ascDays - 1)
      );
    } else {
      date = new Date(
        this.currentDate.getTime() + milisecondOfADay * (ascDays - 1)
      );
    }
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`;
  }

  public setHoursAvailable(): void {
    this.dayOffInfos = this.selectedEmployee?.dayOffInfos.filter((item) => {
      return item.categoryName === this.f.get('kindOfLeave').value;
    })[0];
    let dayOffReturn = 0;
    if (
      this.editData &&
      this.dayOffInfos?.dayOffCategoryId === this.editData.dayOffCategory.id
    ) {
      dayOffReturn =
        this.editData.hoursPerDay === 4
          ? 0.5
          : (+new Date(this.editData.toDate) -
              +new Date(this.editData.fromDate)) /
              milisecondOfADay +
            1;
    }

    this.dayOffAvailable = this.dayOffInfos?.availableHours / 8 + dayOffReturn;
    this.dayOffAvailable < 0 ? (this.dayOffAvailable = 0) : null;
  }

  public onDayOffChanged(controlName: string, value: boolean): void {
    if (!value) {
      this.f.get(controlName).setValue(true);
      this.dayOffs === 1 ? (this.dayOffs = 0.5) : null;
    } else {
      this.dayOffs === 0.5 ? (this.dayOffs = 1) : null;
    }
  }

  public setDays(): string {
    const str = this.translate.instant('REQUEST_DAY_OFF.DAY');
    return this.translate.currentLang === 'en' ? `${str}s` : str;
  }

  public setDay(): string {
    return this.translate.instant('REQUEST_DAY_OFF.DAY');
  }

  public onSave(): void {
    let notes = '';
    if (this.dayOffs < 1) {
      notes = this.f.get('morningBreak').value ? 'Morning' : 'Afternoon';
    }
    const body: RequestDayOffModel = {
      id: this.editData ? this.editData.id : this.selectedEmployee.id,
      fromDate: this.f.get('fromDate').value,
      toDate: this.f.get('toDate').value,
      hoursPerDay: this.dayOffs < 1 ? 4 : 8,
      dayOffCategoryId: this.dayOffInfos.dayOffCategoryId,
      notes: notes,
    };
    const searchParams = {
      page: 1,
      perPage: this.route.snapshot.queryParams.dayoff ? 5 : 10,
      userId: this.route.snapshot.queryParams.dayoff
        ? this.selectedEmployee.id
        : '',
    };
    if (this.editData) {
      this.store.dispatch(
        new EmployeeActions.UpdateRequestDayOff({
          body,
          searchParams,
        })
      );
    } else {
      this.store.dispatch(
        new EmployeeActions.RequestDayOff({
          body,
          searchParams,
        })
      );
    }
    this.bsModalRef.hide();
  }
}
