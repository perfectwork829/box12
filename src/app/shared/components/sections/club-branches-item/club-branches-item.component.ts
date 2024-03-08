import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ConfigService } from "src/app/shared/services/config/config.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AlertService } from "src/app/shared/services/alert/alert.service";
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { Branch } from 'src/app/shared/models';
import { LoaderService } from "src/app/shared/services/loader/loader.service"

@Component({
  selector: 'app-club-branches-item',
  templateUrl: './club-branches-item.component.html',
  styleUrls: ['./club-branches-item.component.scss']
})
export class ClubBranchesItemComponent implements OnInit, AfterViewInit{
  @Input() config: AppConfig = {};  
  @Input() club: Branch;  
  bLangFlag: boolean = false;
	
  	public set selectItem(club:Branch){
		if (this.club?.id == club.id){
			this.selected = true;
		}else{
			this.selected = false;
		}
	}
	@Output() loadClub = new EventEmitter();

	selected : boolean = false;
	loadClubDetail(event: Event, club:Branch){
		let data = {club: club, rd: 'detail'};
		this.loadClub.emit(data);
	}

	loadClubReview(event: Event,club:Branch){
			let data = {club: club, rd: 'review'};
			this.loadClub.emit(data);
	}

	constructor() { }

	ngOnInit(){
		this.selected = false;
		this.bLangFlag = this.config.isArabic;
	}

	ngAfterViewInit(){}
}
