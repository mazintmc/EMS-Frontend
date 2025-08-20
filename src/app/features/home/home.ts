import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: "./home.html",
  styleUrl: "./home.scss"
})
export class Home implements OnInit {
  constructor(private authService: AuthService) {}

  title = 'Employee Management System';

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
