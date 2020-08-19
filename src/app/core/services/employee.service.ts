import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  public getAllEmployee() {
    return this.http.get<any>(environment.APILink, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  }

  public searchEmployee(searchStr: string, status: string) {
    let params = new HttpParams();
    if (status !== '') params = params.append('status', status);
    params = params.append('search', searchStr);
    return this.http.get<any>(`${environment.APILink}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      params: params,
    });
  }
}
