import { InjectionToken } from '@angular/core';
import { User } from '../../models';
export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");
export interface AppConfig {
  availableLanguages?: Array<{ code?: string, name?: string, flag?: string, direction?: string }>;
  selectedLanguage?: { code?: string, name?: string, flag?: string, direction?: string };
  isArabic?: boolean;
  user?: User;
  token?: string;
  isTrial?: boolean;
}
export const BaseAppConfig: AppConfig = {
  availableLanguages: [
    { code: 'en', name: 'English', flag: 'us', direction: 'ltr'},
    { code: 'ar', name: 'العربية', flag: 'sa', direction: 'rtl'}
  ],
  selectedLanguage: { code: 'ar', name: 'Arabic', flag: 'sa', direction: 'rtl'},
  isArabic: true,
  isTrial: false,
  user: {}
}


