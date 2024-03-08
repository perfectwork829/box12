import {Component, Input, OnInit} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import {ConfigService} from 'src/app/shared/services/config/config.service';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {AlertService} from 'src/app/shared/services/alert/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  @Input() config: AppConfig = {};
  @Input() termsConditions: string = "";
  
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    private loaderService: LoaderService,
    public activeModal: NgbActiveModal
  ) {    
    
  }

  ngOnInit() {        
    //this.sendOTP();
    this.getTermsConditions(this.termsConditions);
  }

  onClose(data?: any){
    this.activeModal.close(data);
  }

  //Get the terms and condition's content
  getTermsConditions(terms_option){    
    if(terms_option === 'signup_form'){          
      this.loaderService.setLoading(true);
      this.httpService.get('web/terms-and-conditions').then((response: any)=>{
        this.loaderService.setLoading(false);        
        if(this.config.isArabic)
          this.termsConditions = response.terms_and_conditions_arabic.replace(/•/g, '');        
        else
          this.termsConditions = response.terms_and_conditions.replace(/•/g, '');        
      }).catch((error) => {
        this.loaderService.setLoading(false);    
        this.termsConditions = 'I won\'t accept this terms';        
        this.alertService.alert('Error', error.message, 'error');          
      });   
    }else{            
      this.termsConditions =  terms_option;
    }                
  }
}
