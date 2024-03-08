import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG, AppConfig, BaseAppConfig } from 'src/app/shared/services/config/app.config';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
  private database: string = '3DAYS';
  private core$ = new BehaviorSubject<AppConfig>({});
  constructor(
      @Inject(APP_CONFIG) public config: AppConfig,
      private router: Router,
      private local: LocalStorageService
  ) {

  }

  set set(data: AppConfig) {
    this.local.set(this.database, data, 1, 'd');
  }
  get get(): AppConfig {
   return this.local.get(this.database);
  }
  remove() {
    this.local.remove(this.database);
  }
  clear() {
    this.local.clear();
  }

  get appSettingsValues(): AppConfig{
      return this.core$.value;
  }

  get token(): string {
    return this.core$.value.token;
  }
  async initializerApp() {
    this.setAppConfig(this.get);
  }

  setAppConfig(data?: AppConfig){
    console.log('setAppConfig', data);
      if(data) this.config = data;
      this.core$.next(this.config);
      this.set = this.config;
  }

  getAppConfigObservable(): Observable<AppConfig> {
    return this.core$.asObservable();
  }

  async ngOnDestroy() {
      if(this.core$) this.core$.unsubscribe();
  }

  logout() {
    delete this.config.token;
    this.config.user = {};
    this.setAppConfig(this.config);
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  isEmpty(obj: Record<string, any>): boolean {
      return Object.keys(obj).length === 0;
  }

}
