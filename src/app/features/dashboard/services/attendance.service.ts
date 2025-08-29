import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceStatus } from '../models/attendance-status.model';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private apiUrl = 'http://localhost:8080/attendance';

  constructor(private http: HttpClient) {}

  getStatus(): Observable<AttendanceStatus> {
    return this.http.get<AttendanceStatus>(`${this.apiUrl}/status`);
  }

  clockIn(): Observable<any> {
    const now = new Date();
    return this.http.post(`${this.apiUrl}/time-in`, {
    date: now.toISOString().split("T")[0],         
    timeIn: now.toISOString().split("T")[1].split("Z")[0],
    status: "CLOCKED_IN"
    });
  }

  clockOut(): Observable<any> {
    const now = new Date();
    return this.http.patch(`${this.apiUrl}/time-out`, {
      date: now.toISOString().split("T")[0],
      timeOut: now.toISOString().split("T")[1].split("Z")[0],
      status: "PRESENT"
    });
  }
}
