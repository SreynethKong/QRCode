import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, ToastController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {

  rootPage: any;
  alert: any;
  scheduleList: any;
  passengerToUpdate = [];
  reportToUpdate = [];
  reportData = {
    'busPerScheduleID': '',
    'leave': '',
    'arrive': ''
  };
  loading: Loading;
  checkData: any;
  userInfo = { user_id: '', username: '', fullname: '', profile: '' };

  @ViewChild(Nav) nav: Nav
  constructor(
    public ionicApp: IonicApp,
    public http: Http,
    private toastCtrl: ToastController,
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private loadingCtrl: LoadingController,
    private auth: AuthServiceProvider
  ) {
    if (localStorage.getItem('authentication') == 'authenticated') {
      this.auth.credential = JSON.parse(localStorage.getItem('credential'));
      this.auth.update().subscribe(allowed => {
        if (allowed) {
          if (this.auth.data.validity == 'valid') {
            this.userInfo.user_id = this.auth.data.user_id;
            this.userInfo.username = this.auth.data.username;
            this.userInfo.fullname = this.auth.data.fullname;
            this.userInfo.profile = this.auth.data.profile;
            localStorage.setItem('getAPI', JSON.stringify(this.auth.data.data));
            localStorage.setItem('credential', JSON.stringify(this.userInfo));
            this.auth.credential = JSON.parse(localStorage.getItem('credential'));
          } 
        }
      }, error => {
        console.log(error);
      });
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }

    platform.ready().then(() => {

      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      platform.registerBackButtonAction(() => {
        // get current active page
        let view = this.nav.getActive();
        if (view.component.name == "HomePage") {
          //Double check to exit app                  
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            this.platform.exitApp(); //Exit from app
          } else {
            let toast = this.toastCtrl.create({
              message: 'Press back again to exit App?',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            lastTimeBackPress = new Date().getTime();
          }
        } else if (view.component.name == "LoginPage") {
          this.platform.exitApp();
        }
        else {
          // go to previous page
          this.nav.setRoot(HomePage);
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  home() {
    this.nav.setRoot(HomePage);
  }

  syncToLatest(action) {
    console.log(this.auth.update());
    this.showLoading();

    this.auth.update().subscribe(allowed => {
      if (allowed) {
        if (this.auth.data.validity == 'valid') {
          if (this.auth.data.update == 'success') {
            if (action == 'sync') {
              this.userInfo.user_id = this.auth.data.user_id;
              this.userInfo.username = this.auth.data.username;
              this.userInfo.fullname = this.auth.data.fullname;
              this.userInfo.profile = this.auth.data.profile;
              localStorage.setItem('getAPI', JSON.stringify(this.auth.data.data));
              localStorage.setItem('credential', JSON.stringify(this.userInfo));
              this.auth.credential = JSON.parse(localStorage.getItem('credential'));
              this.loading.dismiss();
              alert("Synced to latest");
              this.nav.setRoot(HomePage);
            } else if (action == 'logout') {
              localStorage.clear();
              this.loading.dismiss();
              this.nav.setRoot(LoginPage);
            }
          } else {
            this.loading.dismiss();
            alert("Error Updation!");
            this.nav.setRoot(HomePage);
          }
        } else {
          this.loading.dismiss();
          alert("Error Authentication!");
          this.nav.setRoot(HomePage);
        }
      }else{
        this.loading.dismiss();
        alert("Error Connection!");
        this.nav.setRoot(HomePage);
      }
    }, error => {
      console.log(error);
    });
  }

  checkReport() {
    window.open('http://10.10.16.135:8080/shuttle-bus', '_self');
  }

  public logOut() {
    this.auth.logout().subscribe(succ => {
      this.syncToLatest('logout');
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}





