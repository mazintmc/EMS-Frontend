import { Component, OnInit, signal, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {Router, NavigationEnd} from '@angular/router'
import { CommonModule } from '@angular/common';
import { FeatureWrapper } from '../../components/feature-wrapper/feature-wrapper';
import { UploadComponent } from './components/upload.component/upload.component';
import { AuthService } from "../../core/auth/auth.service";
import { FormsModule, NgForm } from '@angular/forms';
import { SettingsService } from './services/settings.services';
import e from 'express';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FeatureWrapper, UploadComponent, FormsModule],
  providers: [SettingsService],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings implements OnInit {
  private routerSub!: Subscription;
  user_id = signal(0);
  user_img = signal("./default-user.webp");
  showLogoutModal: boolean = false;

  activeTab: string = 'personal';

  // Initialize formData which will be altered
  formData = {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    oldPassword: '',
    newPassword: ''
  };

  // Initial form not to be changed
  initialFormData = {};

  // Initialize user info for API data.
  empName: string = '';
  department: string = '';
  designationTitle: string = '';
  designationLevel: number = 0;

  constructor(
    private authService: AuthService, 
    private settingsService: SettingsService, 
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initData();

    // Subscribe to router events so it runs again on navigation
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('/settings')) {
        this.initData();
      }
    });
  }

  private initData() {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        this.user_id.set(user.employeeId);
        this.user_img.set(user.media ? `http://localhost:8080${user.media}` : './default-user.webp');
      },
      error: () => this.user_id.set(0)
    });

    const cached = this.settingsService.getEmployee();
    if (cached) {
      this.applyUser(cached);
    } else {
      this.settingsService.getSelf().subscribe({
        next: (user: any) => {
          this.applyUser(user);
          this.settingsService.setEmployee(user);
        }
      });
    }
  }

  private applyUser(user: any) {
  this.formData = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    address: user.address || '',
    phone: user.phone || '',
    email: user.email || '',
    oldPassword: '',
    newPassword: ''
  };

  this.department = user.department?.departmentName || '';
  this.designationTitle = user.designation?.title || '';
  this.designationLevel = user.designation?.level || 0;
  this.empName = user.firstName + ' ' + user.lastName;
  this.initialFormData = { ...this.formData };

   this.cd.detectChanges();
}

  setTab() {
    if(this.activeTab === 'personal') {
      this.activeTab = 'password';
      this.closeTabModal();
    } else {
      this.activeTab = 'personal';
      this.closeTabModal();  
    }
  }

  isPersonalDataChanged(): boolean {
    return JSON.stringify(this.formData) !== JSON.stringify(this.initialFormData);
  }
  isFormValid(): boolean {
  if (this.activeTab === 'personal') {
    return (
      !!this.formData.firstName &&
      !!this.formData.lastName &&
      !!this.formData.email &&
      !!this.formData.phone &&
      !!this.formData.address &&
      this.isPersonalDataChanged()
    );
  }

  if (this.activeTab === 'password') {
    return (
      !!this.formData.oldPassword &&
      !!this.formData.newPassword &&
      this.formData.newPassword.length >= 6
    );
  }

  return false;
}

  saveChanges(form: NgForm) {
  if (!form.valid) return;

  let payload: any = {};

  if (this.activeTab === 'personal') {
    payload = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      address: this.formData.address,
      phone: this.formData.phone,
      email: this.formData.email
    };
  }

  if (this.activeTab === 'password') {
    payload = {
      oldPassword: this.formData.oldPassword,
      newPassword: this.formData.newPassword
    };
  }

  this.settingsService.patchUser(payload).subscribe({
    next: (res: any) => {
      // Update both formData and initialFormData to match the latest state
      if (this.activeTab === 'personal') {
        this.formData = {
          ...this.formData,
          ...res,            // in case backend normalizes values
          oldPassword: '',
          newPassword: ''
        };
        this.initialFormData = { ...this.formData };
      }

      if (this.activeTab === 'password') {
        // Clear only password fields after successful update
        this.formData.oldPassword = '';
        this.formData.newPassword = '';
      }

      // Force Angular to re-check bindings
      this.cd.detectChanges();

      console.log("Initial form data after changes: ", this.initialFormData);
      console.log("Form data at the time of submission: ", this.formData);
    },
    error: err => console.error("Update failed:", err)
  });
}
openTabModal(activeTab: string) {
  if(!this.isFormValid()) {
    console.log("Form is invalid");
  }
  this.showLogoutModal = true;
}
closeTabModal() {
  this.showLogoutModal = false;
}
}
