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

  searchEmployee() {
    return this.http.get<any>(environment.APILink, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  }
}
