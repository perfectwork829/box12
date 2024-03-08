import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import * as AOS from 'aos';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent {
  @Input() subscribers: {name: string, price: number, descriptions: string[]}[] = [];
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
