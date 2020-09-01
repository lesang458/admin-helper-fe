import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[ah-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigateToGeneralListPage() {
    this.router.navigateByUrl('/thong-tin-chung');
  }

  public navigateToDayoffPage() {
    this.router.navigateByUrl('/nghi-phep');
  }

  public navigateToDayOffCategoriesPage() {
    this.router.navigateByUrl('ngay-nghi');
  }
}
