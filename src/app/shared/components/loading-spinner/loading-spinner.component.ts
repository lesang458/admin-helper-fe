import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'ah-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  public loading: boolean;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading.subscribe((val) => {
      this.loading = val;
    });
  }
}
