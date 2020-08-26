import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { HttpParams } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProfileCreateComponent } from '../profile-create/profile-create.component';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl();
  public currentPage = 1;
  public searchStatusFormControl = new FormControl('');
  private sortVariable = {
    sortName: '',
    sortType: '',
  };

  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.employeeObs$ = this.store.select('employees');
    this.store.dispatch(
      new EmployeeActions.SearchEmployees(
        new HttpParams({ fromObject: { search: '' } })
      )
    );

    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.store.dispatch(
          new EmployeeActions.SearchEmployees(
            new HttpParams({ fromObject: this.setParams() })
          )
        );
      });
    this.searchStatusFormControl.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.store.dispatch(
        new EmployeeActions.SearchEmployees(
          new HttpParams({ fromObject: this.setParams() })
        )
      );
    });
  }

  private setParams(): any {
    let searchValue = this.searchFormControl.value;
    let statusValue = this.searchStatusFormControl.value;
    return Object.assign(
      searchValue !== '' && searchValue ? { search: searchValue } : {},
      statusValue !== '' ? { status: statusValue } : {},
      this.sortVariable.sortName !== ''
        ? {
            sort: `${this.sortVariable.sortName}:${this.sortVariable.sortType}`,
          }
        : {},
      { page: this.currentPage }
    );
  }

  public onSort(sortName: string): void {
    this.sortVariable =
      this.sortVariable.sortName !== sortName
        ? {
            sortName,
            sortType: 'DESC',
          }
        : {
            sortName,
            sortType: this.sortVariable.sortType === 'DESC' ? 'ASC' : 'DESC',
          };
    this.store.dispatch(
      new EmployeeActions.SearchEmployees(
        new HttpParams({ fromObject: this.setParams() })
      )
    );
  }

  public onPageChanged(page: number): void {
    const search = Object.assign(this.setParams(), { page });
    this.store.dispatch(
      new EmployeeActions.SearchEmployees(
        new HttpParams({ fromObject: search })
      )
    );
  }

  public openModalWithComponent(id?: any, type?: string) {
    const initialState = { id, type };
    this.bsModalRef = this.modalService.show(ProfileCreateComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
