import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { Question } from './models/question';
import { QuestionType } from './models/question-type';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private primeng: PrimeNG) {}
  title = 'exam-generation-app';
  protected questions: Question[] = [];
  protected files: File[] = [];
  protected questionTypes: QuestionType[] = [];
  protected filesSelected: boolean = false; 

  ngOnInit() {
      this.primeng.ripple.set(true);
  }
}
