import { Component, ViewChild } from '@angular/core';
import { Stepper } from 'primeng/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone : false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('stepper') stepper!: Stepper;

  title = 'exam-generation-app';
  
  filesSelected: boolean = false;
  files: File[] = [];
  questionTypes: any[] = [];
  webUrl: string = '';
  
  newlyCreatedExam: any = null;

  onExamCreated(exam: any): void {
    this.newlyCreatedExam = exam;
    console.log('Exam created:', exam);
  }

  goToExamsList(activateCallback: (step: number) => void): void {
    activateCallback(4);
  }

  createNewExam(): void {
    this.filesSelected = false;
    this.files = [];
    this.questionTypes = [];
    this.webUrl = '';
    this.newlyCreatedExam = null;
    
    this.stepper.value.set(1);
  }

  activateStep(step: number): void {
    this.stepper.value.set(step);
  }
}