import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  @Input({ required: true }) data: any;
  chart: any = null;

  ngOnInit(): void {
    console.log(this.data);

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
