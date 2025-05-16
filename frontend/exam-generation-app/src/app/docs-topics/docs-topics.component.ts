import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KeyTopics } from '../models/key-topics';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { QuestionListComponent } from '../question-list/question-list.component';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-docs-topics',
  standalone: true,
  imports: [ButtonModule, CommonModule, DialogModule, ProgressSpinnerModule, QuestionListComponent],
  templateUrl: './docs-topics.component.html',
  styleUrl: './docs-topics.component.scss',
  providers: [SharedService],
})
export class DocsTopicsComponent implements OnInit{

  dialogVisible: boolean = false;
  sectionVisible: boolean = false;

  @Input() filesSelected: boolean = false;
  @Input() files: File[] = [];


  constructor(private sharedService : SharedService) {}

  ngOnInit(): void {
    this.sharedService.questions$.subscribe({
      next: () => {
        this.dialogVisible = false;
        this.sectionVisible = true;
      }
    });
  }





  generateQuestions(): void {
    this.dialogVisible = true;
    this.sharedService.triggerGenerateQuestions();   
  }

  keyTopics: KeyTopics[] = [
    {
      title: 'Data Types and Variables',
      description: 'Covers Python data types such as integers, floats, strings, and how to declare variables.',
      badgeSeverity: ''
    },
    {
      title: 'Control Flow',
      description: 'Explains if-else statements, loops, and how to control the flow of a Python program.',
      badgeSeverity: ''
    },
    {
      title: 'Functions and Modules',
      description: 'Details how to define functions, use built-in modules, and create custom modules.',
      badgeSeverity: ''
    },
    {
      title: 'Object-Oriented Programming',
      description: 'Introduces classes, objects, inheritance, and other OOP concepts in Python.',
      badgeSeverity: ''
    },
    {
      title: 'File Handling',
      description: 'Describes how to read from and write to files using Python.',
      badgeSeverity: ''
    },
    {
      title: 'Error and Exception Handling',
      description: 'Explains how to handle errors and exceptions using try-except blocks.',
      badgeSeverity: ''
    }
  ];

    selectedTopics: string[] = []; // Lista de elementos seleccionados

    badgeSeverity: string | undefined;
    allowedSeverities = ["success", "info", "warn", "danger", "help", "primary", "secondary", "contrast"] as const;

    getValidatedBadgeSeverity(): "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined {
      return this.allowedSeverities.includes(this.badgeSeverity as any) ? this.badgeSeverity as any : undefined;
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
