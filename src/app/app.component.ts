import { Component, Inject, OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { CoreTranslationService } from 'src/app/shared/services/config/translation.service';
import { locale as english } from 'src/app/shared/translation/en';
import { locale as arabic } from 'src/app/shared/translation/ar';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { APP_CONFIG, AppConfig } from 'src/app/shared/services/config/app.config';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  core$!: Subscription;
  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    @Inject(DOCUMENT) private document: any,
    private configService: ConfigService,
    private title: Title,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private coreTranslationService: CoreTranslationService,
    private translateService: TranslateService,
    private httpService: HttpService
  ) {

  }

  ngOnInit(): void {
  
    this.translateService.addLangs(['ar', 'en']);
    this.translateService.setDefaultLang('ar');
    this.coreTranslationService.translate(arabic, english);
    this.core$ = this.configService.getAppConfigObservable().subscribe(config =>{
      console.log('AppComponent', config);
      if(!config) return;
      this.config = config;
      this.translateService.setDefaultLang(this.config.selectedLanguage?.code || 'ar');
      const html = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
      html.dir = this.config.selectedLanguage?.direction || 'rtl';
      html.lang = this.config.selectedLanguage?.code || 'ar';
      this.elementRef.nativeElement.style.setProperty('direction', this.config.selectedLanguage?.direction);
      this.translateService.use(this.config.selectedLanguage?.code || 'ar');
      this.title.setTitle(this.coreTranslationService.translateText('Box12'));
    });

    // this.httpService.post('tap_config', {client_id: this.config.user.client_id}).then((response: any)=>{     
    //   console.log('tap_config1', response);    
    //   environment.paymentKey =  response.production_key;
    //   console.log('tap_config2', environment.paymentKey);    
    // }).catch((err) => {      
    //   console.log(err);                              
    // });
  }

  ngOnDestroy(): void {
    if(this.core$) this.core$.unsubscribe();
  }


}