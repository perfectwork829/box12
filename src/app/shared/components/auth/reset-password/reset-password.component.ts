import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { User } from 'src/app/shared/models';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoginComponent } from 'src/app/shared/components/auth/login/login.component';
import { SignupComponent } from 'src/app/shared/components/auth/signup/signup.component';
import { ForgetPasswordComponent } from 'src/app/shared/components/auth/forget-password/forget-password.component';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  @Input() config: AppConfig = {};
  @Input() user: User = {};  
  @Input() mobile_phone: string = "";  
  @Input() otp_code: string = "";  
  
  showHidePassword: boolean = false;
  modalReference!: NgbModalRef;

  newData = {
      mobile: '',
      otp: '',
      password: '',
      client_id: 0
  };

  confirm_password = '';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private loaderService: LoaderService,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log('config', this.config);
    this.newData.mobile = this.mobile_phone;
  }


  onClose(data?: any){    
    this.activeModal.close(data);   
  }

  //Open the login form
  loginForm(){    
    this.activeModal.dismiss();
    this.modalReference = this.modalService.open(LoginComponent, { centered: true, size: 'lg' });    
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {      
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //Open the login Signup modal
  signupForm(){
    this.activeModal.dismiss();
    let currentRoute = this.router.url.replace(/\#.*/gi, '').replace('/', '');
    if(currentRoute === '') currentRoute = 'home';
    console.log(currentRoute);
    this.modalReference = this.modalService.open(SignupComponent, { centered: true, size: 'xl' });
    this.modalReference.componentInstance.user = this.user;
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

  //Reset password
  resetPassword(){
    if(!this.newData.mobile) return this.alertService.alert('Login','Please enter your phone number', 'error');
    if(this.newData.mobile.length !== 10 && !this.user.mobile.startsWith('0')) return this.alertService.alert('Login','Phone number is incorrect', 'error');
    if(!this.newData.password) return this.alertService.alert('Login','Please enter your password', 'error');
    if(!this.newData.password.length) return this.alertService.alert('Login','Please enter your password', 'error');
    if(this.newData.password !== this.confirm_password) return this.alertService.alert('Login','Confirm password is not matched with the password', 'error');
    const otp = this.otp_code;
    this.newData.client_id = this.httpService.client_id;    
    this.httpService.post('member/reset-password', { ...this.newData, otp }).then((response: any) => {      
      this.alertService.alert('Reset Password', 'Reset password successfully', 'success');
      this.loginForm();
      this.onClose();
    }).catch(error => this.alertService.alert('Reset Password', error.message, 'error'));
  }

  //Open the forget password Form
  resendCode(){
    this.activeModal.dismiss();
    console.log('response password');
    this.loaderService.setLoading(false);
    this.modalReference = this.modalService.open(ForgetPasswordComponent, { centered: true, size: 'lg' });        
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {      
    }, (reason) => {
      console.log('reason', reason);
    });
  }
}
