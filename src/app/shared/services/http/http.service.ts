import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import {Observable, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class HttpService {
  private api: string = environment.api;
  public client_id: number = 0;
  constructor(
      private http: HttpClient
  ) {

  }

  initializeDomainFactory(): Observable<any> {
    console.log('initialize here');    
    return this.http.post(this.api+'client', {package_name: environment.package_name})
      .pipe(
        tap(response => {
          console.log('response here', response);
          if(response.status && response.data) this.client_id = response.data;
          console.log('--------------initializeAppFactory--------------');
            console.log(response);
        })
      );
  }

  async get(path: string) {
    const url = this.api+path;
    return new Promise((resolve, reject) => this.http.get(url).pipe(map(this.handleResponse)).subscribe((response: any) => {
      if(response?.error) return reject(response);
      else resolve(response);
    }));
  }
  async post(path: string, body: any) {    
    //body = {...body, client_id: this.client_id};    
    if (!path.includes('profile/image/update')) {
      body = {...body, client_id: this.client_id};
    }    
    const url = this.api+path;
    return new Promise((resolve, reject) => this.http.post(url, body).pipe(map(this.handleResponse)).subscribe((response: any) => {
      if(response?.error) return reject(response);
      else resolve(response);
    }));
  }

  // async post(path: string, body: any) {
  //   const url = this.api + path;
  //   return new Promise((resolve, reject) => {
  //     const options = {
  //       headers: new HttpHeaders(),
  //       reportProgress: true, // Add this line to handle progress events
  //     };
  //     this.http.post(url, body, options).subscribe(
  //       (response: any) => {
  //         if (response?.error) {
  //           reject(response);
  //         } else {
  //           resolve(response);
  //         }
  //       },
  //       (error) => {
  //         console.log(' right here error1', error);
  //         if (error.status == 0) {            
  //           reject({ message: 'Payload Too Large' });
  //         } else {            
  //           reject({ message: 'Uploaded Too Large file' });  
  //         }          
  //       }
  //     );
  //   });
  // }
  
  async put(path: string, body: object) {
    const url = this.api+path;
    return new Promise((resolve, reject) => this.http.put(url, body).pipe(map(this.handleResponse)).subscribe((response: any) => {
      if(response?.error) return reject(response);
      else resolve(response);
    }));
  }


  protected handleResponse(response: any) : any{
    console.log('-------------------------------------------------------');
    console.log('[SERVER]->[RESPONSE]->[', response, ']');
    console.log('-------------------------------------------------------');
  // {"status":false,"message":"The provided credentials are incorrect.","data":null}
    if(response.status && response.data) return response.data;
    if(response.token && response.member) return response;
    if(response.status) return response;
    if(!response.status && response.message) return {error: true, message: response.message };
    else return {error: true, message: 'Something Wrong'};
  }
}
