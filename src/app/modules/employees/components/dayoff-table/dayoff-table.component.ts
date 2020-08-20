import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Employee } from 'src/app/shared/models/employees.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as EmployeesActions from '../../store/employees.actions';

@Component({
  selector: 'ah-dayoff-table',
  templateUrl: './dayoff-table.component.html',
  styleUrls: ['./dayoff-table.component.scss']
})
export class DayoffTableComponent implements OnInit {
  public maxSize = 3;
  public data$: Observable<PaginatedData<Employee[]>>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.data$ = this.store.select('employees').pipe(
      map((employees) => {
        return employees.dayOff;
      })
    );
    this.store.dispatch(new EmployeesActions.FetchDayOff({search: '', page: 1}));
  }

  public onPageChanged(event: any): void {
    this.store.dispatch(new EmployeesActions.FetchDayOff({search: '', page: event.page}));
  }
}
