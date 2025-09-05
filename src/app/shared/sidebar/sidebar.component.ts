import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
      .pipe(takeUntilDestroyed())
      .subscribe(({user}) => {
        console.log(user)
        console.log(user.nombre)
        this.nombre = user.nombre;
      });
  }

  logout() {
    this.authService.logout().then((res) => this.router.navigate(['/login']));
  }
}
