import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule,NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { MomentFilterPipe } from "../pipes/momentFilter.pipe/moment-filter.pipe";

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    MomentFilterPipe
  ],
  imports: [],
  exports: [    
    MomentFilterPipe,
  ]
})
export class PipesModule {}
