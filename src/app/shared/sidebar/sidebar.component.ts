import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout().then((res) => this.router.navigate(['/login']));
  }
}
