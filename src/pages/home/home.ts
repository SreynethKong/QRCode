import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
import { ReportPage } from '../report/report';
import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scheduleList: any;
  scheduleID = '';
  disabled = {};
  checkDate = {};
  colors = ['#DDDDDD', '#A9CCE3', '#D7BDE2', '#E6B0AA', '#D6EAF8'];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public http: Http) {

    this.getSchedules();
    this.check();
  }

  getSchedules() {
    this.scheduleList = JSON.parse(localStorage.getItem('getAPI'));
  }

  scan(bus_per_schedule_id) {
    console.log("Bus Per Schedule ID: " + bus_per_schedule_id);
    localStorage.setItem('bus_per_schedule_id', bus_per_schedule_id);
    this.navCtrl.setRoot(ScanPage);
  }

  report(bus_per_schedule_id){
    localStorage.setItem('bus_per_schedule_id', bus_per_schedule_id);
    this.navCtrl.setRoot(ReportPage);
  }

  leave(bus_per_schedule_id) {
    this.getTime('Leave', bus_per_schedule_id);
  }

  arrive(bus_per_schedule_id) {
    this.getTime('Arrive', bus_per_schedule_id);
  }

  getTime(action, bus_per_schedule_id) {
    this.http.get('http://10.10.16.135:8080/shuttle-bus/getTime')
      .map(res => res.json())
      .subscribe(ele => {
        if (action == 'Leave') {
          let alert = this.alertCtrl.create({
            title: 'Leave Confirmation!',
            subTitle: 'Click OK to confirm your departure at: ' + ele.time,
            buttons: [
              {
                text: 'Cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'OK',
                handler: data => {
                  localStorage.setItem(bus_per_schedule_id + 'LeaveButton', 'left');
                  localStorage.setItem(bus_per_schedule_id + 'Leave', ele.time);
                  this.check();
                  console.log('Saved clicked');
                }
              }
            ]
          });
          alert.present();
        }
        if (action == 'Arrive') {
          let alert = this.alertCtrl.create({
            title: 'Arrival Confirmation!',
            subTitle: 'Click OK to certify your arrival at: ' + ele.time,
            buttons: [
              {
                text: 'Cancel',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'OK',
                handler: data => {
                  localStorage.setItem(bus_per_schedule_id + 'ArriveButton', 'arrived');
                  localStorage.setItem(bus_per_schedule_id + 'Arrive', ele.time);
                  this.check();
                  console.log('Saved clicked');
                }
              }
            ]
          });
          alert.present();
        }

      }, (err) => {
        alert('Connection Error!');
        console.log(err);
      });
  }

  check() {
    this.scheduleList.forEach(element => {
      if (new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()) {
        this.checkDate[element.bus_per_schedule_id + 'CheckDate'] = true;
        if (localStorage.getItem(element.bus_per_schedule_id + 'LeaveButton') == null && localStorage.getItem(element.bus_per_schedule_id + 'ArriveButton') == null) {
          this.disabled[element.bus_per_schedule_id + 'LeaveButton'] = false;
          this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = true;
          this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = false;
        }
        else if (localStorage.getItem(element.bus_per_schedule_id + 'LeaveButton') == 'left') {
          this.disabled[element.bus_per_schedule_id + 'LeaveButton'] = true;
          this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = false;
          this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = false;
        }
        if (localStorage.getItem(element.bus_per_schedule_id + 'ArriveButton') == 'arrived') {
          this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = true;
          this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = true;
          this.disabled[element.bus_per_schedule_id + 'DisableReportButton'] = false;
        }
        if (localStorage.getItem(element.bus_per_schedule_id + 'DisableReportButton') == 'reported') {
          this.disabled[element.bus_per_schedule_id + 'DisableReportButton'] = true;
        }
      } else {
        this.checkDate[element.bus_per_schedule_id + 'CheckDate'] = false;
      }
    });
  }
}
