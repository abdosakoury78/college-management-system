import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSidebarOpen = false;
  loginService = inject(LoginService);
  router = inject(Router);

  logout() {
    this.loginService.isLogged = false;
  }

  toggleSidebar(dashboard: any, xmark : any) {
    if (this.isSidebarOpen) {
      dashboard.classList.remove('open');
      xmark.style.display = "none";
    } else {
      dashboard.classList.add('open');
      xmark.style.display = "block";
    }
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
