import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);

  nombre!: string;

  constructor() {
    this.store
      .select('user')
      .pipe(
        takeUntilDestroyed(),
        filter(({ user }) => user != null)
      )
      .subscribe(({ user }) => {
        this.nombre = user.nombre;
      });
  }

  logout() {
    this.authService.logout().then((res) => this.router.navigate(['/login']));
  }
}
