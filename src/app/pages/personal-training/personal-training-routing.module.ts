import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalTrainingComponent } from './personal-training.component';

const routes: Routes = [
  { path: '', component: PersonalTrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PersonalTrainingRoutingModule { }
