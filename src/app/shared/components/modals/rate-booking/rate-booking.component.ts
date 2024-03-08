import {Component, Input, OnInit} from '@angular/core';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rate-booking',
  templateUrl: './rate-booking.component.html',
  styleUrls: ['./rate-booking.component.scss']
})
export class RateBookingComponent {
  rateBook: any;
  submitting: boolean = false;
  review ={
		rating: 5,
		class_session_id:  0,
		comments:  "",
	}
  
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
    console.log('this.rateBook hrer here', this.rateBook);
    //this.review.class_session_id = this.rateBook.id;
  } 
  rate(num:number){
    this.review.rating = num;
  }

  //Rate the session of the class
  rateSession(){		
    this.review.class_session_id =  this.rateBook.id;    
    console.log('review content is here', this.review);
    this.loaderService.setLoading(true);   
    this.httpService.post('class-session-ratings', {rating: this.review.rating, class_session_id: this.review.class_session_id, comments: this.review.comments}).then((response: any)=>{
      this.submitting = true;		  
      this.loaderService.setLoading(false);      
      const title= "Success";
      const body = "Rate booking succeeded";
      this.alertService.alert(title, body, 'success');          
      this.onClose({bRateSession: true});
      //this.getMemberSubscriptions();      
    }).catch((error) => {
      this.loaderService.setLoading(false);    
      this.alertService.alert('Error', error.message, 'error');          
    });
	}
  
  onClose(data?: any){
    this.activeModal.close(data);
  }
}
