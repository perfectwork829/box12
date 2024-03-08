import { AfterViewInit, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { CancelBookingComponent } from 'src/app/shared/components/modals/cancel-booking/cancel-booking.component';
import { RateBookingComponent } from 'src/app/shared/components/modals/rate-booking/rate-booking.component';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-items',
  templateUrl: './booking-items.component.html',
  styleUrls: ['./booking-items.component.scss']
})
export class BookingItemsComponent {
  @Input() classes: {name: string, image: string, duration: string}[] = [];  
  @Input() sessionlist: any = [];
  @Input() appointmentlist: any = [];    
  @Output() cancelBooking: EventEmitter<any> = new EventEmitter();
  @Output() rateBooking: EventEmitter<any> = new EventEmitter();  
  @Output() changeDate: EventEmitter<any> = new EventEmitter();
  
  config: AppConfig = {};
  selected_tab :number = 1;  
  session_date = moment().format('YYYY-MM-DD') ;
  branch_id = 4;
  isLangflag: boolean = false;
  constructor(    
    private httpService: HttpService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertService: AlertService,    
    private router: Router,
    private loaderService: LoaderService,
    private coreTranslationService: CoreTranslationService
  ) {
  }

  ngOnInit(){    
    this.config = this.configService.appSettingsValues;   
    this.isLangflag = this.config.isArabic;     
    this.branch_id = this.config.user.default_branch;
  }

  ngAfterViewInit(){
  }

  sendDateDate(){
    console.log('changed here');
    const session_data = this.session_date;
    this.changeDate.emit(session_data);    
  }

  //Get the Classes list
  getMemberPTSessions(){
    this.loaderService.setLoading(true);                
    this.httpService.post('branch/member/subscription/sessions', {branch_id: this.branch_id, session_date: this.session_date}).then((response: any)=>{
      this.loaderService.setLoading(false);     
      console.log('member booking~~22222', response);
      console.log('branch id~~22222', this.branch_id);
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
  
  //Get the Class list by the date.
  receiveSessionDate(data: any) {
    console.log('changed dated');
    console.log('check booking component here', this.session_date);
    
    this.session_date = data;    
    this.getMemberPTSessions();
  }

  //Tab setting
  selectTab (tab:number):void{
		this.selected_tab = tab;
	}
}
