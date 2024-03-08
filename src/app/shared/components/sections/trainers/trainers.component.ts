import {Component, ElementRef, OnDestroy, OnInit, Input} from '@angular/core';
import Swiper from 'swiper';
import {Fancybox} from "@fancyapps/ui";
import { AppConfig } from 'src/app/shared/services/config/app.config';
import * as AOS from 'aos';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit, OnDestroy{
  @Input() config: AppConfig = {};
  @Input() trainers: any = [];
  bLangFlag = false;
  private swiper: Swiper | undefined;
  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    AOS.init({
      once: true,      
    });
    this.bLangFlag = this.config.isArabic;
    this.swiper = new Swiper('.team-slider-container', {
      loop: true,
      slidesPerView: 3,
      spaceBetween:11,
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
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]');  

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

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
    this.swiper.destroy();
  }
}
