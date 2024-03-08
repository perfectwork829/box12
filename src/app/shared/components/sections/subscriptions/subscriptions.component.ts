import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent {
  @Input() config: AppConfig = {};  
  @Input() memberships: any = [];  
  @Output() onreactivateSubscription: EventEmitter<any> = new EventEmitter();
  @Output() onsuspendSubscription: EventEmitter<any> = new EventEmitter();
  @Output() oncancelSubscription: EventEmitter<any> = new EventEmitter();
  bLang: boolean = false;
  constructor(

  ) {
  }

  ngOnInit(){
    this.bLang = this.config.isArabic;
    console.log('subscription sttatus', this.bLang);
  }
}
