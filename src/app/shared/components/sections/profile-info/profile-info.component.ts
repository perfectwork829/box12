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
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {};
  subscriptions: Product[]= [];
  personalTrainings:Product[] = [];
  modalReference!: NgbModalRef;  

  current_user_data = {
		arabic_name: "User",
		english_name: "User",
		national_id: "00000000000",
		mobile: "123456789",
		default_branch: 1,
		email: "sample@test.com",
		dob: "2000-01-01"
	};

  submitting = false;

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
    //this.current_user_profile = this.config.user;    
    this.loaderService.setLoading(true);    
    this.httpService.get('profile').then((response: any)=>{
      this.loaderService.setLoading(false);    
      if (!response) {
          console.log('get_non_profile_info');
          return;
      }    
      this.current_user_data = {...response};
    });
  }

  ngAfterViewInit(){

  }

  //Update the user's profile info
  update(){
		this.submitting = true;
    this.loaderService.setLoading(true);
    this.httpService.post('update-profile', this.current_user_data).then((response: any)=>{
      console.log('response here', response);
      this.loaderService.setLoading(false);    
      this.submitting = false;      
      const mgBody = "Updated profile info successfully.";
			this.alertService.alert('Profile Info', mgBody, 'success');				
    }).catch((err) => {                
        this.alertService.alert('info', err.message, 'error');
    });
    this.loaderService.setLoading(false);
	}
}
