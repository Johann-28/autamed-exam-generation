import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private questionsSubject = new Subject<Question[]>();
  questions$ = this.questionsSubject.asObservable();
  private generateQuestionsSubject = new Subject<void>();
  generateQuestions$ = this.generateQuestionsSubject.asObservable();

  emitQuestions(questions: Question[]): void {
    this.questionsSubject.next(questions);
  }

  triggerGenerateQuestions(): void {
    console.log('SharedService: Triggering question generation...');
    this.generateQuestionsSubject.next();
  }


}