import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Product, Branch, Signup, Payment, User } from 'src/app/shared/models';
import { PaymentConfiguration } from 'src/app/shared/constraints/payment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import Stepper from 'bs-stepper';
import { DOCUMENT } from '@angular/common';
import Swiper from 'swiper';
import { environment } from "src/environments/environment"
import { ConfirmCodeComponent } from 'src/app/shared/components/modals/confirm-code/confirm-code.component';
import { TermsConditionsComponent } from 'src/app/shared/components/modals/terms-conditions/terms-conditions.component';
import * as moment from 'moment';
declare var goSell;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  @Input() config: AppConfig = {};
  @Input() type?: string;
  @Input() user?: User;
  @Input() selectedProduct: Product= {};
  private wizardStepper!: Stepper;
  private bsStepper: any;
  branches: Branch[] = [];
  branch: Branch = {};
  signup: Signup = {};
  subscriptions: Product[]= [];
  personalTrainings: Product[]= [];
  product: Product= {};
  productType: string = '';
  showHidePassword: boolean = false;
  paymentConfiguration: Payment = PaymentConfiguration;
  discount: {status: boolean, price: number, discount_type: string, response: boolean, message: string} = {status: false, price: 0, discount_type: "fixed", response: false, message: ''};
  stepType: string = 'signup';
  checkoutRedirectUrl = '';
  checkoutInfo = {
		product_id: 0,
		coupon_code: "",
		member_id: 0,
		start_date:""
	};
  phone_verified: boolean = false;
  modalReference!: NgbModalRef;
  agree_terms_conditions_checkbox = false;
  isButtonDisabled = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private configService: ConfigService,
    private httpService: HttpService,
    private modalService: NgbModal,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    if(this.type === 'academy' && this.config.token && this.config.user?.gender === 'kids') this.stepType = 'product';
    if(this.type === 'home' && this.config.token && this.config.user?.gender !== 'kids') this.stepType = 'product';
    if(this.stepType === 'product') this.onFetchBranches();
    if(this.type === 'academy' && this.config.token && this.config.user?.gender !== 'kids'){
      this.signup.parent_mobile = this.config.user.mobile;
      this.signup.parent_name = this.config.user.english_name + ' ' + this.config.user.arabic_name;
    }    
  }

  ngAfterViewInit() {    
    this.wizardStepper = new Stepper(this.document.querySelector('#stepper'),{});
    this.bsStepper = document.querySelectorAll('.bs-stepper');
  }

  //get to the next step
  stepperNext(step: number, data: any) {        
    if (!this.isButtonDisabled) {
      if (data.form.valid === true) {
        if(step === 1) this.onFetchBranches();
        if(step === 2) {
          this.onFetchProducts();
          console.log('find club here', data.form.valid);
        }
        if(step === 3) this.setDefaultValues();
        if(step === 4) this.onSignUp();
        if(step === 5) this.onPayNow(data);
      }
      this.isButtonDisabled = true;
      // Simulate a delay for demonstration purposes
      setTimeout(() => {
        // Perform any action that should happen on button click
        console.log('Button clicked');
        this.isButtonDisabled = false; // Enable the button after action is complete
      }, 1000); // Set a delay time in milliseconds as needed      
    }
  }
  
  //get to the previous step
  stepperPrevious(step?: number) {
    if(step) this.wizardStepper.to(step);
    else this.wizardStepper.previous();
  }

  //Set the default value for the signup
  setDefaultValues(){
    this.signup.subscription_day = new Date().toISOString().slice(0, 10);
    this.signup.client_id = this.httpService.client_id;
    this.signup.dob = "1990-01-01";
    this.signup.preferred_language = this.config.selectedLanguage.code;
    this.signup.fcm_token = "firebase token";
    this.wizardStepper.next();
  }

  onClose(data?: any){
    this.activeModal.close(data);
  }

  onGenderSelect(type: string){
    this.signup.gender = type;
    this.signup.default_branch = null;
    this.branch = new Branch;
  }

  //Change the branch
  onBranchSelect(branch: Branch){
    this.branch = branch;
    this.signup.default_branch = this.branch.id;
  }

  //User signup 
  onSignUp(){
    console.log(this.signup);
    this.httpService.post('members/register', this.signup).then((response: any) => {      
      this.config.token = response.token;
      this.config.user = response;
      console.log('registered user info', response);
      this.configService.setAppConfig(this.config);
      this.checkoutInfo.member_id = this.config.user.id;
      console.log('checkoutInfo info', this.checkoutInfo.member_id);      
      this.wizardStepper.next();
    }).catch(error => this.alertService.alert('Login', error.message, 'error'));
  }

  //Get the branch list
  onFetchBranches(){    
    this.httpService.post('branches', {keyword: '', client_id: this.httpService.client_id, gender: this.config.token? this.config.user.gender:this.signup.gender}).then((response: any)=>{
      console.log('branches list', response);      
      if(this.selectedProduct){        
        this.branches = response.map(item => {
          const filteredBranches = item.products.filter(sub_item => {
            return (sub_item.id === this.selectedProduct.id);
          });
          if (filteredBranches.length > 0) {
            return { ...item, branches: filteredBranches };
          } else {
            return null; // Return null if no matching branches found
          }          
        }).filter(filteredItem => filteredItem !== null);         
      }else{
        this.branches = response;
        console.log('this.branches2', this.branches);
      }              
      if(this.stepType === 'signup') this.wizardStepper.next();            
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  //Get the product list
  onFetchProducts(){
    this.onTriggerProduct('subscription');    
    this.httpService.post('products', {client_id: this.httpService.client_id}).then((response: any)=>{
      let result = response;
      result.forEach(product => {
        product.english_options = product.terms_conditions.split('\r\n\r\n');
        product.arabic_options = product.arabic_terms_conditions.split('\r\n\r\n');
      });
      console.log('fetched products here', response);
      this.subscriptions = result.filter(element=> element.type === "subscription");
      this.personalTrainings = result.filter(element=> element.type === "session");
      this.wizardStepper.next();
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  //Check the coupon code
  onCheckCoupon(){
    this.httpService.post('check-coupon', { coupon_code: this.signup.promotional_code, product_id: this.product.id, member_id:this.config.user.id }).then((response: any)=>{
      console.log('onCheckCoupon', response)
      this.discount = {status: true, price: response.discount_value, discount_type: response.discount_type, response: true, message: 'Valid'};
    }).catch(response => {
      console.log('onCheckCoupon', response)
      this.discount = {status: false, price: 0, discount_type: "fixed", response: true, message: response.message};
    });
  }

  //Trigger product slider
  onTriggerProduct(type: string){
    this.productType = type;
    setTimeout(() => {
      const swiper = new Swiper(`.${this.productType}-slider-container`, {
        slidesPerView: 3,
        loop: true,
        spaceBetween : 30,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          1200:{
            slidesPerView : 3
          },

          992:{
            slidesPerView : 3
          },

          768:{
            slidesPerView : 2

          },

          576:{
            slidesPerView : 1
          },

          0:{
            slidesPerView : 1
          }
        }
      });
    }, 800);
  }

  //Select the product item
  onSelectProduct(product: Product){
    this.product = product;
    this.signup.product_id = product.id;    
    this.checkoutInfo.product_id = this.product.id;
    this.checkoutRedirectUrl = 'products/buy/' + this.product.id;
    console.log('checkout info product number', this.checkoutInfo.product_id);
    console.log('checkout info product id', this.product.id);
  }

  //Open the confirm Dialog
  openConfirmDialog(){    
    this.modalReference = this.modalService.open(ConfirmCodeComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.config = this.config;    
    this.modalReference.componentInstance.phoneNumber = this.signup.mobile;
    
    this.modalReference.result.then((result) => {
      console.log('onContactUs', result);
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //Open the product's terms and conditions dialog.
  openProductTermsConditionsDialog(terms_option){
    this.modalReference = this.modalService.open(TermsConditionsComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.config = this.config;            
    this.modalReference.componentInstance.termsConditions = terms_option;            
    this.modalReference.result.then((result) => {
      console.log('termsconditions Dialog', result);
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //Open the Terms and Conditions Diglog modal
  openTermsConditionsDialog(){
    this.modalReference = this.modalService.open(TermsConditionsComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.config = this.config;                         
    this.modalReference.result.then((result) => {
      console.log('termsconditions Dialog', result);
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  //Set the payment info for the GoSell
  showGosell(){
    console.log('pay validation start~~');
    let customer = {
      ...this.paymentConfiguration.customer,
      first_name : this.config.user.english_name,
      email : this.config.user.email,
      phone: {
        country_code: "966",
        number: this.config.user.mobile
      }
    };
    console.log('customer info here~~', customer);
    let transaction = {
      mode:'charge',
      charge:{
        ...this.paymentConfiguration.transaction.charge,
        description: "Pay for product",
        redirect : environment.front + this.checkoutRedirectUrl
      }
    };
    console.log('transaction info here~~', transaction);
    let order  = {
      ...this.paymentConfiguration.order,
      amount: ((this.product.amount_after_vat/1.15 - this.discount.price)*1.15),
      items:[{
        id: this.product.id,
        name: this.product.english_name,
        description: this.product.english_description,
        quantity: "x1",
        amount_per_unit: this.product.amount_after_vat + '',
        discount:{
          type: 'coupon',
          value: this.discount.price.toFixed(1)
        },
        total_amount: 'SAR' + ((this.product.amount_after_vat/1.15 - this.discount.price)*1.15).toFixed(1)
      }]
    };
    console.log('order info here~~', order);
    this.paymentConfiguration = {
      ...this.paymentConfiguration,
      customer: customer,
      transaction: transaction,
      order: order
    }
    console.log('paymentConfiguration info here~~', this.paymentConfiguration);
    goSell.config({
      ...this.paymentConfiguration,
      callback:(response) => {          
        if (response?.id){
          let success_message = response.currency + " " + response.amount + " Paid successfully. ID is " + response.id;
          console.log('success_message', success_message);
          this.alertService.alert('Payment', 'Payment is Successful', 'success');
          localStorage.setItem('checkoutInfo', JSON.stringify(this.checkoutInfo));
          this.onClose(response);
        }else{
          let error = {
            type: 'error',
            title: 'Payment Failed',
            body: response.message,
          };
          console.log('Payment Failed', error);
          this.alertService.alert('Payment', 'Payment Failed', 'error');
        }
      },
      onClose: () => {
        console.log("onClose Event");
        this.onClose();
      },
    });
    console.log('goSell info here~~', goSell);
    goSell.openLightBox(); 
    console.log('ended !!!');
  }
  
  //Pay the money via GoSell
  onPayNow(data:any){
    this.checkoutInfo.start_date = moment(this.signup.subscription_day).format('YYYY-MM-DD');
    console.log('checkout date check here', this.checkoutInfo.start_date);
    console.log('checkout date check here', this.checkoutInfo);
    this.httpService.post('member/subscriptions/buy/validate', this.checkoutInfo).then((response: any)=>{      
      console.log('partners list', response);
      if(!response){
        this.alertService.alert('Validation', 'Buy validation failed', 'error');
        return;
      }else if(!response.status){
        this.alertService.alert('Validation', 'Buy validation failed', 'error');
        return;
      }else{
        this.alertService.alert('Validation', 'You can buy this subscription now', 'success');
        console.log('checkout info summary~~~', JSON.stringify(this.checkoutInfo));
        localStorage.setItem('checkoutInfo', JSON.stringify(this.checkoutInfo));

        if (data.form.valid === true){
          this.showGosell();
        }   
      }      
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }  
}
