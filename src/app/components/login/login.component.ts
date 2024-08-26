import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login().subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Login failed');
      }
    );
  }
  
  redirectToExternalUrl() {
    window.location.href = this.authService.getLoginUrl(); 
  }
}