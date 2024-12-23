import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formData : any;
  errorMes : any;
  isError = false;
  http = inject(HttpClient);
  router = inject(Router);
  loginService = inject(LoginService);
  users : any[] = [];

  onSubmit(event : any, email : any, password : any) {
    event.preventDefault();
    this.formData = new FormData(event.target);
    // console.log("before admin");
    if(this.formData.get('email') !== "" && this.formData.get("password") !== "") {
      if(this.formData.get('email') === "admin") {
        this.http
        .post('http://computerenginners-hu.runasp.net/api/Admins/Search', {
          userName: this.formData.get('email'),
          password: this.formData.get("password"),
        }).subscribe({
          next: (res: any) => {
          console.log('Admin login successful:', res);
          this.loginService.isAdmin = true;
          this.loginService.isStudent = false;
          this.loginService.isLogged = true;
          this.router.navigate(['/dashboard']);
          email.value = "";
          password.value = "";
          this.isError = false;
          },
          error: (err) => {
            console.error('Admin login failed:', err);
            this.errorMes = 'Admin credentials are incorrect.';
            this.isError = true;
          },
        });
      }
      else {
        console.log("else");
          for(let user of this.users) {
            // console.log("for");
          if(user.email === this.formData.get('email') && user.password === this.formData.get('password')) {
            this.loginService.isAdmin = false;
            this.loginService.isStudent = true;
            this.loginService.isLogged = true;
            this.loginService.student = user;
            this.router.navigate(['/dashboard']);
            email.value = "";
            password.value = "";
            this.isError = false;
            break;
          } else {
            console.log("error");
            this.errorMes = "Wrong in email or password.";
            this.isError = true;
          }
        }
      }
    }
  }

  fetchData() {
    this.http.get('http://computerenginners-hu.runasp.net/api/Students').subscribe({
      next: (data: any) => {
        this.users = data.data as any[];
        console.log('Fetched users:', data);
        console.log('Products array:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
