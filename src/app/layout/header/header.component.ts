import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { User } from 'src/app/shared/models';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/shared/components/auth/login/login.component';
import { SignupComponent } from 'src/app/shared/components/auth/signup/signup.component';
import { LanguageComponent } from 'src/app/shared/components/modals/language/language.component';
import { ProfileComponent } from 'src/app/shared/components/modals/profile/profile.component';
import { ContactFormComponent } from 'src/app/shared/components/modals/contact-form/contact-form.component';
import { NotificationsComponent } from 'src/app/shared/components/modals/notifications/notifications.component';
import { FreeTrialComponent } from 'src/app/shared/components/modals/free-trial/free-trial.component';
import { Router } from '@angular/router';
import {DOCUMENT} from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  core$!: Subscription;
  config: AppConfig = {};
  user: User = {};
  modalReference!: NgbModalRef;
  language: any = {};
  isLoggedIn :boolean = false;
  unreadNotifications: boolean = false;
  isHidden: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private configService: ConfigService,
    private modalService: NgbModal,
    private httpService: HttpService,
    private alertService: AlertService,
    private router: Router
  ) {    
  }

  ngOnInit() {        
    this.core$ = this.configService.getAppConfigObservable().subscribe(config =>{
      
      if(!config) return;
      this.config = config;
      this.user = this.config.user || {};      
      
      if(this.config.token!=undefined){
        if(this.config.token !== ""){
          this.isLoggedIn = true;
        }
      }else{
        this.isLoggedIn = false;
      }
      console.log('configure', this.config.isTrial);
      console.log('isLoggedIn', this.isLoggedIn);
      console.log('this.user.token', this.user.token);
      this.language = this.config.availableLanguages.find(element => element.code !== this.config.selectedLanguage.code);      
    });
    if(!this.config.isTrial)
      this.onFreeTrial();          
    if(this.isLoggedIn)
      this.getNotificationStatus();
  }

  //Open Language modal
  onLanguageChange(){
    this.modalReference = this.modalService.open(LanguageComponent, { centered: true, size: 'lg'});
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {
      if (result && result.code) {
        if(result.code === this.config.selectedLanguage.code) return;
        this.config.isArabic = result.direction === 'rtl';
        this.config.selectedLanguage = result;
        this.configService.setAppConfig(this.config);
        location.reload();
      }      
    }, (reason) => {
      console.log('reason', reason);      
    }); 
    this.modalReference.hidden.subscribe(()=>{
      //location.reload();
    });   
  }

  //logout 
  onLogout(){
    this.httpService.post('auth/logout', this.user).then((response: any) => {
      this.configService.logout();
      this.alertService.alert('Logout', 'We hope to see you soon', 'success');
    }).catch(error => this.alertService.alert('LogOut', error.message, 'error'));
  }

  //login
  onLogin() {
   this.modalReference = this.modalService.open(LoginComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.user = this.user;
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {
      console.log('modalOpenLogin', result);
      if (result && result.signup) this.onSignUp();      
    }, (reason) => {
      console.log('reason', reason);
    });
  }


  onOpenProfile() {
    this.modalReference = this.modalService.open(ProfileComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.user = this.user;
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {
      if (result && result.logout) this.onLogout();
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //Show the signup modal
  onSignUp() {
    let currentRoute = this.router.url.replace(/\#.*/gi, '').replace('/', '');
    if(currentRoute === '') currentRoute = 'home';
    console.log(currentRoute);
    this.modalReference = this.modalService.open(SignupComponent, { centered: true, size: 'xl' });
    this.modalReference.componentInstance.user = this.user;
    this.modalReference.componentInstance.selectedProduct = null;
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.componentInstance.type = currentRoute;
    this.modalReference.result.then((result) => {
      console.log('modalOpenLogin', result);
      if (result && result.signup) {

      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  ngOnDestroy(): void {
    if(this.core$) this.core$.unsubscribe();
  }

  onMenuClicked(){
    const canvasWrapper = this.document.getElementsByClassName("off-canvas-wrapper")[0] as HTMLHtmlElement;
    canvasWrapper.classList.add('active');
    $('.main-menu').slicknav({
      appendTo: '.res-mobile-menu',
      closeOnClick: true,
      removeClasses: true,
      closedSymbol: '<i class="fa fa-angle-down"></i>',
      openedSymbol: '<i class="fa fa-angle-up"></i>'
    });
  }

  //closed the menu
  onMenuClosed(){
    const canvasWrapper = this.document.getElementsByClassName("off-canvas-wrapper")[0] as HTMLHtmlElement;
    canvasWrapper.classList.remove('active');
  }

  //Show the contact US modal
  onContactUs() {
    this.modalReference = this.modalService.open(ContactFormComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {
      console.log('onContactUs', result);
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //Show the Free Trial modal
  onFreeTrial() {
    this.modalReference = this.modalService.open(FreeTrialComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {
      console.log('FreeTrialComponent', result);
      if (result) {

      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //hide the notification bar
  hideContent() {
    this.isHidden = true;
  }

  //Show the notification list
  onNotificationsCheck(){
    this.hideContent();
    this.modalReference = this.modalService.open(NotificationsComponent, { centered: true, size: 'lg'});
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.componentInstance.blang = this.config.isArabic;
    this.modalReference.result.then((result) => {
      if (result && result.code) {
        if(result.code === this.config.selectedLanguage.code) return;
        this.config.isArabic = result.direction === 'rtl';
        this.config.selectedLanguage = result;
        this.configService.setAppConfig(this.config);
        location.reload();
      }      
    }, (reason) => {
      console.log('reason', reason);      
    }); 
    this.modalReference.hidden.subscribe(()=>{
      //location.reload();
    }); 
  }

  //Get the notification status
  getNotificationStatus(){        
    this.httpService.get('member/notifications/status').then((response: any) => {      
      if(response.unreadNotifications==0)
        this.unreadNotifications = true;
      else
        this.unreadNotifications = false;

      console.log('notification status', this.unreadNotifications);
    }).catch(error => this.alertService.alert('Info', error.message, 'error'));
  }
}
