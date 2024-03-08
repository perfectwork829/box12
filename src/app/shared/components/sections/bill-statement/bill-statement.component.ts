import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { Invoice, User } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-bill-statement',
  templateUrl: './bill-statement.component.html',
  styleUrls: ['./bill-statement.component.scss']
})
export class BillStatementComponent {
  submitting = false;
  config: AppConfig = {};
  user: User = {};
  invoice_list:Invoice[] = [
      // {id: 104,amount_after_vat: 1150.45,vat_amount: 150.00,amount: 1000.45,name: "اشتراك 3 أشهر",payment_way:"نقدي",status:"paid",created_at: '21 Jun 2023 14:30'},
  ];
  isLangflag: boolean = false;
  constructor(
    private title: Title,
		private meta: Meta,
    private httpService: HttpService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService,
    private coreTranslationService: CoreTranslationService
  ) {    
  }
  
  ngOnInit(){
    this.title.setTitle(this.coreTranslationService.translateText('Profile - 3 Days'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Profile - 3 Days'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};
    //this.current_user_profile = this.config.user;    
    this.loaderService.setLoading(true);    
    this.onFetchPaymentList();
    this.isLangflag = this.config.isArabic;   
  }

  //Get the Bill statement data
  async onFetchPaymentList(){    
    this.httpService.post('member/payments', {}).then((response: any)=>{
      this.loaderService.setLoading(false);    
      if (!response) {
          console.log('get_non_profile_info');
          return;
      }    
      this.invoice_list = response;
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }
}
