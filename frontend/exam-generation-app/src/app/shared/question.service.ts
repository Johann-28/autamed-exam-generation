import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, Subject } from 'rxjs';
import { Question } from '../models/question';
import { Answer } from '../models/anwer';


@Injectable()
export class QuestionService {
    private dataUrl = 'http://127.0.0.1:8000/questions';

    constructor(public http: HttpClient) {}

    getQuestions(formData: FormData): Observable<Question[]> {
      return this.http.post<Question[]>(this.dataUrl, formData);
    }   


  // Mockup observable
  getMockQuestions(): Observable<Question[]> {
    const mockQuestions: Question[] = [
      new Question(
      'What is Python?',
      'multiple_choice',
      [
        new Answer('A low-level programming language.', false),
        new Answer('A high-level programming language.', true),
        new Answer('A machine language.', false),
        new Answer('A language only computers can understand.', false),
      ]
      ),
      new Question(
      'How are high-level languages translated into low-level languages?',
      'multiple_choice',
      [
        new Answer('Only by compilers.', false),
        new Answer('Only by interpreters.', false),
        new Answer('By both interpreters and compilers.', true),
        new Answer('By neither interpreters nor compilers.', false),
      ]
      ),
      new Question(
      'What does an interpreter do?',
      'multiple_choice',
      [
        new Answer('Translates the entire program before running it.', false),
        new Answer('Processes the program a little bit at a time and runs it.', true),
        new Answer('Is used for low-level languages.', false),
        new Answer('Is not used for translating.', false),
      ]
      ),
      new Question(
      'Which of the following is a high-level language?',
      'multiple_choice',
      [
        new Answer('Machine language', false),
        new Answer('C++', true),
        new Answer('Low-level language', false),
        new Answer('None of the above.', false),
      ]
      )
    ];

    // Emit the mock questions array after 1 second
    return of(mockQuestions).pipe(delay(1000));
  }

}
