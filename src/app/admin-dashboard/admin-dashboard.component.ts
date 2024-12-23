import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  today = new Date();
  formattedDate = this.today.toISOString().split('T')[0];
  http = inject(HttpClient);
  products : any[] = [];
  loginServic = inject(LoginService);
  fetchData() {
    this.http.get('http://computerenginners-hu.runasp.net/api/Students').subscribe({
      next: (data: any) => {
        this.products = data as any[];
        console.log(this.products); // Products are logged here
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}