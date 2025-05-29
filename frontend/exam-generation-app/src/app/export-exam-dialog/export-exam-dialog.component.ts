import { Component, Input, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';
import { Question } from '../models/question';



@Component({
  selector: 'app-export-exam-dialog',
  imports: [InputTextModule, FloatLabelModule, InputTextModule, FormsModule, ButtonModule, MessageModule],
  templateUrl: './export-exam-dialog.component.html',
  styleUrl: './export-exam-dialog.component.scss'
})
export class ExportExamDialogComponent {

  @Input() formsUrl = 'https://forms.gle/4v2Z5Y1a3x7g6k8s7';
  @Input() questions : Question[] = [];
  visible = signal(false);


  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.showMessage();
  }

    showMessage() {
      this.visible.set(true);

      setTimeout(() => {
          this.visible.set(false);
      }, 3500);
  }
  

  downloadQuestionsPdf() {
    import('jspdf').then(jsPDFModule => {
      const jsPDF = jsPDFModule.jsPDF;
      const doc = new jsPDF();

      let y = 10;
      this.questions.forEach((q, idx) => {
        doc.text(`${idx + 1}. ${q.question} (${q.points} pts)`, 10, y);
        y += 8;
        q.answers.forEach((a, aIdx) => {
          doc.text(`   ${String.fromCharCode(97 + aIdx)}) ${a.text}`, 14, y);
          y += 7;
        });
        y += 5;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });

      doc.save('questions.pdf');
    });
  }


}
