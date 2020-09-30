import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DevicesHistoryService } from 'src/app/core/services/devices-history.service';
import { TitleService } from 'src/app/core/services/title.service';
import { RouteConstant } from 'src/app/shared/constants/route.constant';

@Component({
  selector: '[ah-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public deviceHistoryIsSelected: boolean;
  public employeesUrl = `/${RouteConstant.employees}`;
  public dayOffUrl = `/${RouteConstant.dayOff}`;
  public devicesUrl = `/${RouteConstant.devices}`;
  public dayOffCategoriesUrl = `/${RouteConstant.dayOffCategories}`;
  public deviceCategoriesUrl = `/${RouteConstant.devices}/${RouteConstant.categories}`;
  public deviceHistoryUrl = `/${RouteConstant.deviceHistory}`;
  public isMinimized: boolean;
  public subscription: Subscription;
  constructor(
    public router: Router,
    private devicesHistoryService: DevicesHistoryService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.devicesHistoryService.currentId.subscribe((id) => {
      this.deviceHistoryIsSelected = id !== -1;
    });
    this.subscription = this.titleService.isMinimized.subscribe(
      (isMinimized) => {
        this.isMinimized = isMinimized;
      }
    );
  }

  public navigateToGeneralListPage() {
    this.router.navigateByUrl(this.employeesUrl);
  }

  public navigateToDayoffPage() {
    this.router.navigateByUrl(this.dayOffUrl);
  }

  public navigateToDevicePage() {
    this.router.navigateByUrl(this.devicesUrl);
  }

  public navigateToDayOffCategoriesPage() {
    this.router.navigateByUrl(this.dayOffCategoriesUrl);
  }

  public navigateToDeviceHistory() {
    this.router.navigateByUrl(this.deviceHistoryUrl);
  }

  public navigateToDeviceCategoriesPage() {
    this.router.navigateByUrl(this.deviceCategoriesUrl);
  }

  public onMinimized(): void {
    this.titleService.isMinimized.next(!this.isMinimized);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
