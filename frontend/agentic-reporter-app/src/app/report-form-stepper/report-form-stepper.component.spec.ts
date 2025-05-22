import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFormStepperComponent } from './report-form-stepper.component';

describe('ReportFormStepperComponent', () => {
  let component: ReportFormStepperComponent;
  let fixture: ComponentFixture<ReportFormStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFormStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFormStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
