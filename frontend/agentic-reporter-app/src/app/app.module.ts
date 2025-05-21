import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 1. Import PrimeNG ButtonModule
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule // 2. Add ButtonModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }