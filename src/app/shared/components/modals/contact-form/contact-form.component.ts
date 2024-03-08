import {Component, Input, OnInit} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import {User} from 'src/app/shared/models';
import {ConfigService} from 'src/app/shared/services/config/config.service';
import {HttpService} from 'src/app/shared/services/http/http.service';
import {AlertService} from 'src/app/shared/services/alert/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() config: AppConfig = {};
  form: {name?: string; email?: string; message?: string } = {};
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    console.log('config', this.config);
  }

  onClose(data?: any){
    this.activeModal.close(data);
  }

  //Send the contact Us's email
  onSubmitForm(){
    if(!this.form.name) return this.alertService.alert('GET IN TOUCH','Please enter your full name', 'error');
    if(!this.form.name.length) return this.alertService.alert('GET IN TOUCH','Phone enter your full name', 'error');
    if(!this.form.email.length || !this.form.email.match('@')) return this.alertService.alert('GET IN TOUCH','Please enter your email', 'error');
    if(!this.form.message.length) return this.alertService.alert('GET IN TOUCH','Please enter your message', 'error');
    this.httpService.post('contact-us', this.form).then((response: any) => {
      console.log('contact us form here', response);
      this.alertService.alert('GET IN TOUCH', 'We will contact you soon', 'success')
      this.onClose();
    }).catch(error => this.alertService.alert('GET IN TOUCH', error.message, 'error'));
  }
}
