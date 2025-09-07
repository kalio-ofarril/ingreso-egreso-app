import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

// ✅ ng2-charts + chart.js imports
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  registerables,
} from 'chart.js';
Chart.register(...registerables); // register controllers once

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './estadistica.component.html',
})
export class EstadisticaComponent {
  private store = inject(Store);

  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0;

  constructor() {
    this.store
      .select('items')
      .pipe(takeUntilDestroyed())
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    // reset counts/totals each emission
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;

    for (const item of items ?? []) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
  }

  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
      { data: [50, 150, 120] },
      { data: [250, 130, 70] },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
