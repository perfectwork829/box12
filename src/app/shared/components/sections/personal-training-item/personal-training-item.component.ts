import {AfterViewInit, Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { ConfirmDialogComponent } from "src/app/shared/components/modals/confirm-dialog/confirm-dialog.component";
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import * as moment from 'moment';

@Component({
  selector: 'app-personal-training-item',
  templateUrl: './personal-training-item.component.html',
  styleUrls: ['./personal-training-item.component.scss']
})
export class PersonalTrainingItemComponent implements OnInit, AfterViewInit{
  @Input() personalTrainings: []= [];
  @Input() config: AppConfig = {};  
  @Input() bBlock: boolean = true;
  @Output() onPersonalItemsSelected: EventEmitter<any> = new EventEmitter();
  @Output() changeDate: EventEmitter<any> = new EventEmitter();
     
  session_date = moment().format('YYYY-MM-DD');
  modalReference!: NgbModalRef;
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

  //Get the session data by the date
  sendDateDate(){        
    const session_data = this.session_date;
    console.log('changed here', session_data);
    this.changeDate.emit(session_data);
    //this.showClassDetail();
  }

  //Show the detailed class data
  showClassDetail(personal: any){
    console.log(personal);
    if (!personal.subscribed){
      const personalConfirm = this.alertService.confirm('Buy PT Session', 'not_subscribed_buy_pt_session', 'Buy');
      personalConfirm.then((result) => {
        if (!result.isConfirmed) {
          // Call your function here when the user clicks "Yes"
          this.router.navigate(['/products']);
        }else{
          console.log('cancelled it.')
        }
      });
    }else{
      this.modalReference = this.modalService.open(ConfirmDialogComponent, { centered: true, size: 'md' });
      this.modalReference.componentInstance.personalTraining = personal;                      
      this.modalReference.result.then((result) => {
        console.log('modalOpenLogin', result);
        if (result && result.bBooking) {              
          
          setTimeout(function(){
            location.reload();
          }, 2000);
          //this.onPersonalItemsSelected.emit();
        }
      }, (reason) => {
        console.log('reason', reason);
      }); 
    }   
  }

  ngOnInit() {
    this.isLangflag = this.config.isArabic;    
  }
  
  ngAfterViewInit(){
    console.log('bBlock1 here', this.bBlock);
  }
}
