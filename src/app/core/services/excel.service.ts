import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/shared/models/employees.model';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import * as camelcaseKeys from 'camelcase-keys';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  constructor(private http: HttpClient) {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public getData(month: Date): Observable<Employee[]> {
    const params = new HttpParams()
      .append('status', 'ACTIVE')
      .append('page', '-1')
      .append('full_info', 'true')
      .append('month', month.toDateString());
    return this.http
      .get<PaginatedData<Employee[]>>(`${environment.APILink}/employees`, {
        params,
      })
      .pipe(map((result) => camelcaseKeys(result.data, { deep: true })));
  }
}
