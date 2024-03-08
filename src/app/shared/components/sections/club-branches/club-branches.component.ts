import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { Branch } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-club-branches',
  templateUrl: './club-branches.component.html',
  styleUrls: ['./club-branches.component.scss']
})
export class ClubBranchesComponent {
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
    this.loaderService.setLoading(true);
    this.onSearchBranch();    
  }

  config: AppConfig = {};
  user: User = {};
  IsArabic: boolean = false;
  cOption: boolean = true;
  keyword: string = "";
  branches: Branch[] = [
      { name_ar: 'Pulse & Power Gym',name_en: 'Pulse & Power Gym', address1: 'شارع موسى بن نصير، العليا، الرياض 12241، المملكة العربية السعودية',address2 : '', 
      id: 100,email: 'pulsepowergym@hotmail.com',startup_date: '2023-05-01',branch_capacity: 100, branch_category:'الفرع الرئيسي',location_type:'رجال',lat: 24.800569,lng:46.647642,phone:"123456789",city_id:2 }
  ];

  selectedBranch : Branch = this.branches[0];
  reviewStar: number = 0;
  submitting = false;  
  
  ngOnInit(){
    this.title.setTitle(this.coreTranslationService.translateText('Branches - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Branches - Box12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};      
    this.loaderService.setLoading(true);  
   this.IsArabic = this.config.isArabic;  
  }

  ngAfterViewInit(){

  }

  //load Club
  loadClub(data):void{
    let club = data.club;
    let rd = data.rd;
    this.selectedBranch = club;
    if (rd == 'detail'){ // open club detail
      this.cOption = true;
    }else{ // open club review
      this.cOption = false;
    }
    this.cOption = true;
    this.reviewStar = 0;
  }

  review(num:number){
    this.reviewStar = num;
  }
  
  //Search branch by the string value
  onSearchBranch(searchValue: string = ""): void {
    this.keyword = searchValue;
    this.loaderService.setLoading(true);   
    console.log('this.httpService.client_id', this.httpService.client_id);
    this.httpService.post('branches', {keyword: this.keyword, client_id: this.httpService.client_id}).then((response: any)=>{      
      this.loaderService.setLoading(false);   
      this.branches = response;          
    }).catch((error) => {      
      this.alertService.alert('Error', error.message, 'error');
    });  
    this.loaderService.setLoading(false);    
  }

  rateSession():void{    
    let data = {rating: this.reviewStar,comment: ''};
  }

}
