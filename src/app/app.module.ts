import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { ReportPage } from '../pages/report/report';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Network } from '@ionic-native/network';
import { CallNumber } from '@ionic-native/call-number';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ScanPage,
    ReportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ScanPage,
    ReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Network
  ]
})
export class AppModule {
  
}
