import { TranslateService } from '@ngx-translate/core';
import * as DayOffActions from '../../store/dayoff-categories.actions';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'ah-dayoff-create-edit',
  templateUrl: './dayoff-category-edit.component.html',
  styleUrls: ['./dayoff-category-edit.component.scss'],
})
export class DayOffCategoryEditComponent implements OnInit {
  public type: string;
  public selectedCategory: DayOffCategory;
  public f = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    days: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(20),
    ]),
    description: new FormControl(null, Validators.minLength(6)),
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

  public onSubmit(): void {
    const category: DayOffCategory = {
      name: this.f.get('name').value.toUpperCase(),
      description: this.f.get('description').value
        ? this.f.get('description').value
        : null,
      totalHoursDefault: this.f.get('days').value * 8,
    };
    if (this.type === 'create') {
      this.store.dispatch(new DayOffActions.CreateDayOffCategory(category));
    }
    if (this.type === 'edit') {
      category.id = this.selectedCategory.id;
      this.store.dispatch(new DayOffActions.UpdateDayOffCategory(category));
    }
    if (this.type === 'delete') {
      this.store.dispatch(
        new DayOffActions.DeleteDayOffCategory(this.selectedCategory.id)
      );
    }
    this.bsModalRef.hide();
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
    if (this.f.get('name').errors.pattern) {
      return this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_PATTERN');
    }
    if (this.f.get('name').errors.maxlength) {
      return this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_MAXLENGTH');
    }
    return this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_MINLENGTH');
  }
}
