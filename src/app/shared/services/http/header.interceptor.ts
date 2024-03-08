import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from "../config/config.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(
        private configService: ConfigService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.configService.token;

        if(!token){
          request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              'No-Auth': 'True'
            }
          });
        }


      // if (!request.headers.has('Content-Type')) {
      //   if (!request.headers.has('No-Content')) {
      //     request = request.clone({
      //       setHeaders: {
      //         'Content-Type': 'application/json',
      //         'ngsw-bypass': 'true'
      //       }
      //     });
      //   }
      // }

      if (!request.headers.has('Content-Type')) {
        if (!request.headers.has('No-Content')) {
          // Check if uploading an image
          if (request.url.includes('/profile/image/update')) {            
            request = request.clone({
              setHeaders: {                
                'No-Content': 'true',
                'ngsw-bypass': 'true'                                           
              }
            });
          }else { // Set default content type for other requests
            console.log('other api upload here');
            request = request.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                'ngsw-bypass': 'true'
              }
            });
          }
        }
      }

      if (!request.headers.has('No-Auth')) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
            Role: '',
            'ngsw-bypass': 'true'
          }
        });
      }

        return next.handle(request);
    }
}
