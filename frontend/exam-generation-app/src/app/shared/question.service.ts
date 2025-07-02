import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, Subject } from 'rxjs';
import { Question } from '../models/question';
import { Answer } from '../models/anwer';
import { KeyTopics } from '../models/key-topics';
import { Exam } from '../models/exam';


@Injectable()
export class QuestionService {
    private dataUrl = 'http://localhost:8000/questions';

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

    getMockupQuestions(): Observable<Question[]> {
      return of([
        new Question(
          "What is the capital of France?",
          1,
          [
        { text: "Paris", is_correct: true },
        { text: "London", is_correct: false },
        { text: "Berlin", is_correct: false },
        { text: "Madrid", is_correct: false }
          ],
          1
        ),
        new Question(
          "Which planet is known as the Red Planet?",
          1,
          [
        { text: "Mars", is_correct: true },
        { text: "Venus", is_correct: false },
        { text: "Jupiter", is_correct: false },
        { text: "Saturn", is_correct: false }
          ],
          1
        ),
        new Question(
          "What is the largest ocean on Earth?",
          1,
          [
        { text: "Pacific Ocean", is_correct: true },
        { text: "Atlantic Ocean", is_correct: false },
        { text: "Indian Ocean", is_correct: false },
        { text: "Arctic Ocean", is_correct: false }
          ],
          1
        ),
        new Question(
          "Who wrote 'Romeo and Juliet'?",
          1,
          [
        { text: "William Shakespeare", is_correct: true },
        { text: "Charles Dickens", is_correct: false },
        { text: "Jane Austen", is_correct: false },
        { text: "Mark Twain", is_correct: false }
          ],
          1
        ),
        new Question(
          "What is the chemical symbol for water?",
          1,
          [
        { text: "H2O", is_correct: true },
        { text: "O2", is_correct: false },
        { text: "CO2", is_correct: false },
        { text: "NaCl", is_correct: false }
          ],
          1
        ),
        new Question(
          "Which continent is the Sahara Desert located on?",
          1,
          [
        { text: "Africa", is_correct: true },
        { text: "Asia", is_correct: false },
        { text: "Australia", is_correct: false },
        { text: "South America", is_correct: false }
          ],
          1
        ),
        new Question(
          "What is the smallest prime number?",
          1,
          [
        { text: "2", is_correct: true },
        { text: "1", is_correct: false },
        { text: "3", is_correct: false },
        { text: "5", is_correct: false }
          ],
          1
        ),
        new Question(
          "Who painted the Mona Lisa?",
          1,
          [
        { text: "Leonardo da Vinci", is_correct: true },
        { text: "Pablo Picasso", is_correct: false },
        { text: "Vincent van Gogh", is_correct: false },
        { text: "Claude Monet", is_correct: false }
          ],
          1
        ),
        new Question(
          "What is the boiling point of water at sea level?",
          1,
          [
        { text: "100°C", is_correct: true },
        { text: "0°C", is_correct: false },
        { text: "50°C", is_correct: false },
        { text: "212°C", is_correct: false }
          ],
          1
        ),
        new Question(
          "Which language is primarily spoken in Brazil?",
          1,
          [
        { text: "Portuguese", is_correct: true },
        { text: "Spanish", is_correct: false },
        { text: "French", is_correct: false },
        { text: "English", is_correct: false }
          ],
          1
        ),
        // Type 2 question (multiple correct answers)
        new Question(
          "Which of the following are programming languages?",
          2,
          [
        { text: "Python", is_correct: true },
        { text: "JavaScript", is_correct: true },
        { text: "HTML", is_correct: false },
        { text: "CSS", is_correct: false }
          ],
          2
        )
      ]).pipe(delay(3000));
    }

    getMockupKeyTopics(): Observable<KeyTopics[]> {
      return of([
        { title: "Geography", badgeSeverity: "success" },
        { title: "Science", badgeSeverity: "info" },
        { title: "Mathematics", badgeSeverity: "primary" },
        { title: "History", badgeSeverity: "warning" },
        { title: "Literature", badgeSeverity: "danger" }
      ]).pipe(delay(3000));
    }
    
}
