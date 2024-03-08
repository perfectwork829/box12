import {Component, EventEmitter, Input, Output, AfterViewInit, OnInit} from '@angular/core';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import Swiper from 'swiper';
import * as AOS from 'aos';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent  implements OnInit{
  @Input() workouts: {image: string, description: string}[] = [];
  @Input() section: string = '';
  @Input() config: AppConfig = {};
  @Input() page: string = '';  
  private swiper: Swiper | undefined;
  bLangFlag = false;
  constructor() {
  }
  ngOnInit() {
    AOS.init({
      once: true,      
    });
    this.bLangFlag = this.config.isArabic;
  }
  ngAfterContentInit(){
    this.swiper = new Swiper('.workouts-slider-container', {      
      loop: true,
      slidesPerView: 3,
      spaceBetween : 10,      
      allowTouchMove:true,
      allowSlideNext:true,
      allowSlidePrev: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1200:{
          slidesPerView : 3
        },

        992:{
          slidesPerView : 3
        },

        768:{
          slidesPerView : 2
        },

        576:{
          slidesPerView : 2
        },

        0:{
          slidesPerView : 1
        }
      }
    });
  }
  
  //go to the next slider
  plusSlides() {
    if (this.swiper) {
      this.swiper.slideNext(); 
    }
  }

  //go to the previous slider
  previewSlides() {
    if (this.swiper) {
      this.swiper.slidePrev(); 
    }
  }
}
