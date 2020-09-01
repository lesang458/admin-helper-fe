import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  public loading = new Subject<boolean>();
  public setLoading(value: boolean): void {
    this.loading.next(value);
  }
}
