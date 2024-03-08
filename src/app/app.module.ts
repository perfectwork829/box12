import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from "./layout/layout.module";
import { AngularWebStorageModule } from 'angular-web-storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from 'src/app/shared/services/http/header.interceptor';
import { ErrorInterceptor } from 'src/app/shared/services/http/error.interceptor';
import { APP_CONFIG, BaseAppConfig } from 'src/app/shared/services/config/app.config';
import { AppConfigModule } from './app-config.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    AngularWebStorageModule,
    TranslateModule.forRoot(),
    LayoutModule,
    AppConfigModule,
    NgbModule,    
  ],
  providers: [
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: HTTP_INTERCEPTORS,  useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
