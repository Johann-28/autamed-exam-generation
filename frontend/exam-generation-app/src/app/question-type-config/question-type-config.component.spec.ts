import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeConfigComponent } from './question-type-config.component';

describe('QuestionTypeConfigComponent', () => {
  let component: QuestionTypeConfigComponent;
  let fixture: ComponentFixture<QuestionTypeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionTypeConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
