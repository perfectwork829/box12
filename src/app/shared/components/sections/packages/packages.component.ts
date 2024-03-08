import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Swiper from 'swiper';
import { Product } from 'src/app/shared/models';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import * as AOS from 'aos';
// import { register } from 'swiper/element/bundle';
// register();
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit{
  @Input() subscriptions: Product[]= [];
  @Input() config: AppConfig = {};
  @Output() onProductSelected: EventEmitter<any> = new EventEmitter();
  bLangFlag = false;
  private swiper: Swiper | undefined;
  constructor(

  ) {
  }

  ngOnInit() {    
    this.bLangFlag = this.config.isArabic;
  }

  ngAfterContentInit(){
    AOS.init({
      once: true,      
    });
    this.swiper = new Swiper('.packages-slider-container', {      
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
  //Go to the next slider
  plusSlides() {
    if (this.swiper) {
      this.swiper.slideNext(); 
    }
  }

  //go to the previous slider
  previw() {
    if (this.swiper) {
      this.swiper.slidePrev(); 
    }
  }

}
