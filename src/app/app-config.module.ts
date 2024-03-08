import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { HttpService } from 'src/app/shared/services/http/http.service';


export function initializer(configService: ConfigService) {
  return () => configService.initializerApp();
}

export function domain(httpService: HttpService) {  
  return () => httpService.initializeDomainFactory();
}

@NgModule({
  imports: [ HttpClientModule ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: domain, deps: [HttpService], multi: true },
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [ConfigService], multi: true }
  ]
})
// @NgModule({
//   imports: [HttpClientModule],
//   providers: [
//     HttpService, // Provide HttpService directly
//     {
//       provide: APP_INITIALIZER,
//       useFactory: initializer,
//       deps: [ConfigService],
//       multi: true
//     }
//   ]
// })

export class AppConfigModule { }

