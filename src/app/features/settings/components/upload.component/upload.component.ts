import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() employeeId!: number;
  @Input() imageUrl!: string;

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  uploading: boolean = false;
  uploadedPath: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
  console.log('Input image: ', this.imageUrl);
    }, 600)
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFile = input.files[0];
    
    // Use URL.createObjectURL for immediate preview
    if (this.previewUrl && typeof this.previewUrl === 'string') {
      URL.revokeObjectURL(this.previewUrl);
    }
    
    this.previewUrl = URL.createObjectURL(this.selectedFile);
    

  }

  uploadImage() {
    if (!this.selectedFile || !this.employeeId) return;

    this.uploading = true;

    const formData = new FormData();
    formData.append('employeeId', String(this.employeeId));
    formData.append('file', this.selectedFile);

    this.http.post<any>(`http://localhost:8080/media/upload`, formData).subscribe({
      next: (res) => {
        console.log('Upload success', res);
        this.uploading = false;

        this.uploadedPath = res.media;

        // Update the bound image from backend response
          this.imageUrl = 'http://localhost:8080' + (this.uploadedPath ?? '');

        console.log(this.imageUrl, this.uploadedPath);
        // Reset temp state and revoke object URL
        if (this.previewUrl && typeof this.previewUrl === 'string') {
          URL.revokeObjectURL(this.previewUrl);
        }
        this.previewUrl = null;
        this.selectedFile = null;
        
        // Trigger change detection
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.uploading = false;
        this.cdr.detectChanges();
      },
    });
  }

  ngOnDestroy() {
    // Clean up object URLs to prevent memory leaks
    if (this.previewUrl && typeof this.previewUrl === 'string') {
      URL.revokeObjectURL(this.previewUrl);
    }
  }
}