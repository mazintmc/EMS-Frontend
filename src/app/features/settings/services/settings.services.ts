import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingsService {
  constructor(private http: HttpClient) {}

  patchUser(userId: number, payload: any) {
    return this.http.patch(`/api/users/${userId}`, payload);
  }
}
