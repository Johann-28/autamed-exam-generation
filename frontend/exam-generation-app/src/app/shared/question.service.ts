import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, Subject } from 'rxjs';
import { Question } from '../models/question';
import { Answer } from '../models/anwer';
import { KeyTopics } from '../models/key-topics';
import { Exam } from '../models/exam';


@Injectable()
export class QuestionService {
    private dataUrl = 'http://127.0.0.1:8000/questions';

    constructor(public http: HttpClient) {}

    getQuestions(formData: FormData): Observable<Question[]> {
      return this.http.post<Question[]>(this.dataUrl, formData);
    }   

    getDocsTopics(formData: FormData): Observable<KeyTopics[]> {
      return this.http.post<KeyTopics[]>(`${this.dataUrl}/get_docs_topics`, formData);
    }

    createGoogleForm(questions : Question[], titleform : string): Observable<any> {
      var exam : Exam = {
        titleform: titleform,
        questions: questions
      };
      return this.http.post<any>(this.dataUrl + '/create-google-form', exam);
    }

}
