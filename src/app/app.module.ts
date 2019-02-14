import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { ClienteService } from './../services/domain/cliente.service';
import { AuthService } from './../services/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { ErrorInterceptorProvider } from './../interceptors/error-interceptor';
import { CategoriaService } from './../services/domain/categoria.service';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from '../services/storage.services';

@NgModule({
  declarations: [
    MyApp,
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
