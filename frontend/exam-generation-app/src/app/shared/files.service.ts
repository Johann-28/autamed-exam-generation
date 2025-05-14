import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private clearFilesSubject = new Subject<void>();
  // Observable that other components can subscribe to
  clearFiles$ = this.clearFilesSubject.asObservable();

  // Method to emit the event
  triggerClearFiles() {
    this.clearFilesSubject.next();
  }
}