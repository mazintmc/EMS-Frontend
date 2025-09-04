import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  private userState = signal<any>(null);

  patchUser(payload: any) {
    return this.http.patch(`http://localhost:8080/employees/update`, payload);
  }

  getSelf() {
    return this.http.get('http://localhost:8080/employees/me');
  }

  setEmployee(user: any) {
    this.userState.set(user);
  }

  getEmployee() {
    return this.userState();
  }
}
