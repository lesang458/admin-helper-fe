import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CamelCaseHelper } from '../helper/camelCase.helper';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  public getAllEmployee(): Observable<any> {
    return this.http
      .get<any>(environment.APILink, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .pipe(
        map((val) => {
          return CamelCaseHelper.keysToCamel(val);
        })
      );
  }

  public searchEmployee(searchStr: string, status: string): Observable<any> {
    let params = new HttpParams().append('search', searchStr);
    if (status !== '') params = params.append('status', status);
    return this.http
      .get<any>(`${environment.APILink}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        params: params,
      })
      .pipe(
        map((val) => {
          return CamelCaseHelper.keysToCamel(val);
        })
      );
  }

  public sortEmployee(sortStr: string) {}
}
