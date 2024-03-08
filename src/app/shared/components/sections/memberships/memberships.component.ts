import {Component, Input, OnInit} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss']
})
export class MembershipsComponent implements OnInit{
  @Input() config: AppConfig = {};
  memberships: any = [
    {
      id: 1,
      type: 'membership',
      name: '3 Month Membership',
      price: 0,
      features: [
        'One individual preparing session',
        'Monthly in-body to evaluate your progress',
        'Friend invitation',
        'box12 circle',
        'Trainer counseling'
      ]
    },
    {
      id: 2,
      type: 'membership',
      name: '6 Month Membership',
      price: 0,
      features: [
        '1 Months membership hold',
        'One individual preparing session',
        'Monthly in-body to evaluate your progress',
        'Friend invitation',
        'Trainer counseling',
        'box12 circle',
        'Trainer counseling'
      ]
    },
    {
      id: 3,
      type: 'membership',
      name: '12 Months Membership',
      price: 0,
      features: [
        '2 Months membership hold',
        'One individual preparing session',
        'Monthly in-body to evaluate your progress',
        'Friend invitation',
        'Trainer counseling',
        '3Days circle',
        'Trainer counseling'
      ]
    },
  ]
  constructor() {
  }

  ngOnInit() {

  }

}
