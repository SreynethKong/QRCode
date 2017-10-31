import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, ToastController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, Headers } from '@angular/http';
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
  loading: Loading;
  checkData: any;
  clear = true;

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
    this.showLoading();
    this.scheduleList = JSON.parse(localStorage.getItem('getAPI'));
    this.scheduleList.forEach(element => {
      element.passenger.forEach(element => {
        if (element.status == 'false') {
          this.passengerToUpdate.push(element.id);
        }
      });
    });

    console.log("Passenger: " + this.passengerToUpdate);
    let credential = JSON.parse(localStorage.getItem('credential'));

    let headers = new Headers();
    headers.append('data', JSON.stringify(this.passengerToUpdate));

    this.http.get('http://10.10.16.135:8080/shuttle-bus/updatePassenger?username=' + credential.username + '&&password=' + credential.password, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        console.log(data.update);
        if (data.update == 'success') {
          if (action == 'sync') {
            localStorage.setItem('getAPI', JSON.stringify(data.data));
            this.loading.dismiss();
            alert("Synced to latest");
          } else if (action == 'logout') {
            data.data.forEach(element => {
              
              if(new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()){
                console.log("Date of Travel: "+element['date_of_travel']);
                this.clear = false;
              }
            });
            console.log("Clear: "+this.clear);
            if(this.clear){
              localStorage.clear();
          }
            this.loading.dismiss();
          }
        } else {
          this.loading.dismiss();
          alert("Error!");
        }
      }, (err) => {
        this.loading.dismiss();
        alert("Error Connection!");
        console.log(err);
      });
    this.passengerToUpdate = [];
  }

  checkReport() {
    window.open('http://google.com', '_self');
  }

  public logOut() {
    this.auth.logout().subscribe(succ => {
      this.syncToLatest('logout');
      this.nav.setRoot(LoginPage);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}





