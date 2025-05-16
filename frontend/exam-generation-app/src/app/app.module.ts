import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { UploadZoneComponent } from './upload-zone/upload-zone.component';
import { QuestionTypeConfigComponent } from './question-type-config/question-type-config.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DocsTopicsComponent } from './docs-topics/docs-topics.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuestionListComponent,
    UploadZoneComponent,
    QuestionTypeConfigComponent,
    QuestionListComponent,
    StepperModule,
    ButtonModule,
    DocsTopicsComponent
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
                prefix: 'p',
                darkModeSelector: '.my-app-dark',
                cssLayer: false
            }
      },
      ripple: true,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }