import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../shared/question.service';
import { QuestionTypeConfiguration } from '../models/question-type-configuration';
import { FilesService } from '../shared/files.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  providers: [QuestionService],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent {
  @Input() filesSelected: boolean = false;
  @Input() files: File[] = [];
  questions: Question[] = [];
  @Input() questionTypes: QuestionTypeConfiguration[] = [];

  constructor(private questionService: QuestionService, private filesService : FilesService) {}

  generateQuestions() {
    if (!this.filesSelected) {
      console.warn('No files selected.');
      return;
    }
    this.filesService.triggerClearFiles();
    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('question_types', JSON.stringify(this.questionTypes));

    this.questionService.getQuestions(formData).subscribe((data) => {
      this.questions = data;
    });
  }
}
