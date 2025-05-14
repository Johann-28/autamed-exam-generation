import { Component, EventEmitter, Output } from '@angular/core';
import { QuestionType } from '../models/question-type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-type-config',
  templateUrl: './question-type-config.component.html',
  styleUrls: ['./question-type-config.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class QuestionTypeConfigComponent {
  questionTypes: QuestionType[] = [];
  editingIndex: number = -1;
  @Output() questionTypesChange: EventEmitter<QuestionType[]> =
    new EventEmitter<QuestionType[]>();

  currentConfig: QuestionType = {
    type: 'singleChoice',
    easy: 0,
    medium: 0,
    hard: 0,
    total: 0,
  };

  // Central method that decides whether to add or edit
  handleQuestionTypeAction() {
    if (this.isEditing()) {
      this.updateQuestionType();
    } else {
      this.addQuestionType();
    }
  }

  private addQuestionType() {
    if (this.isTypeDuplicate(this.currentConfig.type)) {
      console.error(
        `The question type "${this.currentConfig.type}" already exists.`
      );
      return; // Exit without adding the duplicate type
    }
    this.questionTypes.push({ ...this.currentConfig });
    this.emitQuestionTypesChange();
    this.resetCurrentConfig();
  }

  // Method to update an existing configuration
  private updateQuestionType() {
    if (this.isEditing()) {
      this.questionTypes[this.editingIndex] = { ...this.currentConfig };
      this.editingIndex = -1; // Exit edit mode
      this.emitQuestionTypesChange();
      this.resetCurrentConfig();
    }
  }

  // Method to load an existing configuration into the form for editing
  editQuestionType(index: number) {
    this.currentConfig = { ...this.questionTypes[index] }; // Load the selected configuration
    this.editingIndex = index; // Save the index of the configuration being edited
  }

  // Method to automatically calculate the total number of questions
  updateTotal() {
    this.currentConfig.total =
      this.currentConfig.easy +
      this.currentConfig.medium +
      this.currentConfig.hard;
  }

  // Method to reset the temporary configuration
  private resetCurrentConfig() {
    this.currentConfig = {
      type: 'singleChoice',
      easy: 0,
      medium: 0,
      hard: 0,
      total: 0,
    };
  }

  // Method to emit the change in the list of configurations
  private emitQuestionTypesChange() {
    this.questionTypesChange.emit(this.questionTypes);
  }

  // Method to check if it is in edit mode
  private isEditing(): boolean {
    return this.editingIndex !== -1;
  }

  // Method to check if a type already exists in the list
  private isTypeDuplicate(type: string): boolean {
    return this.questionTypes.some(
      (questionType) => questionType.type === type
    );
  }
}