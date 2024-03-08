import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MembershipComponent } from 'src/app/pages/membership/membership.component';
import { MembershipProductsRoutingModule } from 'src/app/pages/membership/membership-routing.module';

@NgModule({
  declarations: [
    MembershipComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MembershipProductsRoutingModule
  ]
})
export class MembershipModule { }
