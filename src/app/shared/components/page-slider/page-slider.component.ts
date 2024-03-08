import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-slider',
  templateUrl: './page-slider.component.html',
  styleUrls: ['./page-slider.component.scss']
})
export class PageSliderComponent {
  @Input() image?: string = "assets/img/photos/bg-page2.jpg";
  @Input() title?: string = "";
  @Input() text1?: string = "";
  @Input() text2?: string = "";
  constructor(){
  }
}
