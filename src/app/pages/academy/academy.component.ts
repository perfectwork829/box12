import {Component, OnInit} from '@angular/core';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { SignupComponent } from "src/app/shared/components/auth/signup/signup.component";
import { CheckOutComponent } from "src/app/shared/components/modals/check-out/check-out.component";
import { AppConfig } from "src/app/shared/services/config/app.config";
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { ConfigService } from "src/app/shared/services/config/config.service";
import { User, Product } from "src/app/shared/models";

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss']
})
export class AcademyComponent implements OnInit{
  config: AppConfig = {};
  user: User = {};
  programs: {name: string, image: string, duration: string}[] = [
    {name: 'Program Name', image: 'assets/img/class/Kids1.jpg', duration: 'Duration 00 Minutes'},
    {name: 'Program Name', image: 'assets/img/class/Kids2.jpg', duration: 'Duration 45 Minutes'},
    {name: 'Program Name', image: 'assets/img/class/Kids3.jpg', duration: 'Duration 45 Minutes'}
  ];
  subscriptions: Product[]= [];
  modalReference!: NgbModalRef;

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
    this.title.setTitle(this.coreTranslationService.translateText('Academy - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Academy - Box12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};
    this.onFetchProducts();
  }
    
  //Get the program data list
  onFetchClasses(){
    this.httpService.post('classes', {}).then((response: any)=>{
      this.programs = response;
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });  
  }

  onBuyProgram(program: any) {
    return this.alertService.alert('Programs', 'Coming Soon', 'info');
  }

  //Get the Products data list
  onFetchProducts(){
    console.log('id home---->', this.httpService.client_id);
    this.httpService.post('products', {client_id: this.config.user.client_id}).then((response: any)=>{
      this.subscriptions = response;
      console.log('subscription data here', response);
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });  
  }

  //Buy the Product  
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
  
}
