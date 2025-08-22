export interface AttendanceStatus {
  status: 'CLOCKED_IN' | 'CLOCKED_IN_AND_OUT' | 'NO_ATTENDANCE_RECORD';
  message: string;
}
