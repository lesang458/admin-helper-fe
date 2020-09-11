import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesHistoryService } from 'src/app/core/services/devices-history.service';

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
    this.router.navigateByUrl('/thong-tin-chung');
  }

  public navigateToDayoffPage() {
    this.router.navigateByUrl('/nghi-phep');
  }

  public navigateToDevicePage() {
    this.router.navigateByUrl('/thiet-bi');
  }

  public navigateToDayOffCategoriesPage() {
    this.router.navigateByUrl('/loai-ngay-phep');
  }

  public navigateToDeviceHistory() {
    this.router.navigateByUrl('/lich-su-thiet-bi');
  }
}
