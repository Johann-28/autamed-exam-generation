import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
    private apiUrl = 'http://localhost:8000/questions';

  constructor(private http: HttpClient) {}

  getAllExams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/exams`);
  }

  getExamById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exams/${id}`);
  }

  saveExam(exam: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save_exam`, exam);
  }

  deleteExam(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/exams/${id}`);
  }

  createGoogleForm(exam: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-google-form`, exam);
  }
}