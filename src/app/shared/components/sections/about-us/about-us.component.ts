import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Fancybox } from "@fancyapps/ui";
import { FreeTrialComponent } from 'src/app/shared/components/modals/free-trial/free-trial.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { ContactFormComponent } from 'src/app/shared/components/modals/contact-form/contact-form.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {
  modalReference!: NgbModalRef;
  @Input() config: AppConfig = {};
  constructor(
    private elRef: ElementRef,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]');
    //this.onFreeTrial();
  }

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

  //Open the Free Trial form
  onFreeTrial() {
    this.modalReference = this.modalService.open(FreeTrialComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.config = this.config;    
    this.modalReference.result.then((result) => {
      console.log('FreeTrialComponent', result);
      if (result) {

      }
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  onContactUs() {
    this.modalReference = this.modalService.open(ContactFormComponent, { centered: true, size: 'lg' });
    this.modalReference.componentInstance.config = this.config;
    this.modalReference.result.then((result) => {
      console.log('onContactUs', result);
    }, (reason) => {
      console.log('reason', reason);
    });
  }
}
