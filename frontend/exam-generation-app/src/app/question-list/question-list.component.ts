import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../shared/question.service';
import { QuestionTypeConfiguration } from '../models/question-type-configuration';
import { FilesService } from '../shared/files.service';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { KeyTopics } from '../models/key-topics';


@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule, CardModule, RadioButtonModule, FormsModule],
  providers: [QuestionService, FilesService],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss',
})
export class QuestionListComponent implements OnInit{
  @Input() filesSelected: boolean = false;
  @Input() files: File[] = [];
  @Input() questionTypes: QuestionTypeConfiguration[] = [];
  @Input() selectedTopics: string[] = []; 
  questions: Question[] = [];

  constructor(private questionService: QuestionService, private filesService : FilesService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.generateQuestions$.subscribe(() => {
      this.generateQuestions();
    });
  }

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
    formData.append('key_topics', JSON.stringify(this.selectedTopics));

    this.questionService.getQuestions(formData).subscribe((data) => {
      this.sharedService.emitQuestions(data);
      this.questions = data;
    });
  }
}
