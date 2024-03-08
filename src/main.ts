/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

enableProdMode();
// console.log = () => {};
// console.error = () => {};
// console.debug = () => {};
// console.warn = () => {};

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
