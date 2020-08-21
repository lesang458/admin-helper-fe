import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import * as fromApp from '../../../../store/app.reducer';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Employee } from 'src/app/shared/models/employees.model';
import * as EmployeeActions from '../../store/employees.actions';

@Component({
  selector: 'ah-dayoff-table',
  templateUrl: './dayoff-table.component.html',
  styleUrls: ['./dayoff-table.component.scss'],
})
export class DayoffTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  public maxSize = 3;
  public sortType = 0;
  public data$: Observable<PaginatedData<Employee[]>>;
  private subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.data$ = this.store.select('employees').pipe(
      map((employees) => {
        return employees.dayOff;
      })
    );
    this.store.dispatch(
      new EmployeeActions.FetchDayOff({
        search: '',
        page: 1,
        sortType: this.sortType,
      })
    );
  }

  ngAfterViewInit(): void {
    this.subscription = fromEvent<any>(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        const search = this.searchInput.nativeElement.value;
        this.store.dispatch(
          new EmployeeActions.FetchDayOff({
            search,
            page: 1,
            sortType: this.sortType,
          })
        );
      });
  }

  public onPageChanged(event: any): void {
    const search = this.searchInput.nativeElement.value;
    this.store.dispatch(
      new EmployeeActions.FetchDayOff({
        search,
        page: event.page,
        sortType: this.sortType,
      })
    );
  }

  public onSort(page): void {
    this.sortType = (this.sortType + 1) % 3;
    const search = this.searchInput.nativeElement.value;
    this.store.dispatch(
      new EmployeeActions.FetchDayOff({ search, page, sortType: this.sortType })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
