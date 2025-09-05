import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { IngersoEgresoService } from '../services/ingerso-egreso.service';
import { setItems, unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent {
  private store = inject(Store);
  private ingresoEgresoService = inject(IngersoEgresoService);

  constructor() {
    this.store
      .select('user')
      .pipe(
        // keep only the uid (or null)
        map((s) => s.user?.uid ?? null),
        // only react when the uid actually changes (login/logout)
        distinctUntilChanged(),

        // switch to the correct stream for the current uid
        switchMap((uid) => {
          if (!uid) {
            // logged out: clear items and stop emitting
            this.store.dispatch(unSetItems());
            return of({ uid: null as string | null, rows: [] as any[] });
          }
          // logged in: start the items stream for this uid
          return this.ingresoEgresoService
            .initIngresosEgresosListener(uid) // Observable<any[]>
            .pipe(map((rows) => ({ uid, rows })));
        }),

        takeUntilDestroyed()
      )
      .subscribe(({ uid, rows }) => {
        if (!uid) return; // we already dispatched unSetItems above
        this.store.dispatch(
          setItems({
            items: rows.map(
              (r) =>
                // inject the current uid (docs don't include it)
                new IngresoEgreso(r.descripcion, r.monto, r.tipo, r.id)
            ),
          })
        );
      });
  }
}
