import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestionTypeConfiguration } from '../models/question-type-configuration';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { QuestionType } from '../models/question-type';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Question } from '../models/question';

@Component({
  selector: 'app-question-type-config',
  templateUrl: './question-type-config.component.html',
  styleUrls: ['./question-type-config.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class QuestionTypeConfigComponent implements OnInit {
  questionTypes: QuestionTypeConfiguration[] = [];
  editingIndex: number = -1;
  @Output() questionTypesChange: EventEmitter<QuestionTypeConfiguration[]> =
    new EventEmitter<QuestionTypeConfiguration[]>();

  currentConfig: QuestionTypeConfiguration = {
    type: '',
    easy: 0,
    medium: 0,
    hard: 0,
    total: 0,
  };

  questionTypeOptions: QuestionType[] = [
    { type: 'MULTIPLE_CHOICE', description: 'Multiple Choice' },
    { type: 'CHECKBOX',
      description: 'Checkbox',
    },
    { type: 'trueFalse', description: 'True/False' },
  ];

  filteredTypeOptions: QuestionType[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.filteredTypeOptions = this.questionTypeOptions;
  }

  addQuestionType() {
    if (this.isTypeDuplicate(this.currentConfig.type)) {
      this.messageService.add({
        severity: 'warn',
        summary: `The question type "${this.currentConfig.type}" already exists.`,
        detail: '',
      });
      return;
    }

    if (this.currentConfig.type == '' || this.currentConfig.total == 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Please select a question type.',
        detail: '',
      });
      return;
    }

    this.questionTypes.push({ ...this.currentConfig });
    this.emitQuestionTypesChange();
    this.resetCurrentConfig();
    this.updateFilteredOptions();
  }

  // Method to load an existing configuration into the form for editing
  editQuestionType(index: number) {
    const config = this.questionTypes[index];
    if (config.isEditing) {
      if (config.total == 0 || config.type == '') {
        this.messageService.add({
          severity: 'warn',
          summary: 'Please select a question type.',
          detail: '',
        });
        return;
      }
      config.isEditing = false;
    } else {
      config.isEditing = true;
    }
  }

  // Method to automatically calculate the total number of questions
  updateCurrentTotal() {
    this.currentConfig.total =
      this.currentConfig.easy +
      this.currentConfig.medium +
      this.currentConfig.hard;
  }

  removeQuestionType(index: number): void {
    this.questionTypes.splice(index, 1); 
    this.updateFilteredOptions();
  }

  updateTotal(index: number) {
    const config = this.questionTypes[index];
    config.total = config.easy + config.medium + config.hard;
  }

  // Method to reset the temporary configuration
  private resetCurrentConfig() {
    this.currentConfig = {
      type: '',
      easy: 0,
      medium: 0,
      hard: 0,
      total: 0,
    };
  }
  
  updateFilteredOptions(){
    const selectedTypes = this.questionTypes.map((config) => config.type);
    this.filteredTypeOptions = this.questionTypeOptions.filter(
      (option) => !selectedTypes.includes(option.description)
    );
  }

  // Method to emit the change in the list of configurations
  private emitQuestionTypesChange() {
    this.questionTypesChange.emit(this.questionTypes);
  }

  // Method to check if a type already exists in the list
  private isTypeDuplicate(type: string): boolean {
    return this.questionTypes.some(
      (questionType) => questionType.type === type
    );
  }
}
