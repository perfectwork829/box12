import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import { Fancybox } from '@fancyapps/ui';
import Swiper from 'swiper';
import { AppConfig } from 'src/app/shared/services/config/app.config';
import * as AOS from 'aos';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit{
  @Input() config: AppConfig = {};
  @Input() partners: any = [];
  bLangFlag = false;
  private swiper: Swiper | undefined;
  constructor(private elRef: ElementRef) {}

  ngOnInit() {    
    AOS.init({
      once: true,      
    });
    this.bLangFlag = this.config.isArabic;    
    this.swiper = new Swiper('.gallery-slider-container', {
      loop: true,
      slidesPerView: 5,   
      spaceBetween : 10,   
      allowTouchMove:true,
      allowSlideNext:true,
      allowSlidePrev: true,
      effect: 'fade',      
      breakpoints: {
        1200:{
          slidesPerView : 5
        },

        992:{
          slidesPerView : 4
        },

        768:{
          slidesPerView : 3
        },

        576:{
          slidesPerView : 2
        },

        0:{
          slidesPerView : 2
        }
      }
    });
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]');
  }

  //Go to the next slider
  plusSlides() {
    this.swiper.slideNext(); 
  }
  
  //Go to the previous slider
  previw() {
    if (this.swiper) {
      this.swiper.slidePrev(); // You can use slidePrev() for the previous button
    }
  }

  ngOnDestroy() {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
    this.swiper.destroy();
  }
}
