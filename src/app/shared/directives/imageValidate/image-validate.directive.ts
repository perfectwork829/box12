import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[defaultImg]'
})

export class ImageValidateDirective {
  constructor(public el: ElementRef) {
  }
  @HostListener('error') error() {
    this.el.nativeElement.src = 'assets/img/team/1.jpg';
  }
  @HostListener('ionError') ionError() {
    this.el.nativeElement.src = 'assets/img/team/1.jpg';
  }
}
