import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {
  isCollapsed = false;
  userName = signal('User');
  userImg = signal('/default-user.webp');
  showLogoutModal = false;

  constructor(private authService: AuthService, private router: Router) {}

  // called when user confirms logout
  confirmLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log("Logged out successfully");
        this.authService.setUser(null);
        this.router.navigate(['/login']);
        this.showLogoutModal = false;
      },
      error: () => {
        console.error("Logout failed");
        this.showLogoutModal = false;
      }
    });
  }

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        console.log("User is: ", user);
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

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    document.body.classList.toggle('sidebar-collapsed', this.isCollapsed);
  }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }
}
