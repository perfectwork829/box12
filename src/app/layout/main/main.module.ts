import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { ContentModule } from '../content/content.module';
import { FooterModule } from '../footer/footer.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule,
    CommonModule,
    HeaderModule,
    ContentModule,
    FooterModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
