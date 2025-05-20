import { Component, Input, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-export-exam-dialog',
  imports: [InputTextModule, FloatLabelModule, InputTextModule, FormsModule, ButtonModule, MessageModule],
  templateUrl: './export-exam-dialog.component.html',
  styleUrl: './export-exam-dialog.component.scss'
})
export class ExportExamDialogComponent {

  @Input() formsUrl = 'https://forms.gle/4v2Z5Y1a3x7g6k8s7';
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


}
