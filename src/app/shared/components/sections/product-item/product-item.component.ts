import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from 'src/app/shared/models';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from "src/app/shared/services/config/config.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit{
  @Input() subscriptions: Product[]= [];
  @Input() personalTrainings: Product[]= [];
  @Input() config: AppConfig = {};  
  @Output() onSubscriptionSelected: EventEmitter<any> = new EventEmitter();
  isLangflag: boolean = false; 
  selected_tab :number = 1;
  currency = 'SAR';
  constructor(
    private configService: ConfigService,
  ) {

  }

  ngOnInit(){        
    this.isLangflag = this.config.isArabic;    
  }

  ngAfterViewInit(){

  }  
  
  //select the tab
  selectTab (tab:number):void{
		this.selected_tab = tab;
	}
}
