import {Component, Input, OnInit} from '@angular/core';
import {AppConfig } from 'src/app/shared/services/config/app.config';
import {User} from 'src/app/shared/models';
import {ConfigService} from 'src/app/shared/services/config/config.service';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {AlertService} from 'src/app/shared/services/alert/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-suspend-subscription',
  templateUrl: './suspend-subscription.component.html',
  styleUrls: ['./suspend-subscription.component.scss']
})
export class SuspendSubscriptionComponent {
  config: AppConfig = {};
  form: {name?: string; email?: string; message?: string } = {};
  submitting = false;
	return_date = "";  
  @Input() subs;
	param = {
		"subscription_id": 0,
		"suspension_days": 0,
		"suspension_date": ""
	};

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    console.log('config', this.config);
    this.param.subscription_id = this.subs.id;
    this.param.suspension_date =  moment().format('YYYY-MM-DD') ;
  }

  onClose(data?: any){
    this.activeModal.close(data);
  }  

  //Calculate the remaining date.
  calcReturnDate(){
		this.return_date =moment(this.param.suspension_date).add(this.param.suspension_days, 'days').format('YYYY-MM-DD');
	}

  //Suspend the subscription
  suspendSubscription():void{
    this.submitting = true;
		this.param.suspension_date = moment(this.param.suspension_date).format('YYYY-MM-DD');    
    console.log('subscription date', this.param.suspension_date);
    console.log('subscription subscription_id', this.param.subscription_id);
    this.loaderService.setLoading(true);   
    console.log('subscription id', this.param);
    this.httpService.post('suspend-subscription', {subscription_id: this.param.subscription_id, suspension_days: this.param.suspension_days,  suspension_date: this.param.suspension_date}).then((response: any)=>{
      this.loaderService.setLoading(false);                    
      const title= "Success";
      const body = "Suspend subscription succeeded";
      this.alertService.alert(title, body, 'success');                
      this.onClose({bSuspend: true});
      //this.getMemberSubscriptions();      
    }).catch((error) => {
      this.loaderService.setLoading(false);          
      this.alertService.alert('Error', error.message, 'error');          
    });        
  }
}
