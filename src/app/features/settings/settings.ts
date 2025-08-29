import { Component, OnInit, signal } from '@angular/core';
import { FeatureWrapper } from '../../components/feature-wrapper/feature-wrapper';
import { UploadComponent } from '../../components/upload.component/upload.component';
import { AuthService } from "../../core/auth/auth.service"

@Component({
  selector: 'app-settings',
  imports: [FeatureWrapper, UploadComponent],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {
  user_id = signal(0);
    constructor(private authService: AuthService) {}

    ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        console.log("User is: ", user);
        this.user_id.set(user.employeeId);
      },
      error: () => {
        this.user_id.set(0);
      }
    });
  }
}
