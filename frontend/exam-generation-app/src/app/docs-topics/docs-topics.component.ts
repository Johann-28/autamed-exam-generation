import { Component, Input, OnInit } from '@angular/core';
import { KeyTopics } from '../models/key-topics';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { QuestionListComponent } from '../question-list/question-list.component';
import { SharedService } from '../shared/shared.service';
import { QuestionService } from '../shared/question.service';
import { QuestionTypeConfiguration } from '../models/question-type-configuration';


@Component({
  selector: 'app-docs-topics',
  standalone: true,
  imports: [ButtonModule, CommonModule, DialogModule, ProgressSpinnerModule, QuestionListComponent],
  templateUrl: './docs-topics.component.html',
  styleUrl: './docs-topics.component.scss',
  providers: [SharedService, QuestionService]
})
export class DocsTopicsComponent implements OnInit{

  @Input() filesSelected: boolean = false;
  @Input() files: File[] = [];
  @Input() questionTypes: QuestionTypeConfiguration[] = [];

  dialogVisible: boolean = false;
  sectionVisible: boolean = false;
  keyTopics: KeyTopics[] = [];
  selectedTopics: string[] = []; 
  badgeSeverity: string | undefined;
  allowedSeverities = ["success", "info", "warn", "danger", "help", "primary", "secondary", "contrast"] as const;
  constructor(private sharedService : SharedService, 
              private questionService : QuestionService
            ) {}

  ngOnInit(): void {
    this.dialogVisible = true;
    this.getDocsTopics();
    this.sharedService.questions$.subscribe({
      next: () => {
        this.dialogVisible = false;
        this.sectionVisible = true;
      }
    });
  }

  getDocsTopics(): void {
    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('files', file);
    });
    this.questionService.getDocsTopics(formData).subscribe((data) => {
      this.keyTopics = data;
      this.dialogVisible = false;
    });
  }

  generateQuestions(): void {
    this.dialogVisible = true;
    this.sharedService.triggerGenerateQuestions();   
  }


    getValidatedBadgeSeverity(): "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined {
      const randomIndex = Math.floor(Math.random() * this.allowedSeverities.length);
      return this.allowedSeverities[randomIndex];
    }

  
    toggleTopicSelection(topic: string): void {
    const index = this.selectedTopics.indexOf(topic);

    if (index === -1) {
      // Si no está seleccionado y hay menos de 3 seleccionados, lo agrega
      if (this.selectedTopics.length < 3) {
        this.selectedTopics.push(topic);
      }
    } else {
      // Si ya está seleccionado, lo elimina
      this.selectedTopics.splice(index, 1);
    }
  }

  
  
  isTopicSelected(topic: string): boolean {
    return this.selectedTopics.includes(topic);
  } 

   



}
