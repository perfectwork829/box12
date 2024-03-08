import { AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User, TimeSession } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import * as moment from 'moment';

@Component({
  selector: 'app-personal-training',
  templateUrl: './personal-training.component.html',
  styleUrls: ['./personal-training.component.scss']
})
export class PersonalTrainingComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {}; 
  bBlock: boolean = true;   
  
  session_date = moment().format('YYYY-MM-DD');
	branch_id = 0;
  modalReference!: NgbModalRef;  
  
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
  }

  //test
  personalTrainings : TimeSession[] = [
    // {id: 1, class_name:"لياقة بدنية",trainer_name:"مع كورن",branch_name:"Al-sahafa male",time:"4:00-5:00",count:4,photo:"person1.png", trainer_banner: "tset"},
    // {id: 1, class_name:"Cross-training",trainer_name:"مع سارة حسام",branch_name:"Al-sahafa male",time:"4:00-5:00",count:3,photo:"person2.png", trainer_banner: "tset"},
    // {id: 1, class_name:"Cross-fit",trainer_name:"مع ماركوس",branch_name:"Al-sahafa male",time:"4:00-5:00",count:4,photo:"person1.png", trainer_banner: "tset"},
    // {id: 1, class_name:"Cross-training",trainer_name:"مع راسم",branch_name:"Al-sahafa male",time:"4:00-5:00",count:8,photo:"person2.png", trainer_banner: "tset"},
    // {id: 1, class_name:"Cross-training",trainer_name:"مع راسم",branch_name:"Al-sahafa male",time:"4:00-5:00",count:0,photo:"person1.png", trainer_banner: "tset"},
    // {id: 1, class_name:"Cross-fit",trainer_name:"مع ماركوس",branch_name:"Al-sahafa male",time:"4:00-5:00",count:5,photo:"",trainer_banner: "tset"}
  ];

  ngOnInit() {
    console.log('start on init function!!!');
    this.title.setTitle(this.coreTranslationService.translateText('Trainers - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Trainers - Box12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};    
    this.branch_id = this.config.user.default_branch;
    console.log('branch id', this.branch_id);
    const today = moment();
    console.log('bsession_date', today.format());
    this.onFetchPersonalTraining();    
  }

  ngAfterViewInit() {}

  //Get the session list by the date
  receiveSessionDate(data: any) {
    this.session_date = data;      
    this.onFetchPersonalTraining();
  }

  //Get the personal Training data
  onFetchPersonalTraining(){    
    this.loaderService.setLoading(true);    
    this.httpService.post('branch/member/pt/allsessions', {branch_id: this.branch_id, session_date: this.session_date }).then((response: any)=>{
      this.loaderService.setLoading(false);                 
      const title= "Success";
      const body = "Get PT session succeeded";
      //this.alertService.alert(title, body, 'success');        
      this.personalTrainings = response;
    }).catch((error) => {
      this.loaderService.setLoading(false);   
      this.personalTrainings = [];       
      this.alertService.alert('Error', error.message, 'error');
    }); ;
  }    
}
