import { Component, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnChanges {
  @Input({ required: true }) data: any;
  chart: any = null;

  ngOnChanges(): void {
    if (this.chart) this.chart.destroy();

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: this.data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
