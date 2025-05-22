import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ReportFormStepperComponent } from '../report-form-stepper/report-form-stepper.component'; // <-- IMPORT THIS

@Component({
  selector: 'app-content-area',
  standalone: true,
  imports: [
    CardModule,
    ReportFormStepperComponent // <-- ADD THIS TO THE IMPORTS ARRAY
  ],
  templateUrl: './content-area.component.html',
  styleUrl: './content-area.component.css'
})
export class ContentAreaComponent {

}