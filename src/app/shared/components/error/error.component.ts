import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstant } from '../../constants/route.constant';

@Component({
  selector: 'ah-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  public currentURL: string;
  constructor(private router: Router) {
    this.currentURL = window.location.pathname;
  }

  ngOnInit(): void {}

  public onNavigateToHomePage(): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}`);
  }
}
