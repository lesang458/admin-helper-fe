import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DevicesHistoryService {
  public deviceId = new BehaviorSubject<number>(-1);
  public currentId = this.deviceId.asObservable();
  constructor() {}

  public isSelected(): boolean {
    return this.deviceId.value !== -1;
  }

  public setCurrentId(id: number): void {
    this.deviceId.next(id);
  }

  public getCurrentId(): number {
    return this.deviceId.value
  }
}
