import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';


@Injectable()
export class QuestionService {
    private dataUrl = 'http://127.0.0.1:8000/questions';

    constructor(public http: HttpClient) {}

getQuestions(formData: FormData): Observable<Question[]> {
  return this.http.post<Question[]>(this.dataUrl, formData);
}   

createGoogleForm(): Observable<any> {
  console.log('Creating Google Form with questions:');
  return this.http.get<any>(this.dataUrl + '/create-google-form');
}
}
