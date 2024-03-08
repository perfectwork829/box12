import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyComponent } from './academy.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    AcademyComponent
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule,
    SharedModule
  ]
})
export class AcademyModule { }
