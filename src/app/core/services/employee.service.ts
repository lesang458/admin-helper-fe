import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getAllEmployee() {
    return this.http.get<any>(
      'https://admin-helper-backend.herokuapp.com/api/v1/employees',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDIsInJvbGVzIjpbIkVNUExPWUVFIiwiQURNSU4iXSwiZXhwIjoxNTk3ODA1NzExfQ.LlQ2P7KGtPfqqOsZFqcPiWHxUbJ_hOCFEPRxPG6ipZ0',
        },
      }
    );
  }

  searchEmployee(searchStr: string, status: string) {
    let searchString = `search=${searchStr}`;
    return this.http.get<any>(
      `https://admin-helper-backend.herokuapp.com/api/v1/employees?${
        status !== '' ? 'status=' + status : ''
      }${searchString !== '' ? '&' + searchString : ''}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDIsInJvbGVzIjpbIkVNUExPWUVFIiwiQURNSU4iXSwiZXhwIjoxNTk3ODA1NzExfQ.LlQ2P7KGtPfqqOsZFqcPiWHxUbJ_hOCFEPRxPG6ipZ0',
        },
      }
    );
  }
}
