import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-zone',
  standalone: true,
  imports: [],
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.scss']
})
export class UploadZoneComponent {
  protected files: File[] = [];

  // Output variables to emit the state of filesSelected and the list of files
  @Output() filesSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  onFilesSelected(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      this.files = Array.from(selectedFiles); 
    } else {
      this.files = []; 
    }
    console.log('Selected files:', this.files);
  }

  // Emit the output variables to the parent component
  loadContent() {
    const hasFiles = this.files.length > 0;
    this.filesChange.emit(this.files);
    this.filesSelectedChange.emit(hasFiles); 
  }
}