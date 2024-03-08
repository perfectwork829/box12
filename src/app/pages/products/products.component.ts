import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutComponent } from "src/app/shared/components/modals/check-out/check-out.component";
import { SignupComponent } from "src/app/shared/components/auth/signup/signup.component";
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import { ConfigService } from "src/app/shared/services/config/config.service";
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { User, Product} from 'src/app/shared/models';
import { Subscription } from 'rxjs';

declare var goSell;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit{
  config: AppConfig = {};
  user: User = {};
  subscriptions: Product[] = [];
  personalTrainings: Product[] = [];
  
  checkoutInfo = {
		product_id: 0,
		coupon_code: "",
		member_id: 0,
		start_date:""
	};
  routeChangeSubscription: Subscription;
  _id = 0;

  modalReference!: NgbModalRef;  
  constructor(
    private title: Title,
		private meta: Meta,
    private httpService: HttpService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private coreTranslationService: CoreTranslationService
  ) {
    this.title.setTitle(this.coreTranslationService.translateText('Products - Box12'));
		this.meta.addTags([{
        property: 'og:title',
        content: this.coreTranslationService.translateText('Products - Box12'),
      },
    ]);
    this.config = this.configService.appSettingsValues;
    this.user = this.config.user || {};
    
    goSell.showResult({
      callback: response => {
        localStorage.setItem('goSell_response', JSON.stringify(response.callback));
        console.log("callback", response);
      }
    });
    this.onFetchProducts(); 
  }
  
  ngOnInit() {
    console.log('start on init function!!!');    
    
    if (this.router.url.includes('buy')) {
			this.routeChangeSubscription && this.routeChangeSubscription.unsubscribe();
			this.routeChangeSubscription = this.route.params.subscribe((params) => {
				if (this._id !== params['id']) {
					this._id = params['id'];
					let goSell_response = localStorage.getItem('goSell_response');
					let checkoutInfo = localStorage.getItem('checkoutInfo');
          
					if (null !== goSell_response && null !== checkoutInfo){
						this.checkoutInfo = JSON.parse(checkoutInfo);
						if (this.checkoutInfo.product_id == this._id){
							this.buy();
						}
					}
				}
			});
		}
		this.route.queryParams.subscribe(params => {
			const paramValue = params['tab']; 
      console.log('parameter value tab', paramValue);
			//if (paramValue == 'membership') this.selectTab(2);
		});
  }

  ngAfterViewInit() {           
  }

  //Get the products list
  onFetchProducts(){
    console.log('id home---->', this.config.user.client_id);
    this.loaderService.setLoading(true);    
    this.httpService.post('products', {client_id: this.config.user.client_id}).then((response: any)=>{
      this.loaderService.setLoading(false);          
      this.subscriptions = response.filter(element => element.type == "subscription");
      this.personalTrainings = response.filter(element => element.type == "session");      
      console.log('personal training', this.personalTrainings);
      console.log('subscriptions', this.subscriptions);
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }  

  //remove the gosell response and checoutInfo
  unsetCheckoutInfo(){
		localStorage.removeItem('goSell_response');
		localStorage.removeItem('checkoutInfo');
	}
  
  //Buy the product in reality
  buy(){    
    console.log('product buy here==========================================>', this.checkoutInfo);
    this.loaderService.setLoading(true);    
    this.httpService.post('member/subscriptions/buy', this.checkoutInfo).then((response: any)=>{
      this.loaderService.setLoading(false);                   
      this.unsetCheckoutInfo();
			this.router.navigate(['/membership']);
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }  

  //Buy the product.
  onBuyProduct(product: Product) {
    if(!product.id) return;    
    
    if(!this.config.token){
      let currentRoute = this.router.url.replace(/\#.*/gi, '').replace('/', '');
      if(currentRoute === '') currentRoute = 'home';

      this.modalReference = this.modalService.open(SignupComponent, { centered: true, size: 'xl' });
      this.modalReference.componentInstance.user = this.user;      
      this.modalReference.componentInstance.config = this.config;      
      this.modalReference.componentInstance.selectedProduct = product;
      this.modalReference.componentInstance.type = currentRoute;
      
      this.modalReference.result.then((result) => {        
        if (result && result.signup) {
          
        }
      }, (reason) => {
        console.log('reason', reason);
      });

    }else{//checkout       
      this.modalReference = this.modalService.open(CheckOutComponent, { centered: true, size: 'xl' });
      this.modalReference.componentInstance.config = this.config;
      this.modalReference.componentInstance.product = product;      
      this.modalReference.result.then((result) => {                
      }, (reason) => {
        console.log('reason', reason);
      });
    }  
  }
}
