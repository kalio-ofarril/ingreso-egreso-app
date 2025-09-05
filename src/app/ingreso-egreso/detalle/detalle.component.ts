import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { IngersoEgresoService } from '../../services/ingerso-egreso.service';
import { OrdenIngresoPipe } from "../../pipes/orden-ingreso.pipe";

@Component({
  selector: 'app-detalle',
  imports: [NgForOf, CurrencyPipe, OrdenIngresoPipe],
  templateUrl: './detalle.component.html',
  styles: ``,
})
export class DetalleComponent {
  private store = inject(Store);
  private ingresoEgresoService = inject(IngersoEgresoService);

  ingresosEgresos: IngresoEgreso[] = [];

  constructor() {
    this.store
      .select('items')
      .pipe(takeUntilDestroyed())
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  borrar(id: string) {
    console.log(id);
    this.ingresoEgresoService
      .borrarIngresoEgreso(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
