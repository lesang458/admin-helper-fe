import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/shared/models/employees.model';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import * as fromApp from '../../../../store/app.reducer';
import { SearchParams } from '../../store/employees.actions';
import * as EmployeeActions from '../../store/employees.actions';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'ah-payroll-detail',
  templateUrl: './payroll-detail.component.html',
  styleUrls: ['./payroll-detail.component.scss'],
})
export class PayrollDetailComponent implements OnInit {
  public currentPage = 1;
  private currentSearch = '';
  public searchParams: SearchParams;
  public year = new Date().getUTCFullYear();
  public selectedMonth = new Date().getUTCMonth() + 1;
  public listMonths = [];
  public searchFormControl = new FormControl('');
  public data$: Observable<PaginatedData<Employee[]>>;
  public numWorkDays: number;
  constructor(
    public translateService: TranslateService,
    private store: Store<fromApp.AppState>,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.numWorkDays = this.getNumWorkDays(
      new Date(this.year, this.selectedMonth - 1, 1),
      new Date(this.year, this.selectedMonth, 0)
    );
    for (let i = this.selectedMonth; i > 0; i--) {
      this.listMonths.push(i);
    }
    this.data$ = this.store
      .select('employees')
      .pipe(map((state) => state.dayOff));
    this.onPageChanged(1);
  }

  public onPageChanged(page: number): void {
    const search = this.searchFormControl.value;
    this.searchParams = {
      search,
      page,
      perPage: 10,
      sort: {
        sortNameType: 0,
        sortBirthDateType: 0,
        sortJoinDateType: 0,
      },
      status: 'ACTIVE',
      fullInfo: 'true',
      month: new Date(this.year, this.selectedMonth - 1, 1),
    };
    this.store.dispatch(new EmployeeActions.FetchDayOff(this.searchParams));
  }

  public onSearchSubmit(): void {
    if (
      this.currentSearch !== this.searchFormControl.value.replace(/\s/g, '')
    ) {
      this.currentSearch = this.searchFormControl.value.replace(/\s/g, '');
      this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
    }
  }

  public getNumWorkDays(startDate: Date, endDate: Date): number {
    let numWorkDays = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        numWorkDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return numWorkDays;
  }

  public onSelectMonth(month: number): void {
    this.selectedMonth = month;
    this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
  }

  public exportFile(): void {
    this.excelService
      .getData(new Date(this.year, this.selectedMonth - 1, 1))
      .subscribe((result) => {
        const data = result.map((employee) => {
          return {
            Name: employee.lastName + ' ' + employee.firstName,
            Birthday: employee.birthdate,
            Salary: employee.salaryPerMonth,
            TotalPaidDaysOff: employee.totalPaidDaysOff,
            TotalNonPaidDaysOff: employee.totalNonPaidDaysOff,
            SalaryPerDay: Math.floor(
              employee.salaryPerMonth / this.numWorkDays
            ),
            Total: Math.floor(
              employee.salaryPerMonth *
                (1 - employee.totalNonPaidDaysOff / this.numWorkDays)
            ),
          };
        });
        this.excelService.exportAsExcelFile(
          data,
          `Monthly Payroll ${this.selectedMonth}/${this.year}`
        );
      });
  }
}
