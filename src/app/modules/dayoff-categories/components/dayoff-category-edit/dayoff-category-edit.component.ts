import { TranslateService } from '@ngx-translate/core';
import * as DayOffActions from '../../store/dayoff-categories.actions';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../../employees/store/employees.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import { TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SearchParams } from 'src/app/modules/employees/store/employees.actions';

@Component({
  selector: 'ah-dayoff-create-edit',
  templateUrl: './dayoff-category-edit.component.html',
  styleUrls: ['./dayoff-category-edit.component.scss'],
})
export class DayOffCategoryEditComponent implements OnInit {
  public type: string;
  public selectedCategory: DayOffCategory;
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl('');
  public arrEmpId = [];
  public currentPage = 1;
  private currentSearch = '';
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public sortJoinDateType = 0;
  public paramEmployee: SearchParams;
  public f = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    days: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(20),
    ]),
    description: new FormControl(null, Validators.minLength(6)),
    applyForAllEmployees: new FormControl(''),
  });
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef,
    private titleCasePipe: TitleCasePipe,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (this.type === 'edit') {
      this.f.patchValue({
        name: this.titleCasePipe.transform(this.selectedCategory.name),
        days: this.selectedCategory.totalHoursDefault / 8,
        description: this.selectedCategory.description,
      });
    }
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

  public changeOption(): void {
    this.employeeObs$ = this.store.select('employees');
    this.onPageChanged(1);
  }

  public changeApplyEmp(event, id: number): void {
    if (event.target.checked) {
      this.arrEmpId.push(id);
    } else {
      const index = this.arrEmpId.indexOf(id);
      this.arrEmpId.splice(index, 1);
    }
  }

  public checkChange(): boolean {
    return (
      !this.f.valid ||
      (this.selectedCategory?.name.toLowerCase() ===
        this.f.get('name').value.toLowerCase() &&
        this.selectedCategory?.description?.toLowerCase() ===
          this.f.get('description').value?.toLowerCase() &&
        this.selectedCategory.totalHoursDefault ===
          this.f.get('days').value * 8)
    );
  }

  public getNameErrorMessage(): string {
    if (this.f.get('name').errors.required) {
      return this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_REQUIRED');
    }
    if (this.f.get('name').errors.maxlength) {
      return this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_MAXLENGTH');
    }
    return this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_MINLENGTH');
  }

  public onSearchSubmit(): void {
    if (
      this.currentSearch !== this.searchFormControl.value.replace(/\s/g, '')
    ) {
      this.currentSearch = this.searchFormControl.value.replace(/\s/g, '');
      this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
    }
  }

  public onSubmit(): void {
    const category = { ...this.f.value };
    category.totalHoursDefault = this.f.value.days * 8;
    category.name = this.f.value.name.toUpperCase();
    if (this.f.value.applyForAllEmployees === 'true') {
      category.applyForAllEmployees = true;
    } else {
      category.employeeIds = this.arrEmpId;
      delete category.applyForAllEmployees;
    }
    delete category.days;
    if (!this.f.value.applyForAllEmployees && this.arrEmpId.length === 0) {
      delete category.applyForAllEmployees;
      delete category.employeeIds;
    }
    if (this.type === 'create') {
      this.store.dispatch(new DayOffActions.CreateDayOffCategory(category));
    }
    if (this.type === 'edit') {
      category.id = this.selectedCategory.id;
      this.store.dispatch(new DayOffActions.UpdateDayOffCategory(category));
    }
    this.bsModalRef.hide();
  }
}
