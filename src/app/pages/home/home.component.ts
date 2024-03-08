import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { Product } from 'src/app/shared/models';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { User } from 'src/app/shared/models';
import { CheckOutComponent } from "src/app/shared/components/modals/check-out/check-out.component";
import { SignupComponent } from "src/app/shared/components/auth/signup/signup.component";

import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {};
  trainers: any[] = [];  
  partners: any[] = [];  
  subscriptions: Product[]= [];
  programs: any[] = [];
  modalReference!: NgbModalRef;

  subscribers: any = [
    {
      name: 'subscription_month', price:1449, descriptions:['Expires after 90 days', 'Expires after 90 days', 'Expires after 90 days'], amount: 3
    },
    {
      name: 'subscription_month', price:2650, descriptions:['Expires after 90 days', 'Expires after 90 days', 'Expires after 90 days'], amount: 6    
    },
    {
      name: 'subscription_month', price:4500, descriptions:['Expires after 90 days', 'Expires after 90 days', 'Expires after 90 days'], amount: 12
    },
  ]

  workouts: any = [
    {
      id: 1, image: 'assets/img/icons/heart_rate_gold.png', description: 'Our_training_environment_trainers'    
    },
    {
      id: 2, image: 'assets/img/icons/thumb_gold.png', description: 'Organized_time-efficient_enthusiasm'    
    },
    {
      id: 3, image: 'assets/img/icons/variety_gold.png', description: 'A_club_technologies'    
    },
    {
      id: 4, image: 'assets/img/icons/speech_bubbles_gold.png', description: 'The_enthusiastic_goals'    
    },
    {
      id: 5, image: 'assets/img/icons/Stopwatch_gold.png', description: 'The_small_group_challenging_you'    
    },
    {
      id: 6, image: 'assets/img/icons/heart_rate_gold.png', description: 'Varied_experiences_week'    
    },
  ]

  exercises: any = [
    {
      id: 1, name: 'ABS BLAST', description: 'This_30_minute_workout_not-so-familiar_exercises'    
    },
    {
      id: 2, name: 'BODY FUSION', description: 'Body_Fusion_will_define_every_inch_of_sense_well-being'    
    },
    {
      id: 3, name: 'META BOX', description: 'This_new_high-energy_your_mind_every_inch_of_your_body'    
    },
    {
      id: 4, name: 'HIIT', description: 'Our_HIIT_workouts_alternate_our_HIIT_classes'    
    },
    {
      id: 5, name: 'LEGS BUMS & TUMS', description: 'This_class_feeling_energised'    
    },
    {
      id: 6, name: 'STRETCH & RECOVERY', description: 'How_often_mobility'    
    },
    {
      id: 7, name: 'LIFT', description: 'In_this_functional_major_muscle_group'    
    },
    {
      id: 8, name: 'BOX12BURNER', description: 'This_small_group_circuit_whole_body'    
    },
    {
      id: 9, name: 'HATTON BOXING CLASS', description: 'Take_your_skills_fitness_and_coordination'    
    }, 
    {
      id: 10, name: 'STEP HIIT', description: 'This_30_minute_improve_strength_exercises'    
    },    
  ]
  
  constructor(
    private title: Title,
		private meta: Meta,
    private httpService: HttpService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router,
    private coreTranslationService: CoreTranslationService
  ) {
  }

  ngOnInit() {    
    this.title.setTitle(this.coreTranslationService.translateText('Home -Box 12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Home -Box 12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};
    console.log('token here', this.config);
  }
  
  ngAfterViewInit() {
    this.onFetchProducts();
    this.onFetchTrainers();
    this.onFetchPrograms();
    this.onFetchPartners();
  }

  //Get the Products data list
  onFetchProducts(){
    console.log('id home---->', this.httpService.client_id);
    console.log('client id', this.config.user.client_id);
    this.httpService.post('products', {client_id: this.config.user.client_id}).then((response: any)=>{
      this.subscriptions = response;
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  //Get the Trainers data list
  onFetchTrainers(){
    this.httpService.post('trainers/list', {}).then((response: any)=>{
      this.trainers = response;
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  //Get the Programs data list
  onFetchPrograms(){
    this.httpService.post('programs/list', {}).then((response: any)=>{
      this.programs = response;
      console.log('programms list', this.programs);
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  //Get the Partners data list
  onFetchPartners(){
    this.httpService.post('partners/list', {}).then((response: any)=>{
      this.partners = response;
      console.log('partners list', this.partners);
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  //Buy the product
  onBuyProduct(product: Product) {
    if(!product.id) return;
    console.log('product', product);
    
    if(!this.config.token){
      let currentRoute = this.router.url.replace(/\#.*/gi, '').replace('/', '');
      if(currentRoute === '') currentRoute = 'home';

      this.modalReference = this.modalService.open(SignupComponent, { centered: true, size: 'xl' });
      this.modalReference.componentInstance.user = this.user;      
      this.modalReference.componentInstance.config = this.config;      
      this.modalReference.componentInstance.selectedProduct = product;
      this.modalReference.componentInstance.type = currentRoute;
      
      this.modalReference.result.then((result) => {
        console.log('modalOpenLogin', result);
        if (result && result.signup) {
          
        }
      }, (reason) => {
        console.log('reason', reason);
      });

    }else{//checkout 
      console.log('checkout the page!!');
      this.modalReference = this.modalService.open(CheckOutComponent, { centered: true, size: 'xl' });
      this.modalReference.componentInstance.config = this.config;
      this.modalReference.componentInstance.product = product;
      this.modalReference.result.then((result) => {
        console.log('onBuyProduct', result);
      }, (reason) => {
        console.log('reason', reason);
      });
    }    
  }

  onBuyProgram(program: any) {
    return this.alertService.alert('Programs', 'Coming Soon', 'info');
  }
}

