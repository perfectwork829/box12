import { NgModule } from '@angular/core';

import { NumberDirective } from './input-number/number.directive';
import { ImageValidateDirective } from './imageValidate/image-validate.directive';

@NgModule({
  declarations: [NumberDirective, ImageValidateDirective],
  exports: [NumberDirective, ImageValidateDirective]
})
export class CoreDirectivesModule {}
