import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-referral-code',
  templateUrl: './referral-code.component.html',
  styleUrls: ['./referral-code.component.scss']
})
export class ReferralCodeComponent {
  @Input() config: AppConfig = {};
  referral_code="3d78021";  
  data_count: any = '10';
  constructor(
    public activeModal: NgbActiveModal,
    private configService: ConfigService,
    private loaderService: LoaderService,    
    private httpService: HttpService,
    private alertService: AlertService,
    private clipboardService: ClipboardService
  ){
    this.loaderService.setLoading(true);    
    this.httpService.get('profile').then((response: any) => {
      this.loaderService.setLoading(false);      
      if(response){
        if (!response) {
          console.log('get_non_profile');
          return;
        }
        this.referral_code = response.referral_code;
        this.data_count = response.number_of_use_referral_code;        
      }
    }).catch(error => this.alertService.alert('Login', error.message, 'error'));
  }
  ngOnInit() {

  }

  onClose(){
    this.activeModal.close();
  }

  copyToClipboard() {   
    this.alertService.alert('Copy the Code', "Copied the referral code", 'success');
  }

  //Copy the Referral Code to the clipboard
  copyContent() {
    this.clipboardService.copyFromContent(this.referral_code);
  }  
}
