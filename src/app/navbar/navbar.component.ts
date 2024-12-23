import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loginService = inject(LoginService);
}
