import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private userData: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.http.post(`${this.baseUrl}/api/auth/login`, payload, {
      responseType: 'text',
    });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees/role`).pipe(
      tap((user) => this.setUser(user))
    );
  }

  isLoggedIn(): boolean {
    return this.userData !== null;
  }

  getUserRole(): string | null {
    return this.userData?.role || null;
  }

  setUser(data: any) {
    this.userData = data;
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/auth/logout`, {}).pipe(
      tap(() => {
        this.userData = null;
      })
    );  
  }
}