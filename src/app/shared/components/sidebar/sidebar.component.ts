import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesHistoryService } from 'src/app/core/services/devices-history.service';
import { RouteConstant } from 'src/app/shared/constants/route.constant';

@Component({
  selector: '[ah-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public deviceHistoryIsSelected: boolean;
  constructor(
    private router: Router,
    private devicesHistoryService: DevicesHistoryService
  ) {}

  ngOnInit(): void {
    this.devicesHistoryService.currentId.subscribe((id) => {
      this.deviceHistoryIsSelected = id !== -1;
    });
  }

  public navigateToGeneralListPage() {
    this.router.navigateByUrl(`/${RouteConstant.employees}`);
  }

  public navigateToDayoffPage() {
    this.router.navigateByUrl(`/${RouteConstant.dayOff}`);
  }

  public navigateToDevicePage() {
    this.router.navigateByUrl(`/${RouteConstant.devices}`);
  }

  public navigateToDayOffCategoriesPage() {
    this.router.navigateByUrl(`/${RouteConstant.dayOffCategories}`);
  }

  public navigateToDeviceHistory() {
    this.router.navigateByUrl(`/${RouteConstant.deviceHistory}`);
  }

  public navigateToDeviceCategoriesPage() {
    this.router.navigateByUrl(
      `/${RouteConstant.devices}/${RouteConstant.categories}`
    );
  }
}
