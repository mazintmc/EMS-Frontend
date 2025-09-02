import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureWrapper } from '../../components/feature-wrapper/feature-wrapper';
import { UploadComponent } from './components/upload.component/upload.component';
import { AuthService } from "../../core/auth/auth.service";
import { FormsModule, NgForm } from '@angular/forms';
import { SettingsService } from './services/settings.services';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FeatureWrapper, UploadComponent, FormsModule],
  providers: [SettingsService],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {
  user_id = signal(0);
  user_img = signal("./default-user.webp");

  activeTab: string = 'personal';
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: ''
  };

  constructor(private authService: AuthService, private settingsService: SettingsService) {}

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        this.user_id.set(user.employeeId);
        this.user_img.set(user.media ? `http://localhost:8080${user.media}` : './default-user.webp');

        // Pre-fill personal info
        this.formData.firstName = user.firstName || '';
        this.formData.lastName = user.lastName || '';
        this.formData.email = user.email || '';
        this.formData.phone = user.phone || '';
      },
      error: () => this.user_id.set(0)
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  saveChanges(form: NgForm) {
    if (!form.valid) return;

    let payload: any = {};

    if (this.activeTab === 'personal') {
      payload = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        phone: this.formData.phone
      };
    }

    if (this.activeTab === 'password') {
      payload = {
        oldPassword: this.formData.oldPassword,
        newPassword: this.formData.newPassword
      };
    }

    this.settingsService.patchUser(this.user_id(), payload).subscribe({
      next: res => console.log("Updated successfully:", res),
      error: err => console.error("Update failed:", err)
    });
  }
}
