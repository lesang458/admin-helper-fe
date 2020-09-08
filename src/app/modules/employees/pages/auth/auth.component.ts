import { TitleService } from './../../../../core/services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setTitle('LOGIN');
  }
}
