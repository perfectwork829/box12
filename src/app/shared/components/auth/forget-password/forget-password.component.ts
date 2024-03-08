import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { User } from 'src/app/shared/models';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { ResetPasswordComponent } from 'src/app/shared/components/auth/reset-password/reset-password.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  @Input() config: AppConfig = {};
  @Input() user: User = {};
  @Input() mobile_phone: string = "";
  @Input() otp_code: string = "";
  showHidePassword: boolean = false;
  modalReference!: NgbModalRef;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    console.log('config', this.config);
  }

  onClose(data?: any){    
    this.activeModal.close(data);   
  }

  //Send the OTP code
  sendRestCode(){    
    if(!this.user.mobile) return this.alertService.alert('Login','Please enter your phone number', 'error');
    if(this.user.mobile.length !== 10 && !this.user.mobile.startsWith('0')) return this.alertService.alert('Login','Phone number is incorrect', 'error');    

    this.httpService.post('verify/send-otp', {mobile: this.user.mobile, client_id: this.httpService.client_id})
    .then((response: any)=>{
      console.log('response here', response);
      this.loaderService.setLoading(true);
      if(response.status){
        this.activeModal.dismiss();
        this.modalReference = this.modalService.open(ResetPasswordComponent, { centered: true, size: 'lg' });
        this.modalReference.componentInstance.mobile_phone = this.user.mobile;
        this.modalReference.componentInstance.config = this.config;
        this.modalReference.componentInstance.otp_code = response.data;
        
        this.modalReference.result.then((result) => {
          console.log('console result response', result) ;
          this.loaderService.setLoading(false);
        }, (reason) => {
          console.log('reason', reason);
        });
      }            
    }).catch((err) => {      
      console.log(err);                        
    });    
  }
}
