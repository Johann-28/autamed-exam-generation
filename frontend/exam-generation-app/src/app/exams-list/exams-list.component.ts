import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExamService } from '../shared/exam.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Message } from 'primeng/message';


@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss'],
  standalone: true,
  imports: [ButtonModule, CommonModule, DialogModule, Tag, TableModule, Message],
  providers: [MessageService]
})
export class ExamsListComponent implements OnInit, OnChanges {
  @Input() newExam: any = null;
  @Output() createNewExam = new EventEmitter<void>();

  exams: any[] = [];
  loading = false;
  showExamDetails = false;
  selectedExam: any = null;

  // Stats
  totalExams = 0;
  activeExams = 0;
  totalQuestions = 0;

  constructor(
    private examService: ExamService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadExams();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newExam'] && changes['newExam'].currentValue) {
      this.loadExams(); // Refresh the list when a new exam is added
    }
  }

  loadExams(): void {
    this.loading = true;
    this.examService.getAllExams().subscribe({
      next: (exams) => {
        this.exams = exams;
        this.calculateStats();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading exams:', error);
        this.messageService.add({
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to load exams'
        });
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    this.totalExams = this.exams.length;
    this.activeExams = this.exams.filter(exam => exam.is_active).length;
    this.totalQuestions = this.exams.reduce((total, exam) => 
      total + (exam.questions?.length || 0), 0
    );
  }

  onCreateNewExam(): void {
    this.createNewExam.emit();
  }

  viewExam(exam: any): void {
    this.selectedExam = exam;
    this.showExamDetails = true;
  }

  openGoogleForm(url: string): void {
    window.open(url, '_blank');
  }

  createGoogleForm(exam: any): void {
    // Implementar creación de Google Form
    this.messageService.add({
      severity: 'info', 
      summary: 'Info', 
      detail: 'Creating Google Form...'
    });
    
    // Aquí llamarías a tu servicio para crear el Google Form
    // this.examService.createGoogleForm(exam).subscribe(...)
  }

  deleteExam(exam: any): void {
    if (confirm(`Are you sure you want to delete "${exam.name}"?`)) {
      this.examService.deleteExam(exam.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success', 
            summary: 'Success', 
            detail: 'Exam deleted successfully'
          });
          this.loadExams();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to delete exam'
          });
        }
      });
    }
  }
}