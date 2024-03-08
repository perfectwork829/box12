import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { BrowserModule } from '@angular/platform-browser';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "src/app/shared/shared.module";



@NgModule({
  declarations: [HeaderComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        TranslateModule,
        FormsModule,
        NgbModule,
        SharedModule
    ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
