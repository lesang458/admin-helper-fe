import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/employees.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as EmployeesActions from './employees.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CamelCaseHelper } from 'src/app/core/helper/camelCase.helper';
import { PaginatedData } from 'src/app/shared/models/pagination.model';

@Injectable()
export class EmployeeEffects {
    @Effect()
    fetchDayOff = this.actions$.pipe(
        ofType(EmployeesActions.FETCH_DAY_OFF),
        switchMap((action: EmployeesActions.FetchDayOff) => {
            const params = new HttpParams()
                        .append('search', action.payload.search)
                        .append('page', action.payload.page);
            return this.http.get<PaginatedData<Employee[]>>(
                `${environment.APILink}/employees`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDIsInJvbGVzIjpbIkVNUExPWUVFIiwiQURNSU4iXSwiZXhwIjoxNTk3OTgwMzIyfQ.bF_vkoWK02C_1n1ilRCEChfEwpwLp_L7-zjSpRjSmPg',
                    },
                    observe: 'response',
                    params
                }
            ).pipe(
                map((response) => {
                    const value: any = CamelCaseHelper.keysToCamel(response.body);
                    const dayOff: PaginatedData<Employee[]> = {
                        data: value.data,
                        pagination: value.pagination
                    };
                    return new EmployeesActions.SetDayOff(dayOff);
                })
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient) {}
}
