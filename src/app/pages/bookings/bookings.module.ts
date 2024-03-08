import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from 'src/app/pages/bookings/bookings.component';


@NgModule({
  declarations: [
    BookingsComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    BookingsRoutingModule
  ]
})
export class BookingsModule { }