import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { User } from 'src/app/shared/models';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { ForgetPasswordComponent } from 'src/app/shared/components/auth/forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  @Input() config: AppConfig = {};
  @Input() user: User = {};
  showHidePassword: boolean = false;
  modalReference!: NgbModalRef;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    console.log('config', this.config);
  }


  onClose(data?: any){    
    this.activeModal.close(data);   
  }

  //Open the forget the password
  forgetPassword(){    
    this.activeModal.dismiss();
    this.modalReference = this.modalService.open(ForgetPasswordComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.user = this.user;
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {
      
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //Open the forget the login
  onLogin(){
    if(!this.user.mobile) return this.alertService.alert('Login','Please enter your phone number', 'error');
    if(this.user.mobile.length !== 10 && !this.user.mobile.startsWith('0')) return this.alertService.alert('Login','Phone number is incorrect', 'error');
    if(!this.user.password) return this.alertService.alert('Login','Please enter your password', 'error');
    if(!this.user.password.length) return this.alertService.alert('Login','Please enter your password', 'error');
    this.user.preferred_language = this.config.selectedLanguage?.code;
    this.httpService.post('auth/login', this.user).then((response: any) => {
      if(response.token) this.config.token = response.token;
      if(response.member) this.config.user = response.member;
      this.configService.setAppConfig(this.config);
      this.alertService.alert('Login', 'Welcome Back', 'success');
      this.onClose();
    }).catch(error => this.alertService.alert('Login', error.message, 'error'));
  }

}
