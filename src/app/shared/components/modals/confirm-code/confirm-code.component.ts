import {Component, Input, OnInit} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import {User} from 'src/app/shared/models';
import {ConfigService} from 'src/app/shared/services/config/config.service';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {AlertService} from 'src/app/shared/services/alert/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import * as moment from 'moment';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent {
  @Input() config: AppConfig = {};
  @Input() phoneNumber: string = "";
  form: {name?: string; email?: string; message?: string } = {};
  user = {
		mobile: '',
		otp: '',
		client_id : 3,
	};
  phone_verified : boolean = false;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    public activeModal: NgbActiveModal
  ) {
    
  }

  ngOnInit() {    
    this.user.mobile = this.phoneNumber;    
    this.sendOTP();
  }

  onClose(data?: any){
    this.activeModal.close(data);
  }

  //send the phone's OTP code
  sendOTP(){    
    console.log('send OTP code');
    this.loaderService.setLoading(true);   
        
    this.httpService.post('verify/send-otp', {mobile : this.user.mobile, client_id: this.user.client_id}).then((response: any)=>{
      this.loaderService.setLoading(false);                          
      if(response.status){
        const body = "Sent OTP successfully";
        const title= "Success";
        console.log('send otp code', response);        
        this.alertService.alert(title, body, 'success');          
      }else{
        const body = "Something went wrong";
        const title= "Opps";
        console.log('send otp code', response);        
        this.alertService.alert(title, body, 'success'); 
      }
    }).catch((error) => {
      this.loaderService.setLoading(false);    
      console.log('error send otp code');
      this.alertService.alert('Error', error.message, 'error');          
    });            
  }

  //check the phone't OTP code
  checkOTP(){
    //this.submitting = true;		
    console.log('check OTP code');
    this.loaderService.setLoading(true);   
    this.httpService.post('verify/verify-otp', {mobile : this.user.mobile, client_id: this.user.client_id, otp:this.user.otp}).then((response: any)=>{
      this.loaderService.setLoading(false);                    
      const title= "Success";
      const body = "Phone number verfied successfully";
      this.alertService.alert(title, body, 'success');                
      console.log('check otp code', response);
      this.phone_verified = true;
      this.onClose();
    }).catch((error) => {
      this.loaderService.setLoading(false);    
      this.alertService.alert('Error', error.message, 'error');          
    });            
  }
}
