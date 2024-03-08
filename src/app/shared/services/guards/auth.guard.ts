import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	unAuthorizedUrl = [
		'/',
		'/login',
		'/signup',
		'/forgot-password',
		'/reset-password'
	];

constructor(private configService: ConfigService, private router: Router, private alertService: AlertService,) {}

canActivate(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
):
	| Observable<boolean | UrlTree>
	| Promise<boolean | UrlTree>
	| boolean
	| UrlTree {		
		if (
			this.unAuthorizedUrl.indexOf(state.url) !== -1 ||
			state.url.indexOf('/signup') == 0 ||
			state.url.indexOf('/login') == 0
		) {			
			// UnAuthorized URL
			if(this.configService.token!=undefined){
        if(this.configService.token !== ""){
          this.router.navigate(['/profile']);
					return false;
        }
      }
			return false;			
		} else {			
			// Authorized URL
			if(this.configService.token==undefined){				
        this.router.navigate(['/'], {});
				this.alertService.alert('Login', 'Please login to visit that page.', 'info');
				return false;
      }						
			return true;			
		}
	}
}
