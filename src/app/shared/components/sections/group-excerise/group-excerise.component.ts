import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import * as AOS from 'aos';

@Component({
  selector: 'app-group-excerise',
  templateUrl: './group-excerise.component.html',
  styleUrls: ['./group-excerise.component.scss']
})
export class GroupExceriseComponent {
  @Input() exercises: {name: string, descriptions: string}[] = [];
  @Input() section: string = '';
  @Input() config: AppConfig = {};
  @Input() page: string = '';  
  constructor() {
  }
  ngOnInit() {
    AOS.init({
      once: true,      
    });
  }
}
