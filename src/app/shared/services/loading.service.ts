import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class LoadingService {
  public loading = new BehaviorSubject<boolean>(false);
  public setLoading(value: boolean): void {
    this.loading.next(value);
  }
}
