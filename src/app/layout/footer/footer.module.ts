import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [FooterComponent],
    imports: [
        RouterModule,
        CommonModule,
        TranslateModule
    ],
  exports: [FooterComponent]
})
export class FooterModule { }
