import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  selectedFile: File | null = null;

  @Input() employeeId!: number;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage() {
    if (!this.selectedFile || !this.employeeId) return;

    const formData = new FormData();
    formData.append('employeeId', String(this.employeeId)); // cast to string
    formData.append('file', this.selectedFile);

    this.http.post(`http://localhost:8080/media/upload`, formData).subscribe({
      next: (res) => console.log('Upload success', res),
      error: (err) => console.error('Upload failed', err),
    });
  }
}
