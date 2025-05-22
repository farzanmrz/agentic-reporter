import { Component } from '@angular/core';
import { NgIf } from '@angular/common'; // <-- IMPORT NgIf
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-report-form-stepper',
  standalone: true,
  imports: [
    StepsModule,
    NgIf // <-- ADD NgIf HERE
  ],
  templateUrl: './report-form-stepper.component.html',
  styleUrls: ['./report-form-stepper.component.css']
})
export class ReportFormStepperComponent {
  items: MenuItem[];
  activeIndex: number = 0;

  constructor() {
    this.items = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' }
    ];
  }
}