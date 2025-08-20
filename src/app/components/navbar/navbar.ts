import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

   userName = signal('User');
  constructor(private authService: AuthService) {}

    ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        console.log("User is: ", user.roles);
        this.userName.set(user.name);
      },
      error: () => {
        this.userName.set('User');
      }
    });
  }
}
