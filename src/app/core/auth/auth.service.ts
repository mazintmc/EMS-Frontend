import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private baseUrl = 'http://localhost:8080';

  constructor( private http: HttpClient) { }

private userData: any = null;
getUser(): Observable<any> {
  return this.http.get(`${this.baseUrl}/api/auth/test`, {
    responseType: 'text'
  }).pipe(
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
}