import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComingSoonRoutingModule } from './coming-soon-routing.module';
import { ComingSoonComponent } from 'src/app/pages/coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    ComingSoonRoutingModule,
    SharedModule
  ]
})
export class ComingSoonModule { }
