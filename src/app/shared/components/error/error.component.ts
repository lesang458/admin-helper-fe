import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  public currentURL: string;
  constructor() {
    this.currentURL = window.location.pathname;
  }

  ngOnInit(): void {}
}
