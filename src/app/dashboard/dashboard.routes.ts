import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { provideState } from '@ngrx/store';
import { ingresoEgresoReducer } from '../ingreso-egreso/ingreso-egreso.reducer';

export const dashboardRoutes: Routes = [
  {
    path: '',
    providers: [provideState({ name: 'items', reducer: ingresoEgresoReducer })],
    children: [
      {
        path: '',
        component: EstadisticaComponent,
      },
      {
        path: 'ingreso-egreso',
        component: IngresoEgresoComponent,
      },
      {
        path: 'detalle',
        component: DetalleComponent,
      },
    ],
  },
];
