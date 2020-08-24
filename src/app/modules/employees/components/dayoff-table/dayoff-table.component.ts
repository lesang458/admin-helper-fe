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
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Employee } from 'src/app/shared/models/employees.model';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';

@Component({
  selector: 'ah-dayoff-table',
  templateUrl: './dayoff-table.component.html',
  styleUrls: ['./dayoff-table.component.scss'],
})
export class DayoffTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  public maxSize = 3;
  public currentPage = 1;
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public data$: Observable<PaginatedData<Employee[]>>;
  private subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.data$ = this.store.select('employees').pipe(
      map((employees) => {
        return employees.dayOff;
      })
    );
  }

  ngAfterViewInit(): void {
    this.subscription = fromEvent<any>(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
  }

  public onSort(page: number, column?: string): void {
    if (column) {
      this.sortNameType = (this.sortNameType + 1) % 3;
      this.sortBirthDateType = 0;
    } else {
      this.sortBirthDateType = (this.sortBirthDateType + 1) % 3;
      this.sortNameType = 0;
    }
    this.onPageChanged(page);
  }

  public onPageChanged(page: number): void {
    const search = this.searchInput.nativeElement.value;
    this.store.dispatch(
      new EmployeeActions.FetchDayOff({
        search,
        page,
        sort: {
          sortNameType: this.sortNameType,
          sortBirthDateType: this.sortBirthDateType,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
