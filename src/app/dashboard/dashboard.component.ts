import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
