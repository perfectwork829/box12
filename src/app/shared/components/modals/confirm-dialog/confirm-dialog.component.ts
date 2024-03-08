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
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() config: AppConfig = {};
  form: {phone?: string; email?: string; branch?: number, date?: string} = {};
  personalTraining: any;
  submitting = false;
	availableSeats = 0;
  
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
  ngOnInit(): void {
		this.getSessionsSeats();
	}

  //Book the Personal training
  reserveSeat(){
    this.loaderService.setLoading(true);
    this.submitting = true;
    
    console.log(this.personalTraining);
    this.loaderService.setLoading(true);  
    this.httpService.post('book', {class_session_id: this.personalTraining.id, 'product_id':this.personalTraining.product_id}).then((response: any)=>{
      this.loaderService.setLoading(false);                                
      this.submitting = false;      
      const bookMsg = "Booked successfully";
			this.alertService.alert('Booking', bookMsg, 'success');			
      this.onClose({bBooking: true}); 	
    }).catch((err) => {      
        console.log(err);                
        this.loaderService.setLoading(false); 
        this.alertService.alert('Booking', err.message, 'error');        
    });
  }

  //Get count of the available seat
  getSessionsSeats(){        
    this.loaderService.setLoading(false);
    this.httpService.post('class-sessions/count', {class_session_id: this.personalTraining.id}).then((response: any)=>{
      console.log('response here', response);            
			this.availableSeats=parseInt(response.capacity) - parseInt(response.bookings_count);	
    }).catch((err) => {
      this.submitting = false;   
      console.log(err);                        
    });    
  }  
  onClose(data?: any){
    this.activeModal.close(data);
  }
}
