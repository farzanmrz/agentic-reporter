import { Component, OnInit } from '@angular/core'; // Import OnInit
import { NgIf } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is here

@Component({
  selector: 'app-report-form-stepper',
  standalone: true,
  imports: [
    StepsModule,
    NgIf,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    FormsModule // FormsModule is needed for [(ngModel)]
  ],
  templateUrl: './report-form-stepper.component.html',
  styleUrls: ['./report-form-stepper.component.css']
})
export class ReportFormStepperComponent implements OnInit { // Implement OnInit
  items: MenuItem[];
  activeIndex: number = 0; // Ensure this is 0

  agentName: string = '';
  templateName: string = '';
  headerRowIndex: number | null = null;
  sheetIndex: number | null = null;

  constructor() {
    this.items = [
      { label: 'Template Details', command: (event: any) => this.activeIndex = 0 },
      { label: 'Define Logic', command: (event: any) => this.activeIndex = 1 },
      { label: 'Confirm & Save', command: (event: any) => this.activeIndex = 2 }
    ];
  }

  ngOnInit(): void {
    // You can also explicitly set it here if needed,
    // but the class property initialization should be enough.
    // this.activeIndex = 0;
  }

  onFileSelect(event: any) {
    console.log("File selected:", event.files[0]);
  }
}