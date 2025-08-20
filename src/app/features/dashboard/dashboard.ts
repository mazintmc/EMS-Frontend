import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
    constructor(private authService: AuthService) {}
  
    ngOnInit() {
      this.authService.getUser().subscribe({
        next: (user) => {
          console.log('User is logged in:', user);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
    }
}
