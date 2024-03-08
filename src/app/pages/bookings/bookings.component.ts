import { AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { User } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { CancelBookingComponent } from 'src/app/shared/components/modals/cancel-booking/cancel-booking.component';
import { RateBookingComponent } from 'src/app/shared/components/modals/rate-booking/rate-booking.component';

import * as moment from 'moment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {};    	
  modalReference!: NgbModalRef;  

  // sessionlist = [];
	// appointmentlist = [];

  sessionlist = [
		// {english_class_name: 'test', arabic_class_name: 'test', 'trainer_banner': 'trainer banner', 'start_time': '2023-11-23', 'end_time': '2023-11-24', 'branch_name_en': 'brach name', 'branch_name_ar':'bracnch name br'},
		// {english_class_name: 'test', arabic_class_name: 'test', 'trainer_banner': 'trainer banner', 'start_time': '2023-11-23', 'end_time': '2023-11-24', 'branch_name_en': 'brach name', 'branch_name_ar':'bracnch name br'}
	];
	appointmentlist = [
		// {english_class_name: 'test', arabic_class_name: 'test', 'status': 'completed', id: 20},
		// {english_class_name: 'test', arabic_class_name: 'test','status': 'created', id: 30},
	];

	selected_tab :number = 1;
	session_date = moment().format('YYYY-MM-DD') ;  
  branch_id = 0;
  constructor(
    private title: Title,
		private meta: Meta,
    private httpService: HttpService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertService: AlertService,    
    private loaderService: LoaderService,
    private coreTranslationService: CoreTranslationService
  ) {
  }

  ngOnInit() {    
    this.title.setTitle(this.coreTranslationService.translateText('Bookings - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Bookings - Box12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    console.log('config branch=====', this.configService.appSettingsValues);
    this.user = this.config.user || {};    
    this.branch_id = this.config.user.default_branch;  
    console.log('session date here1111111', this.session_date);
    this.getMemberBookings();
	  this.getMemberPTSessions();
  }

  ngAfterViewInit() {}

  selectTab (tab:number):void{
		this.selected_tab = tab;
	}

  //get the booking list
  getMemberBookings(){
    this.loaderService.setLoading(true);    
    this.httpService.post('member-bookings', {branch_id: this.branch_id}).then((response: any)=>{
      this.loaderService.setLoading(false);     
      console.log('member booking~~11111', response);      
      console.log('member booking branch ID', this.branch_id);      
      this.appointmentlist = response;      
    }).catch((error) => {
      this.loaderService.setLoading(false);   
      this.appointmentlist = [];       
      this.alertService.alert('Error', error.message, 'error');
    });
  }  

  //get the classes list
  getMemberPTSessions(){
    this.loaderService.setLoading(true);    
    this.httpService.post('branch/member/subscription/sessions', {branch_id: this.branch_id, session_date: this.session_date}).then((response: any)=>{
      this.loaderService.setLoading(false);     
      console.log('getMemberPTSessions~~11111', response);
      console.log('getMemberPTSessions branch ID', this.branch_id);      
      console.log('session_date', this.session_date);  
      const title= "Success";
      const body = "Get member PT session succeeded";
      //this.alertService.alert(title, body, 'success');
      this.sessionlist = response;
    }).catch((error) => {
      this.loaderService.setLoading(false);   
      this.sessionlist = []; 
      this.alertService.alert('Error', error.message, 'error');
    });
  }

  //rate booking
  rateBooking(appointment){
    this.modalReference = this.modalService.open(RateBookingComponent, { centered: true, size: 'lg'});
    this.modalReference.componentInstance.rateBook = appointment;
    
    this.modalReference.result.then((result) => {
      if (result && result.bRateSession) {        
        this.getMemberPTSessions();
      }  
    }, (reason) => {
      console.log('reason', reason);      
    }); 
    this.modalReference.hidden.subscribe(()=>{
      
    });  
  }

  //cancel booking
  cancelBooking(appointment){
    this.modalReference = this.modalService.open(CancelBookingComponent, { centered: true, size: 'lg'});
    this.modalReference.componentInstance.cancelBook = appointment;
    this.modalReference.result.then((result) => {
      if (result && result.bCancelBooking) {
        console.log('cancel  booking here', result.bCancelBooking);
        this.getMemberBookings();
      }  
    }, (reason) => {
      console.log('reason', reason);      
    }); 
    this.modalReference.hidden.subscribe(()=>{
      
    });  
  }

  onEvent(event){
    console.log('session changed');
		this.getMemberBookings();
	}

}
