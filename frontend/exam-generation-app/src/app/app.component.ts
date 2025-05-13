import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private primeng: PrimeNG) {}


  ngOnInit() {
      this.primeng.ripple.set(true);
  }
  title = 'exam-generation-app';
}
