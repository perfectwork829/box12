import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Product, Branch, Payment } from 'src/app/shared/models';
import { PaymentConfiguration } from 'src/app/shared/constraints/payment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { DOCUMENT } from '@angular/common';
import { environment } from "src/environments/environment";
import Stepper from "bs-stepper";
import * as moment from 'moment';
declare var goSell;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})

export class CheckOutComponent  implements OnInit, AfterViewInit {
  @Input() config: AppConfig = {};
  @Input() product: Product= {};
  private wizardStepper!: Stepper;
  private bsStepper: any;
  branch: Branch = {};
  form: any = {};
  paymentConfiguration: Payment = PaymentConfiguration;
  discount: {status: boolean, price: number, discount_type: string, response: boolean, message: string} = {status: false, price: 0, discount_type: "fixed", response: false, message: ''};
  start_date: any;
  checkoutRedirectUrl = '';
  checkoutInfo = {
		product_id: 0,
		coupon_code: "",
		member_id: 0,
		start_date:""
	};

  constructor(
    @Inject(DOCUMENT) private document: any,
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.checkoutInfo.member_id = this.config.user.id;
		this.checkoutInfo.product_id = this.product.id;
		this.form.subscription_day = moment().format('YYYY-MM-DD');
		this.checkoutRedirectUrl = 'products/buy/' + this.product.id;
    console.log('checkoutRedirectUrl here', this.checkoutRedirectUrl);		
  }

  ngAfterViewInit() {
    this.wizardStepper = new Stepper(this.document.querySelector('#stepper'),{});
    this.bsStepper = document.querySelectorAll('.bs-stepper');
  }

  //Go to the next step
  stepperNext(step: number, data: any) {
    if (data.form.valid === true && step === 2) return this.wizardStepper.next();
  }

  //Go to the previous step
  stepperPrevious() {
    this.wizardStepper.previous();
  }

  onClose(data?: any){
    this.activeModal.close(data);
  }

  //Select the branch
  onBranchSelect(branch: Branch){
    this.branch = branch;
    this.form.default_branch = this.branch.id;
  }

  //Check the coupon code
  onCheckCoupon(){
    this.httpService.post('check-coupon', { coupon_code: this.form.promotional_code, product_id: this.product.id, member_id:this.config.user.id })
    .then((response: any)=>{
      console.log('onCheckCoupon', response);
      this.discount = {status: true, price: response.discount_value, discount_type: response.discount_type, response: true, message: 'Valid'};
    }).catch(response => {
      console.log('onCheckCoupon', response)
      this.discount = {status: false, price: 0, discount_type: "fixed", response: true, message: response.message};
      this.alertService.alert('Validation', "Invalid coupon code", 'error');      
    });
  }

  //Set the payment info
  showGosell(){
    console.log('pay validation start~~ checkout page environment.paymentKey', environment.paymentKey);
    let gateway = {
      ...this.paymentConfiguration.gateway,
      publicKey: environment.paymentKey
    }
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
      gateway: gateway,
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

  //Pay the price of product via GoSell
  onPayNow(data:any){
    console.log('pay validation start~~ checkout page environment test key here', environment.paymentKey);
    this.checkoutInfo.start_date = moment(this.form.subscription_day).format('YYYY-MM-DD');
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
      }
      console.log('checkout info summary~~~', JSON.stringify(this.checkoutInfo));
			localStorage.setItem('checkoutInfo', JSON.stringify(this.checkoutInfo));

      if (data.form.valid === true){
        this.showGosell();
      }   
    }).catch((err) => {      
        console.log(err);                        
        this.alertService.alert('info', err.message, 'error');        
    });    
  }  
}
