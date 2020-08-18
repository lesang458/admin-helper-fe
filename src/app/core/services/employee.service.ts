import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getAllEmployee() {
    return this.http.get<any>(environment.APILink, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  }

  searchEmployee(searchStr: string, status: string) {
    let searchString = `search=${searchStr}`;
    return this.http.get<any>(
      `${environment.APILink}?${status !== '' ? 'status=' + status : ''}${
        searchString !== '' ? '&' + searchString : ''
      }`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  }
}
