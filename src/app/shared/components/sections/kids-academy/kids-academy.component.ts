import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Fancybox } from "@fancyapps/ui";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppConfig } from 'src/app/shared/services/config/app.config';

@Component({
  selector: 'app-kids-academy',
  templateUrl: './kids-academy.component.html',
  styleUrls: ['./kids-academy.component.scss']
})
export class KidsAcademyComponent  implements OnInit, OnDestroy {
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
}
