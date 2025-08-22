import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { AttendanceStatus } from '../../models/attendance-status.model';

@Component({
  selector: 'app-attendance-widget',
  templateUrl: './attendance-widget.component.html',
  styleUrls: ['./attendance-widget.component.scss']
})
export class AttendanceWidgetComponent implements OnInit {
  status: AttendanceStatus | null = null;
  loading = true;

  constructor(private attendanceService: AttendanceService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadStatus();
  }

  loadStatus() {
    this.attendanceService.getStatus().subscribe(status => {
      this.status = status;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  clockIn() {
    this.loading = true;
    this.attendanceService.clockIn().subscribe(() => this.loadStatus());
  }

  clockOut() {
    this.loading = true;
    this.attendanceService.clockOut().subscribe(() => this.loadStatus());
  }
}
