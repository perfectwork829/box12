import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  @Input() config: AppConfig = {};
  constructor(
    public activeModal: NgbActiveModal
  ){

  }
  ngOnInit() {

  }

  onClose(data?: any){
    this.activeModal.close(data);
  }
}
