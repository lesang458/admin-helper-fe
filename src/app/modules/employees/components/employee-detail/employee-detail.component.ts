import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { Employee } from 'src/app/shared/models/employees.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as DevicesActions from '../../../devices/store/devices.actions';
import { SearchDevice } from '../../../devices/store/devices.actions';
import { Observable } from 'rxjs';
import { State } from '../../../devices/store/devices.reducer';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestDayOffComponent } from '../request-day-off/request-day-off.component';

@Component({
  selector: 'ah-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public employee: Employee;
  public searchParams: SearchDevice;
  public device$: Observable<State>;
  public id: number;
  public dayOffForm = new FormGroup({
    dayOffInfos: this.formBuilder.array([]),
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public translateService: TranslateService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.store.dispatch(new EmployeeActions.DetailEmployee(this.id));
    this.store
      .select((s) => s.employees.detaiEmployee)
      .subscribe((data: Employee) => {
        if (data) {
          this.employee = data;
          this.dayOffForm = new FormGroup({
            dayOffInfos: this.formBuilder.array(
              data?.dayOffInfos?.map((value) =>
                this.formBuilder.group({
                  availableHours: value.availableHours / 8,
                  categoryName: value.categoryName,
                  dayOffCategoryId: value.dayOffCategoryId,
                  hours: [
                    {
                      value: value.hours / 8,
                      disabled: true,
                    },
                  ],
                })
              )
            ),
          });
        }
      });
    this.device$ = this.store.select('devices');
    this.searchParams = {
      status: 'ASSIGNED',
      userId: this.id,
    };

    this.store.dispatch(new DevicesActions.FetchDevices(this.searchParams));
  }

  public navigateEdit(bl?: boolean): void {
    this.router.navigateByUrl(
      `/${RouteConstant.employees}/${this.id}/edit${bl ? '?dayoff=true' : ''}`
    );
  }

  get dayOffInfos(): FormArray {
    return this.dayOffForm.get('dayOffInfos') as FormArray;
  }

  public openModalWithComponent(selectedEmployee, searchParams): void {
    const initialState = { selectedEmployee, searchParams };
    this.bsModalRef = this.modalService.show(RequestDayOffComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
