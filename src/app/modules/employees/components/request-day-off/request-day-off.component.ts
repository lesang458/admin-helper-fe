import { SearchParams } from './../../store/employees.actions';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ah-request-day-off',
  templateUrl: './request-day-off.component.html',
  styleUrls: ['./request-day-off.component.scss'],
})
export class RequestDayOffComponent implements OnInit, OnChanges {
  @Input() selectedEmployee: Employee;
  @Input() searchParams: SearchParams;
  public currentDateString: string;
  public dayOffAvailable: number;
  public dayOffs: number;
  public dayOffInfos: any;
  public maxOfToDate: string;
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
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.f.get('fullName').disable();
  }

  ngOnChanges() {
    if (this.selectedEmployee) {
      this.currentDateString = this.setDateString();
      this.f.patchValue({
        fullName: `${this.selectedEmployee.firstName} ${this.selectedEmployee.lastName}`,
        fromDate: this.currentDateString,
        toDate: this.currentDateString,
        morningBreak: true,
        afternoonBreak: true,
        kindOfLeave: this.selectedEmployee.dayOffInfos[0].categoryName,
      });
      this.f.get('fromDate').valueChanges.subscribe((val) => {
        this.maxOfToDate = this.setDateString(14, val);
        this.setDayOffs()
          ? this.dayOffs > 14
            ? this.f.get('toDate').setValue(this.maxOfToDate)
            : null
          : this.f.get('toDate').setValue(val);
      });

      this.f.get('toDate').valueChanges.subscribe(() => {
        this.setDayOffs();
      });

      this.f.get('morningBreak').valueChanges.subscribe((val) => {
        if (val && this.f.get('afternoonBreak').value) {
          this.dayOffs = 1;
        } else {
          this.dayOffs = 0.5;
          !val ? this.f.get('afternoonBreak').setValue(true) : null;
        }
      });

      this.f.get('afternoonBreak').valueChanges.subscribe((val) => {
        if (val && this.f.get('morningBreak').value) {
          this.dayOffs = 1;
        } else {
          this.dayOffs = 0.5;
          !val ? this.f.get('morningBreak').setValue(true) : null;
        }
      });

      this.f.get('kindOfLeave').valueChanges.subscribe(() => {
        this.setHoursAvailable();
      });

      this.setHoursAvailable();
      this.maxOfToDate = this.setDateString(14);
      this.setDayOffs();
    }
  }

  private setDayOffs(): boolean {
    const to = new Date(`${this.f.get('toDate').value}`).getTime();
    const from = new Date(`${this.f.get('fromDate').value}`).getTime();
    if (to >= from) {
      this.dayOffs = (to - from) / 86400000 + 1;
      return true;
    } else {
      return false;
    }
  }

  public setDateString(ascDays: number = 1, dateString?: string): string {
    let date: Date;
    if (dateString) {
      date = new Date(
        new Date(dateString).getTime() + 86400000 * (ascDays - 1)
      );
    } else {
      date = new Date(this.currentDate.getTime() + 86400000 * (ascDays - 1));
    }
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' + date.getDate()
    ).slice(-2)}`;
  }

  public setHoursAvailable(): void {
    this.dayOffInfos = this.selectedEmployee.dayOffInfos.filter((item) => {
      return item.categoryName === this.f.get('kindOfLeave').value;
    })[0];
    this.dayOffAvailable =
      this.dayOffInfos?.availableHours > 0
        ? this.dayOffInfos.availableHours / 8
        : 0;
  }

  public setDays(): string {
    const str = this.translate.instant('REQUEST_DAY_OFF.DAY');
    return this.translate.currentLang === 'en' ? `${str}s` : str;
  }

  public setDay(): string {
    return this.translate.instant('REQUEST_DAY_OFF.DAY');
  }

  public onSave(): void {
    this.store.dispatch(
      new EmployeeActions.RequestDayOff({
        body: {
          id: this.selectedEmployee.id,
          fromDate: this.f.get('fromDate').value,
          toDate: this.f.get('toDate').value,
          hoursPerDay: this.dayOffs < 1 ? 4 : 8,
          dayOffInfoId: this.dayOffInfos.id,
        },
        searchParams: this.searchParams,
      })
    );
  }
}
