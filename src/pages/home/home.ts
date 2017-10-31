import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scheduleList : any;
  scheduleID = '';
  disabled = {};
  checkDate = {};
  buttonReport = true;
  loading: Loading;
  reportData = {
    'busPerScheduleID':'',
    'leave':'',
    'arrive':'',
    'distance':'',
    'time':'',
    'fuel':'',
    'expense':'',
    'extraInfo':''};
  colors = ['#DDDDDD','#A9CCE3','#D7BDE2','#E6B0AA','#D6EAF8'];
  random = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public http: Http) {
    
    this.randomColor();
    this.getSchedules();
    this.check();
  }

  getSchedules() {
    this.scheduleList = JSON.parse(localStorage.getItem('getAPI'));
  }

  scan(bus_per_schedule_id){
    console.log("Bus Per Schedule ID: "+bus_per_schedule_id);
    localStorage.setItem('bus_per_schedule_id',bus_per_schedule_id);
    this.navCtrl.setRoot(ScanPage);
  }

  leave(bus_per_schedule_id){
    let timeLeave = new Date().toLocaleTimeString();
    console.log(timeLeave.split(':'));
    let test = timeLeave.split(':');
    let timeFormat = test[0]+'-'+test[1]+'-'+test[2];
    console.log(timeFormat);

    let alert = this.alertCtrl.create({
      title: 'Leave Confirmation!',
      subTitle: 'Click OK to claim your departure at: ' + timeLeave,
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
            localStorage.setItem(bus_per_schedule_id+'LeaveButton','left');
            localStorage.setItem(bus_per_schedule_id+'Leave', timeFormat);
            this.check();
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
  }

  arrive(bus_per_schedule_id){
    let timeArrive = new Date().toLocaleTimeString();
    let test = timeArrive.split(':');
    let timeFormat = test[0]+'-'+test[1]+'-'+test[2];
    console.log(timeFormat);
    let alert = this.alertCtrl.create({
      title: 'Arrival Confirmation!',
      subTitle: 'Click OK to certify your arrival at: ' + timeArrive,
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
            localStorage.setItem(bus_per_schedule_id+'ArriveButton','arrived');
            localStorage.setItem(bus_per_schedule_id+'Arrive',timeFormat);
            this.check();
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();
  }

  check(){
    this.scheduleList.forEach(element => {
      if(new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()){
        this.checkDate[element.bus_per_schedule_id+'CheckDate'] = true;
        if(localStorage.getItem(element.bus_per_schedule_id+'LeaveButton')== null && localStorage.getItem(element.bus_per_schedule_id+'ArriveButton')== null ){
          this.disabled[element.bus_per_schedule_id+'LeaveButton'] = false;
          this.disabled[element.bus_per_schedule_id+'ArriveButton'] = true;
          this.disabled[element.bus_per_schedule_id+'ShowReportButton'] = false;
        }
        else if(localStorage.getItem(element.bus_per_schedule_id+'LeaveButton')=='left'){
          this.disabled[element.bus_per_schedule_id+'LeaveButton'] = true;
          this.disabled[element.bus_per_schedule_id+'ArriveButton'] = false;
          this.disabled[element.bus_per_schedule_id+'ShowReportButton'] = false;
        }
        if(localStorage.getItem(element.bus_per_schedule_id+'ArriveButton')=='arrived'){
          this.disabled[element.bus_per_schedule_id+'ArriveButton'] = true;
          this.disabled[element.bus_per_schedule_id+'ShowReportButton'] = true;
          this.disabled[element.bus_per_schedule_id+'DisableReportButton'] = false;
        }
        if(localStorage.getItem(element.bus_per_schedule_id+'DisableReportButton')=='reported'){
          this.disabled[element.bus_per_schedule_id+'DisableReportButton'] = true;
        }
      }else{
        this.checkDate[element.bus_per_schedule_id+'CheckDate'] = false;
      }
    });
  }

  report(bus_per_schedule_id){
    // let leave = new Date(localStorage.getItem(bus_per_schedule_id+'Leave'));
    // let arrive = new Date(localStorage.getItem(bus_per_schedule_id+'Arrive'));
    let prompt = this.alertCtrl.create({
      title: 'Fill Out Report!',
      inputs: [
        {
          name: 'distance',
          type: 'number',
          placeholder: 'Total Distance in Km'
        },
        {
          name: 'time',
          placeholder: 'Total Time Spent'
        },
        {
          name: 'fuel',
          type: 'number',
          placeholder: 'Fuel in Liters'
        },
        {
          name: 'expense',
          type: 'number',
          placeholder: 'Expense in Riels'
        },
        {
          name: 'extraInfo',
          type: 'text',
          placeholder: 'Extra Info'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.reportData.busPerScheduleID = bus_per_schedule_id;
            this.reportData.leave = localStorage.getItem(bus_per_schedule_id+'Leave');
            this.reportData.arrive = localStorage.getItem(bus_per_schedule_id+'Arrive');
            this.reportData.distance = data.distance;
            this.reportData.time = data.time;
            this.reportData.fuel = data.fuel;
            this.reportData.expense = data.expense;
            this.reportData.extraInfo = data.extraInfo;
            this.confirmSubmit(this.reportData);
            console.log('Saved clicked ' + data.distance + this.reportData);
          }
        }
      ]
    });
    prompt.present();
  }

  confirmSubmit(reportData){
    this.showLoading();
    let credential = JSON.parse(localStorage.getItem('credential'));
    let headers = new Headers();
    headers.append('data', JSON.stringify(reportData));
    this.http.get('http://10.10.16.135:8080/shuttle-bus/updateDriverReport?username='+credential.username+'&&password='+credential.password, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        if(data.update == 'success'){
          localStorage.setItem(reportData.busPerScheduleID+'DisableReportButton','reported');
          this.check();
          this.loading.dismiss();
          alert("Your report is successfully submitted!");
        }else{
          this.loading.dismiss();
          alert("Error: Fail to submit report!");
        }
      }, (err) => {
        this.loading.dismiss();
        alert("Error Connection!");
        console.log(err);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  randomColor(){
    for(var i=0; this.random.length < this.colors.length; i++){
      const index = Math.floor(Math.random() * this.colors.length);
      if(this.random.indexOf(this.colors[index]) === -1) {
        this.random.push(this.colors[index]);
        }
    }
    console.log("Random Colors: "+this.random);
  }
}
