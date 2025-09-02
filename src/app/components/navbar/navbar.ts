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
   userImg = signal('/default-user.webp');
  constructor(private authService: AuthService) {}

    ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        this.userName.set(user.name);
        if (user.media) {
          this.userImg.set(`http://localhost:8080${user.media}`);
        }
      },
      error: () => {
        this.userName.set('User');
      }
    });
  }
}
