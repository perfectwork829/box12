import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import { SignupComponent } from 'src/app/shared/components/auth/signup/signup.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { Product, User } from 'src/app/shared/models';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  modalReference!: NgbModalRef;
  @Input() config: AppConfig = {};
  @Input() image: string = '';
  @Input() page: string = '';
  @Input() title_main: string = '';
  @Input() title_sub: string = '';
  @Input() description: string = 'Coming soon...';
  user: User = {};
  constructor(
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.user.gender = 'all';    
  }
  //Open the signup Modal
  onSignUp() {
    this.modalReference = this.modalService.open(SignupComponent, { centered: true, size: 'xl' });
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.componentInstance.selectedProduct = null;
    this.modalReference.componentInstance.user = this.user;      
    this.modalReference.componentInstance.type = this.page;
    this.modalReference.result.then((result) => {
      console.log('onSignUp', result);
      if (result) {

      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }
}
