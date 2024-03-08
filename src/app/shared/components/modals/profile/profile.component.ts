import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { User } from 'src/app/shared/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoaderService } from "src/app/shared/services/loader/loader.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit {
  @Input() config: AppConfig = {};
  @Input() user: User = {};
  segment: string = 'menu';
  memberships_list: any;
  bLangFlag = false;
  
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    console.log('config', this.config);
    this.bLangFlag = this.config.isArabic;    
  }

  onClose(data?: any){
    this.activeModal.close(data);
  }

  //Get the subscription list purchased
  getMemberships(){
    this.loaderService.setLoading(true);    
    this.httpService.post('member/subscriptions', {}).then((response: any)=>{      
      console.log('membership result', response);
      if (!response) {
        const type = 'error';
        const title= "Get member subscription failed";
        const body = "Something went wrong";
				this.alertService.alert(title, body, 'error');
				return;
			}else{        
				this.memberships_list = response;
			} 
      this.loaderService.setLoading(false);    
    }).catch((err) => {      
      console.log(err);                        
      this.alertService.alert('info', err.message, 'error');        
    });    
  }

  //Update the profile
  onUpdate(){
    this.httpService.post('update-profile', this.user).then((response: any) => {
      if(response){
        this.config.user = response;
        this.configService.setAppConfig(this.config);
        this.alertService.alert('My Profile', 'Your profile has been updated', 'success');
      }
    }).catch(error => this.alertService.alert('Login', error.message, 'error'));
  }

  onSegmentChange(segment: string){
    this.segment = segment;
    if(segment =='membership')
      this.getMemberships();
    if(this.segment === 'logout') return this.onClose({logout: true});
  }
}
