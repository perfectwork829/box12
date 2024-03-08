import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { Notifications } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  @Input() config: AppConfig = {};
  @Output() notificationStatus = new EventEmitter<boolean>();
  bLangFlag = false;
  noti_list:Notifications[] = [
    // {id:"1",icon:"account",arabic_description:"هنا محتوى نصي لنوع معين من التنبيهات، تتغير الايكون الخاصة بالتنبيه حسب المحتوى.",english_description:"english_description",arabic_title:"arabic title",english_title: "english title",type:"type",arabic_created_at:"arabic created at",english_created_at:"english_created_at",created_at:"2023-08-07T11:54:08.000000Z"},
    // {id:"2",icon:"subscription",arabic_description:"هنا محتوى نصي لنوع معين من التنبيهات، تتغير الايكون الخاصة بالتنبيه حسب المحتوى.",english_description:"english_description",arabic_title:"arabic title",english_title: "english title",type:"type",arabic_created_at:"arabic created at",english_created_at:"english_created_at",created_at:"2023-08-07T11:54:08.000000Z"},
    // {id:"3",icon:"session",arabic_description:"هنا محتوى نصي لنوع معين من التنبيهات، تتغير الايكون الخاصة بالتنبيه حسب المحتوى.",english_description:"english_description",arabic_title:"arabic title",english_title: "english title",type:"type",arabic_created_at:"arabic created at",english_created_at:"english_created_at",created_at:"21 Jun 2023 14:30"},
    // {id:"4",icon:"branch",arabic_description:"هنا محتوى نصي لنوع معين من التنبيهات، تتغير الايكون الخاصة بالتنبيه حسب المحتوى.",english_description:"english_description",arabic_title:"arabic title",english_title: "english title",type:"type",arabic_created_at:"arabic created at",english_created_at:"english_created_at",created_at:"21 Jun 2023 14:30"},
    // {id:"5",icon:"payment",arabic_description:"هنا محتوى نصي لنوع معين من التنبيهات، تتغير الايكون الخاصة بالتنبيه حسب المحتوى.",english_description:"english_description",arabic_title:"arabic title",english_title: "english title",type:"type",arabic_created_at:"arabic created at",english_created_at:"english_created_at",created_at:"21 Jun 2023 14:30"},
  ];
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService,
    private coreTranslationService: CoreTranslationService,
    public activeModal: NgbActiveModal,
  ) {
    this.loaderService.setLoading(true);   
    this.httpService.get('member/notifications').then((response: any)=>{
      this.loaderService.setLoading(false);                    
      this.noti_list = response;
      //this.sendNotificationStatus();
    }).catch((error) => {
      this.loaderService.setLoading(false);    
      this.alertService.alert('Error', error.message, 'error');          
    });
    this.bLangFlag = this.config.isArabic;   
  }

  ngOnInit() {
    this.bLangFlag = this.config.isArabic;    
    console.log('langulage setting value', this.bLangFlag)
  }
  
  sendNotificationStatus() {
    this.httpService.get('member/notifications/status').then((response: any) => {      
      if(response.unreadNotifications==0)        
        this.notificationStatus.emit(false);
      else
        this.notificationStatus.emit(true);
      // else
      //   this.unreadNotifications = true;
    }).catch(error => this.alertService.alert('Info', error.message, 'error'));
    
  }

  getNotificationStatus(){        
  }

  onClose(){
    this.activeModal.close();
  }
}
