import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SearchParams } from '../../store/employees.actions';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { Router } from '@angular/router';
import { StatusConfirmComponent } from '../status-confirm/status-confirm.component';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl('');
  public currentPage = 1;
  private currentSearch = '';
  public searchStatusFormControl = new FormControl('');
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public sortJoinDateType = 0;
  public searchParams: SearchParams;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeObs$ = this.store.select('employees');
    this.onPageChanged(1);

    this.searchStatusFormControl.valueChanges.subscribe(() => {
      this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
    });
  }

  public onSort(page: number, column: string): void {
    if (column === 'name') {
      this.sortNameType =
        this.sortNameType === 0 ? 1 : this.sortNameType === 1 ? 2 : 1;
      this.sortBirthDateType = 0;
      this.sortJoinDateType = 0;
    } else if (column === 'birthdate') {
      this.sortBirthDateType =
        this.sortBirthDateType === 0 ? 1 : this.sortBirthDateType === 1 ? 2 : 1;
      this.sortNameType = 0;
      this.sortJoinDateType = 0;
    } else {
      this.sortJoinDateType =
        this.sortJoinDateType === 0 ? 1 : this.sortJoinDateType === 1 ? 2 : 1;
      this.sortNameType = 0;
      this.sortBirthDateType = 0;
    }
    this.onPageChanged(page);
  }

  public onPageChanged(page: number): void {
    const search = this.searchFormControl.value;
    const status = this.searchStatusFormControl.value;
    this.searchParams = {
      search,
      page,
      perPage: 10,
      sort: {
        sortNameType: this.sortNameType,
        sortBirthDateType: this.sortBirthDateType,
        sortJoinDateType: this.sortJoinDateType,
      },
      status,
    };
    this.store.dispatch(new EmployeeActions.SearchEmployees(this.searchParams));
  }

  public openModalWithComponent(
    id?: number,
    type?: string,
    refresh?: SearchParams
  ) {
    const initialState = { id, type, refresh };
    this.bsModalRef = this.modalService.show(StatusConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public navigateEdit(id: number): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}/${id}/edit`);
  }

  public navigateCreate(): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}/create`);
  }

  public onSearchSubmit(): void {
    if (
      this.currentSearch !== this.searchFormControl.value.replace(/\s/g, '')
    ) {
      this.currentSearch = this.searchFormControl.value.replace(/\s/g, '');
      this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
    }
  }
}
