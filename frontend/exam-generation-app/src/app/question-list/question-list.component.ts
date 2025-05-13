import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-question-list',
  imports: [ButtonModule, RippleModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent {
  darkModeSelector = false; // Initial state

  toggleDarkMode() {
    const element = document.documentElement;
    if (element) {
        this.darkModeSelector = !this.darkModeSelector; // Test of the dark mode selector
        element.classList.toggle('my-app-dark');
    } else {
        console.warn('HTML element not found.');
    }
  }
}
