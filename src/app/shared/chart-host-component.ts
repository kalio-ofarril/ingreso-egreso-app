// For a standalone component
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-host',
  standalone: true,
  imports: [BaseChartDirective], // 👈 import the directive
  template: ` <canvas baseChart [data]="data" [type]="'bar'"> </canvas> `,
})
export class ChartHostComponent {
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  data: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
      { data: [50, 150, 120] },
      { data: [250, 130, 70] },
    ],
  };
}
