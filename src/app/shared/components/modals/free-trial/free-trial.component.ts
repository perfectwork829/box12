import {Component, Input, OnInit} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import {ConfigService} from 'src/app/shared/services/config/config.service';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {AlertService} from 'src/app/shared/services/alert/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Branch} from "src/app/shared/models";

@Component({
  selector: 'app-free-trial',
  templateUrl: './free-trial.component.html',
  styleUrls: ['./free-trial.component.scss']
})
export class FreeTrialComponent implements OnInit {
  @Input() config: AppConfig = {};
  form: {mobile?: string; email?: string; branch_id?: number, visit_day?: string, name?: string} = {};
  branches: Branch[] = [];
  fullNamePattern: RegExp = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {    
    this.onFetchBranches();    
  }

  onClose(data?: any){
    this.activeModal.close(data);
    this.config.isTrial = true;
    this.configService.setAppConfig(this.config);
  }

  //select the branch
  onBranchSelect(branch: Branch){
    if(!branch) delete this.form.branch_id;
    else this.form.branch_id = branch.id;
  }

  //Get the branch list
  onFetchBranches(){    
    this.httpService.post('branches', {keyword: '', client_id: this.config.user.client_id}).then((response: any)=>{
      this.branches = response;
      console.log('this.branches', response);
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });
  }

  //Submit for the free trial
  onSubmitForm(){
    console.log('form', this.form);
    if(!this.form.name) return this.alertService.alert('Free Trial','Please enter your name', 'error');
    if (!this.form.name.match(this.fullNamePattern)) {
      return this.alertService.alert('Free Trial', 'enter_full_name', 'error');
    }
    if(!this.form.mobile) return this.alertService.alert('Free Trial','Please enter your phone number', 'error');    
    if(this.form.mobile.length !== 10 && !this.form.mobile.startsWith('0')) return this.alertService.alert('Free Trial','Phone number is incorrect', 'error');
    if(!this.form.email.length || !this.form.email.match('@')) return this.alertService.alert('Free Trial','Please enter your email', 'error');
    if(!this.form.branch_id) return this.alertService.alert('Free Trial','Please select branch', 'error');
    if(!this.form.visit_day.length) return this.alertService.alert('Free Trial','Please select reservation date and time', 'error');
    console.log('free trial form data', this.form);
    this.httpService.post('website/free-pass/create', this.form).then((response: any) => {
      this.onClose();
      if(response.status)
        this.alertService.alert('info', response.message, 'success'); 
      else
        this.alertService.alert('error', response.message, 'error'); 
    }).catch(error => this.alertService.alert('Free Trial', error.message, 'error'));
  }
}
