import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from 'src/app/pages/policy/policy.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PolicyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PolicyRoutingModule,
    TranslateModule
  ]
})
export class PolicyModule { }
