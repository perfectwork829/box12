import {Component, Input, OnInit} from '@angular/core';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { Product } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.scss']
})
export class CancelBookingComponent {
  @Input() cancelBook: any;
  submitting = true;
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

  }

  //Cancel Booking
  cancelBooking(cancelBook){
		this.submitting = true;		
    this.loaderService.setLoading(true);   
    this.httpService.post('cancel-book', {booking_id: cancelBook}).then((response: any)=>{
      this.loaderService.setLoading(false);                    
      const title= "Booking";
      const body = "Cancelled booking successfully.";
      this.alertService.alert(title, body, 'success');      
      this.onClose({bCancelBooking: true});    
      //this.getMemberSubscriptions();      
    }).catch((error) => {
      this.loaderService.setLoading(false);    
      this.alertService.alert('Booking', error.message, 'error');     
      this.onClose({bCancelBooking: true});       
    });
	}
  
  onClose(data?: any){
    this.activeModal.close(data);
  }
}
