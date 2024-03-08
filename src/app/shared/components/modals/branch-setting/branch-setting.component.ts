import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoaderService } from "src/app/shared/services/loader/loader.service";
import {Branch} from "src/app/shared/models";

@Component({
  selector: 'app-branch-setting',
  templateUrl: './branch-setting.component.html',
  styleUrls: ['./branch-setting.component.scss']
})
export class BranchSettingComponent {
  @Input() config: AppConfig = {};
  form: {phone?: string; branch?: number, branch_name?: string} = {};
  branches: Branch[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private configService: ConfigService,
    private loaderService: LoaderService,    
    private httpService: HttpService,
    private alertService: AlertService
  ){
      
  }
  ngOnInit() {
    console.log('config', this.config);
    this.loaderService.setLoading(true);      
    this.onFetchBranches();    
  }

  onClose(data?: any){
    this.activeModal.close(data);        
  }

  //Choose the branch item
  onBranchSelect(branch: Branch){
    if(!branch) delete this.form.branch;
    else this.form.branch = branch.id;
    if(this.config.isArabic)
      this.form.branch_name = branch.name_ar;
    else
      this.form.branch_name = branch.name_en;    
  }

  //Get the branch list.
  onFetchBranches(){    
    this.httpService.post('branches', {keyword: '', client_id: this.httpService.client_id}).then((response: any)=>{
      this.branches = response;
      this.loaderService.setLoading(false);   
    });
  }

  //Set new branch
  onSubmitForm(){
    console.log('form', this.form);    
    if(!this.form.branch) return this.alertService.alert('Branch Setting','Please select branch', 'error');              
    this.config.user.default_branch = this.form.branch;    
    console.log('branch id here', this.form.branch);
    this.configService.setAppConfig(this.config);    
    this.activeModal.close();
    this.alertService.alert('Branch Setting','Selected new branch:' + this.form.branch_name, 'success');        
  }
}
