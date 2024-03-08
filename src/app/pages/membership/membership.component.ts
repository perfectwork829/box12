import { AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { SuspendSubscriptionComponent } from "src/app/shared/components/modals/suspend-subscription/suspend-subscription.component";
import { CancelBookingComponent } from "src/app/shared/components/modals/cancel-booking/cancel-booking.component";
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {};    

  modalReference!: NgbModalRef;  
  
  //test
  slist = [
      // {id:1,title: "عضوية 3 أشهر", start_date:"23 May 2023",expire_date:"23 Aug 2023", price:5999, status: true,banner:'exercise1.png'},
      // {id:2,title: "عضوية شهر", start_date:"12 May 2023",expire_date:"12 Aug 2023", price:4999, status: false,banner:'exercise2.png'},
      // {id:3,title: "عضوية 3 أشهر", start_date:"23 May 2023",expire_date:"23 Aug 2023", price:3565, status: false,banner:'exercise1.png'},
      // {id:4,title: "عضوية 3 أشهر", start_date:"1 May 2023",expire_date:"23 May 2023", price:1112, status: true,banner:'exercise2.png'},      
  ];

  // slist = [];

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
    this.getMemberSubscriptions();
  }

  ngOnInit() {    
    this.title.setTitle(this.coreTranslationService.translateText('Membership - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Membership - Box12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};
  }

  ngAfterViewInit(){

  }

  //Get the all member's subscriptions.
  getMemberSubscriptions(){    
    console.log('membership result start!!');
    this.loaderService.setLoading(true);    
    this.httpService.post('member/subscriptions', {}).then((response: any)=>{
      this.loaderService.setLoading(false);    
      console.log('membership result', response);
      if (!response) {
        const type = 'error';
        const title= "Get member subscription failed111";
        const body = "Something went wrong";
				this.alertService.alert(title, body, 'error');
				return;
			}else{        
				this.slist = response;        
			} 
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });    
  }  
 
  //Reactivate subscriptions
  reactivateSubscription(subs){      
    const personalConfirm = this.alertService.confirm('Buy PT Session', 'not_subscribed_buy_pt_session', 'Activate');
    personalConfirm.then((result) => {
      if (result.isConfirmed) {
        // Call your function here when the user clicks "Yes"
        this.loaderService.setLoading(true);   
        this.httpService.post('reactivate-subscription', {subscription_id: subs.id }).then((response: any)=>{
          this.loaderService.setLoading(false);                    
          const title= "Success";
          const body = "Succeed to reactivate.";
          this.alertService.alert(title, body, 'success');          
          this.getMemberSubscriptions();      
        }).catch((error) => {
          this.loaderService.setLoading(false);    
          this.alertService.alert('Infomration', error.message, 'error');          
        });        
      }else{
        console.log('cancelled it.');       
      }
    });
  }

   //Suspend subscriptions
   suspendSubscription(subs){    
    this.modalReference = this.modalService.open(SuspendSubscriptionComponent, { centered: true, size: 'lg'});
    this.modalReference.componentInstance.subs = subs;
    this.modalReference.result.then((result) => {      
      if (result && result.bSuspend) {            
       this.getMemberSubscriptions();      
      }      
    }, (reason) => {
      console.log('reason', reason);      
    }); 
    this.modalReference.hidden.subscribe(()=>{
      
    });   
  }

  //Cancel subscriptions
  cancelSubscription(subs){      
    console.log('sub cancel here', subs);
    this.modalReference = this.modalService.open(CancelBookingComponent, { centered: true, size: 'lg'});
    this.modalReference.componentInstance.cancelBook = subs;
    this.modalReference.result.then((result) => {
      console.log('result code1', result);
      if (result && result.bSuspend) {        
        this.getMemberSubscriptions();      
       }           
    }, (reason) => {
      console.log('reason', reason);      
    }); 
    this.modalReference.hidden.subscribe(()=>{
      
    }); 
  }
}
