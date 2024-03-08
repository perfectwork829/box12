import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalTrainingRoutingModule } from './personal-training-routing.module';
import { PersonalTrainingComponent } from 'src/app/pages/personal-training/personal-training.component';

@NgModule({
  declarations: [
    PersonalTrainingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PersonalTrainingRoutingModule
  ]
})
export class PersonalTrainingModule { }
