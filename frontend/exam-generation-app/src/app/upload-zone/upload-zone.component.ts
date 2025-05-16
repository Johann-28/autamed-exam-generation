import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import {
  FileRemoveEvent,
  FileSelectEvent,
  FileUpload,
  UploadEvent,
} from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { FilesService } from '../shared/files.service';

@Component({
  selector: 'app-upload-zone',
  standalone: true,
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.scss'],
  imports: [FileUpload, ToastModule, CommonModule, ProgressBarModule],
  providers: [MessageService],
})
export class UploadZoneComponent {
  protected files: File[] = [];
  protected uploadedFiles: any[] = [];
  maxFileSize: number = 15000000; // 15MB
  totalSize: number = 0;
  totalSizePercent: number = 0;

  // Output variables to emit the state of filesSelected and the list of files
  @Output() filesSelectedChange = new EventEmitter<boolean>();
  @Output() filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor(
    private config: PrimeNG,
    private messageService: MessageService,
    private filesService : FilesService
  ) {
    this.filesService.clearFiles$.subscribe(() => {
      this.clearFiles();
    });
  }

  choose(event: any, callback: () => void) {
    callback();
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedFiles = input.files;
    if (selectedFiles && selectedFiles.length > 0) {
      this.files = Array.from(selectedFiles);
    } else {
      this.files = [];
    }
    console.log('Selected files:', this.files);
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    const hasFiles = this.uploadedFiles.length > 0;
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    this.filesChange.emit(this.uploadedFiles);
    this.filesSelectedChange.emit(hasFiles);
  }

  onClearTemplatingUpload(clear: any) {
    console.log('Clearing files');
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onSelectedFiles(event: FileSelectEvent) {
    this.files = event.currentFiles;
    this.updateTotalSize();
  }

  onRemoveFile(evento: FileRemoveEvent) {
    this.files = this.files.filter((file) => file !== evento.file);
    this.updateTotalSize();
  }

  clearFiles() {
    this.uploadedFiles = [];
    this.files = [];
  }

  updateTotalSize() {
    this.totalSize = this.files.reduce((acc, file) => acc + file.size, 0);
    this.totalSizePercent = (this.totalSize / this.maxFileSize) * 100;
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes ?? [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
    ];
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}
