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
import { SearchParams } from 'src/app/modules/employees/store/employees.actions';
import { INgxSelectOption } from 'ngx-select-ex';

@Component({
  selector: 'ah-dayoff-create-edit',
  templateUrl: './dayoff-category-edit.component.html',
  styleUrls: ['./dayoff-category-edit.component.scss'],
})
export class DayOffCategoryEditComponent implements OnInit {
  public items = [{ id: 1, name: 'abc' }];
  public type: string;
  public selectedCategory: DayOffCategory;
  public employeeObs = [];
  public arrEmpId = [];
  public paramEmployee: SearchParams;
  public textSearch = this.translate.instant(
    'DAY_OFF_CATEGORIES_PAGE.NO_RESULT'
  );
  public f = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    days: new FormControl('', [Validators.required, Validators.min(1)]),
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

  public changeOption(): void {
    this.store
      .select((s) => s.employees)
      .subscribe((data) => {
        data.employees.map((value) => {
          this.employeeObs.push({
            id: value.id,
            name: value.lastName + ' ' + value.firstName,
          });
        });
        this.paramEmployee = {
          search: '',
          status: 'ACTIVE',
          page: 1,
          perPage: 300,
          sort: {
            sortNameType: 0,
            sortBirthDateType: 0,
            sortJoinDateType: 0,
          },
        };
      });
    this.store.dispatch(
      new EmployeeActions.SearchEmployees(this.paramEmployee)
    );
  }

  public doSelectOptions(options: INgxSelectOption[]): void {
    options.length < this.arrEmpId.length ? (this.arrEmpId = []) : null;
    options.map((data) => {
      if (this.arrEmpId.indexOf(data.value) === -1) {
        this.arrEmpId.push(data.value);
      }
    });
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

  public onSubmit(): void {
    const category = { ...this.f.value };
    category.totalHoursDefault = this.f.value.days * 8;
    category.name = this.f.value.name.toUpperCase();
    if (this.f.value.applyForAllEmployees === 'true') {
      category.applyForAllEmployees = true;
    } else if (
      this.f.value.applyForAllEmployees === 'false' &&
      this.arrEmpId.length > 0
    ) {
      category.employeeIds = this.arrEmpId;
      delete category.applyForAllEmployees;
    } else {
      delete category.applyForAllEmployees;
      delete category.employeeIds;
    }
    delete category.days;
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
