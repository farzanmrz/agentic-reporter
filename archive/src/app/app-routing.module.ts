import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateCreatorComponent } from './template-creator/template-creator.component';

const routes: Routes = [
  { path: 'create-template', component: TemplateCreatorComponent },
  { path: '', redirectTo: '/create-template', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
