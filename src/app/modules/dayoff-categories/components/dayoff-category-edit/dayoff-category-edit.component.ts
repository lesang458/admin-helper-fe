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
    hours: new FormControl('', [
      Validators.required,
      Validators.min(8),
      Validators.max(1440),
    ]),
    description: new FormControl(),
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
        hours: this.selectedCategory.totalHoursDefault,
        description: this.selectedCategory.description,
      });
    }
  }

  public onSubmit(): void {
    if (this.type === 'create') {
      this.store.dispatch(
        new DayOffActions.CreateDayOffCategory({
          name: this.f.get('name').value.toUpperCase(),
          description: this.f.get('description').value,
          totalHoursDefault: this.f.get('hours').value,
        })
      );
    }
    if (this.type === 'edit') {
      this.store.dispatch(
        new DayOffActions.UpdateDayOffCategory({
          id: this.selectedCategory.id,
          name: this.f.get('name').value.toUpperCase(),
          description: this.f.get('description').value,
          totalHoursDefault: this.f.get('hours').value,
        })
      );
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
        this.selectedCategory.totalHoursDefault === this.f.get('hours').value)
    );
  }

  public getNameErrorMessage(): string {
    return this.f.get('name').errors.required
      ? this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_REQUIRED')
      : this.f.get('name').errors.pattern
      ? this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_PATTERN')
      : this.f.get('name').errors.minlength
      ? this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_MINLENGTH')
      : this.translate.instant('DAY_OFF_CATEGORIES_PAGE.NAME_MAXLENGTH');
  }
}
