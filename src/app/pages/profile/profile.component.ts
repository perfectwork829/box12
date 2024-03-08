import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { Product } from 'src/app/shared/models';
import { ReferralCodeComponent } from "src/app/shared/components/modals/referral-code/referral-code.component";
import { BranchSettingComponent } from "src/app/shared/components/modals/branch-setting/branch-setting.component";
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {};
  subscriptions: Product[]= [];
  personalTrainings:Product[] = [];
  modalReference!: NgbModalRef;  

  pitems = [
      {id:'personal-data',label: 'Personal data',iconclass: 'icon-active-person',href:'profile/personal-data'},
      {id:'club-branches',label: 'Club branches',iconclass: 'icon-active-marker',href:'profile/branches'},
      {id:'referral-code',label: 'Promotional code',iconclass: 'icon-active-two-person',href:'profile/referral-code'},
      {id:'financial-operations',label: 'financial_operations',iconclass: 'icon-active-cash',href:'profile/financial-operations'},
      {id:'technical-support',label: 'Technical support',iconclass: 'icon-receiver',href:'https://wa.me/966920012527?text=Hello%20there'},
      {id:'branch-change',label: 'Branch Change',iconclass: 'icon-setting-branch',href:'profile/branch-change'}
      // {id:'privacy-policy',label: 'privacy policy',iconclass: 'j-icon-capman',href:'/privacy-policy'},
      // {id:'terms-conditions',label: 'Terms and conditions',iconclass: 'j-icon-file',href:'/terms-conditions'},
  ];

  current_user_profile;
  imageUrl:string = "./assets/img/manavatar.png";
  
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
    this.title.setTitle(this.coreTranslationService.translateText('Profile - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Profile - Box12'),
      },
    ]);

    this.config = this.configService.appSettingsValues;    
    this.user = this.config.user || {};
    this.current_user_profile = this.config.user;    

    this.loaderService.setLoading(true);
    this.httpService.get('profile').then((response: any)=>{
      console.log('response here', response);
      this.loaderService.setLoading(false);    
      if (!response) {
				console.log('get_non_profile');
		      return;
		    }
        this.imageUrl = response.photo;      
    }).catch((err) => {
        console.log(err);
        this.imageUrl = "./assets/img/manavatar.png";
    });
    this.loaderService.setLoading(false);
  }

  ngAfterViewInit(){}

  //Go to the detail page
  goDetailPage(hr): void{
    if (hr == "profile/referral-code"){        
      this.onReferrelCode();
    }else if(hr.includes('https://wa.me')){
      window.open(hr, '_blank');
    }else if (hr == "profile/branch-change"){        
      this.onBranchSetting();
    }else{ 
        this.router.navigate([hr]);
    }
  }

  //Open the Referrel Code modal
  onReferrelCode(){    
    this.modalReference = this.modalService.open(ReferralCodeComponent, { centered: true, size: 'md'});
    this.modalReference.componentInstance.config = this.config;        
    this.modalReference.result.then((result) => {          
    }, (reason) => {
      console.log('reason', reason);
    }); 
    this.modalReference.hidden.subscribe(()=>{
      //location.reload();
    });  
  }

  //Open the Branch Setting modal
  onBranchSetting(){
    this.modalReference = this.modalService.open(BranchSettingComponent, { centered: true, size: 'md'});
    this.modalReference.componentInstance.config = this.config;        
    this.modalReference.result.then((result) => {   
    }, (reason) => {
      console.log('reason', reason);
    }); 
    this.modalReference.hidden.subscribe(()=>{
      //location.reload();
    });  
  }
}
