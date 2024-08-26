import { Component } from '@angular/core';
import { SharedComponent } from '../shared.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends SharedComponent {
  
  constructor(
      public override router: Router,
      public override authService: AuthService
  ) {
    super(router, authService);
  }
}
