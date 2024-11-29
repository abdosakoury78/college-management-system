import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSidebarOpen = false;

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
