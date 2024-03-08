import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
      private _router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
          console.log('intercept->err->[status]', err.status);
          console.log('intercept->err->[typeof][status]', typeof err.status);
          console.log('intercept->err->[statusText]', err.statusText);
          console.log('intercept->err->[typeof][statusText]', typeof err.statusText);
          console.log('intercept->err->[check][Forbidden]', err.status === 403 && err.statusText === "Forbidden");
          console.log('intercept->err->[check][Unauthorized]', err.status === 401 && err.statusText === "Unauthorized");
        //   if (err.status === 403 && err.statusText === "Forbidden") {
        //     // this.configService.clearLogout();
        // } if (err.status === 401 && err.statusText === "Unauthorized") {
        //       this.configService.clearLogout();
        //   } if (err.status === 404) {
        //       this._router.navigate(['/']);
        //   }
        const error = err.error?.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
