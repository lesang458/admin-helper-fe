import { RequestDayOffModel } from 'src/app/shared/models/request-day-off.model';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/shared/models/employees.model';

@Component({
  selector: 'ah-request-day-off',
  templateUrl: './request-day-off.component.html',
  styleUrls: ['./request-day-off.component.scss'],
})
export class RequestDayOffComponent implements OnInit, OnChanges {
  @Input() currentId: number;
  public currentEmployee: Employee;
  public currentDateString: string;
  public dayOffAvailable: number;
  public dayOffs: number;
  public maxOfToDate: string;
  public f: FormGroup;
  private currentDate = new Date();
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.f = new FormGroup({
      fullName: new FormControl(),
      fromDate: new FormControl(),
      toDate: new FormControl(),
      morningBreak: new FormControl(),
      afternoonBreak: new FormControl(),
      kindOfLeave: new FormControl(),
      unpaidLeave: new FormControl(),
    });
    this.f.get('fullName').disable();

    this.store.select('employees').source.source.source.subscribe((val) => {
      val.employees.dayOff?.data.forEach((element) => {
        if (element.id === this.currentId) {
          this.currentEmployee = element;
        }
      });
    });

    if (this.currentEmployee) {
      this.currentDateString = this.setDateString();
      this.f = new FormGroup({
        fullName: new FormControl(
          `${this.currentEmployee.firstName} ${this.currentEmployee.lastName}`
        ),
        fromDate: new FormControl(this.currentDateString),
        toDate: new FormControl(this.currentDateString),
        morningBreak: new FormControl('true'),
        afternoonBreak: new FormControl('true'),
        kindOfLeave: new FormControl('VACATION'),
        unpaidLeave: new FormControl(),
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
        if (val) {
          this.dayOffs += 0.5;
        } else {
          if (this.f.get('afternoonBreak').value) {
            this.dayOffs -= 0.5;
          } else {
            this.dayOffs -= 0.5;
            this.f.get('afternoonBreak').setValue(true);
          }
        }
      });
      this.f.get('afternoonBreak').valueChanges.subscribe((val) => {
        if (val) {
          this.dayOffs += 0.5;
        } else {
          if (this.f.get('morningBreak').value) {
            this.dayOffs -= 0.5;
          } else {
            this.dayOffs -= 0.5;
            this.f.get('morningBreak').setValue(true);
          }
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
    let to = new Date(`${this.f.get('toDate').value}`).getTime();
    let from = new Date(`${this.f.get('fromDate').value}`).getTime();
    if (to >= from) {
      this.dayOffs = (to - from) / 86400000 + 1;
      return true;
    } else {
      return false;
    }
  }

  public setDateString(ascDays: number = 1, dateString?: string): string {
    let date;
    if (dateString) {
      date = new Date(new Date(dateString).getTime() + 1209600000);
    } else {
      date = this.currentDate;
    }
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
      '0' +
      (date.getDate() + ascDays - 1)
    ).slice(-2)}`;
  }

  public setHoursAvailable(): void {
    let hours = this.currentEmployee.hours.filter(
      (item) => item.category === this.f.get('kindOfLeave').value
    )[0];
    this.dayOffAvailable = hours ? hours.availableHours / 8 : 0;
  }

  public onSave(): void {
    this.store.dispatch(
      new EmployeeActions.RequestDayOff({
        id: this.currentId.toString(),
        fromDate: this.f.get('fromDate').value,
        toDate: this.f.get('toDate').value,
        hoursPerDay: this.dayOffs < 1 ? 4 : 8,
        dayOffInfoId:
          this.f.get('kindOfLeave').value === 'VACATION' ? '1' : '2',
      })
    );
    this.ngOnChanges();
  }
}
