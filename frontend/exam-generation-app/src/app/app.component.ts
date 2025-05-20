import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { Question } from './models/question';
import { QuestionTypeConfiguration } from './models/question-type-configuration';
import { Stepper } from 'primeng/stepper';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('stepper') stepper!: Stepper;

  constructor(private primeng: PrimeNG) {}
  title = 'exam-generation-app';
  protected questions: Question[] = [];
  protected files: File[] = [];
  protected questionTypes: QuestionTypeConfiguration[] = [];
  protected filesSelected: boolean = false; 

  ngOnInit() {
      this.primeng.ripple.set(true);
  }



  activateStep(step: number): void {
    if (this.stepper) {
      this.stepper.value.set(step); 
    }
  }

}
