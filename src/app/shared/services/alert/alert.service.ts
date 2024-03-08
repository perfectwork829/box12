import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private coreTranslationService: CoreTranslationService) {

  }

  alert(title: string, message: string, icon: SweetAlertIcon){
    Swal.fire({
      title: this.coreTranslationService.translateText(title),
      text: this.coreTranslationService.translateText(message),
      icon: icon,
      showConfirmButton: false,
      showCancelButton: false,
      timer: 2500
    });
  }

  async confirm(title: string, message: string, btn: string): Promise<any> {
    return Swal.fire({
      title: this.coreTranslationService.translateText(title),
      text: this.coreTranslationService.translateText(message),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.coreTranslationService.translateText('PAGES.cancel'),
      confirmButtonText:this.coreTranslationService.translateText(btn),
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-dark ml-1'
      }
    });
  }

}
