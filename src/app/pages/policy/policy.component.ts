import { AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User, TimeSession } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import * as moment from 'moment';
import * as AOS from 'aos';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})

export class PolicyComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {}; 
  bBlock: boolean = true;   
  session_date = moment().format('YYYY-MM-DD') ;	
  modalReference!: NgbModalRef;  
  
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

  ngOnInit() {
    this.loaderService.setLoading(true);    
    console.log('start on init function!!!');
    this.title.setTitle(this.coreTranslationService.translateText('Policy - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Policy - Box12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};       
    AOS.init({
      once: true,      
    });
            
    setTimeout(() => {
      this.loaderService.setLoading(false);           
    }, 1000);
  }
  ngAfterViewInit() {}
}
