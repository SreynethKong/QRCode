import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  submitForm: any;
  form: any;
  reportData = {
    'busPerScheduleID': '',
    'leave': '',
    'arrive': '',
    'distance': '',
    'time': '',
    'fuel': '',
    'expense': '',
    'extraInfo': ''
  };
  report: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public http: Http) {
    this.reportData.busPerScheduleID = localStorage.getItem('bus_per_schedule_id');
    this.reportData.leave = localStorage.getItem(this.reportData.busPerScheduleID + 'Leave');
    this.reportData.arrive = localStorage.getItem(this.reportData.busPerScheduleID + 'Arrive');
    this.reportData.time = this.getTotalTime(this.reportData.leave, this.reportData.arrive);
    this.form = true;
    this.submitForm = false;
  }

  ngOnInit() {
    this.report = new FormGroup({
      distance: new FormControl('', [Validators.required]),
      fuel: new FormControl('', [Validators.required]),
      expense: new FormControl('', [Validators.required]),
      extraInfo: new FormControl('')
    });

  }

  onlyDecimalNumberKey(event) {
    console.log();

    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

    // if (charCode === 46 && this.value.split('.').length === 2) {
    //     return false;
    return true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  home() {
    this.navCtrl.setRoot(HomePage);
  }

  onSubmit() {
    console.log(this.report.get('distance').value);

    if (this.report.get('distance').value == '' || this.report.get('fuel').value == '' || this.report.get('expense').value == '') {
      let toast = this.toastCtrl.create({
        message: 'Please input all required fields!',
        duration: 2500,
        position: 'bottom'
      });
      toast.present();
    } 
    else if(this.report.get('distance').value < 1 || this.report.get('fuel').value < 1 || this.report.get('expense').value < 100||this.report.get('expense').value%100 != 0 ||this.report.get('distance').value > 999999 || this.report.get('fuel').value > 999999 || this.report.get('expense').value > 999999999){
      let toast = this.toastCtrl.create({
        message: 'Please check all the fields again!',
        duration: 2500,
        position: 'bottom'
      });
      toast.present();
    }
    else {
      this.reportData.leave = this.splitTime(this.reportData.leave);
      this.reportData.arrive = this.splitTime(this.reportData.arrive);
      this.reportData.distance = parseFloat(this.report.get('distance').value).toString() ;
      this.reportData.fuel = parseFloat(this.report.get('fuel').value).toString();
      this.reportData.expense = parseFloat(this.report.get('expense').value).toString();
      this.reportData.extraInfo = this.report.get('extraInfo').value;
      let confirm = this.alertCtrl.create({
        title: 'Confirm your report input',
        message: 'Total Distance : '+ this.reportData.distance+' [km]'+
        '<br>Fuel in Liters : '+this.reportData.fuel+' [liters]'+
        '<br>Total Expense: '+ this.reportData.expense+' [riels]'+
        '<br>Extra Information: '+ this.reportData.extraInfo,
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              this.confirmSubmit(this.reportData);
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }
  }


  confirmSubmit(reportData) {
    console.log(reportData.leave);
    this.showLoading();
    localStorage.setItem(reportData.busPerScheduleID + 'reportData', JSON.stringify(reportData));
    let headers = new Headers();
    headers.append('data', JSON.stringify(reportData));
    this.http.get('http://96.9.67.154:8081/shuttlebus/updateDriverReport', { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        if (data.update == 'success') {
          this.reportData.leave = localStorage.getItem(this.reportData.busPerScheduleID + 'Leave');
          this.reportData.arrive = localStorage.getItem(this.reportData.busPerScheduleID + 'Arrive');
          this.form = false;
          this.submitForm = true;
          localStorage.setItem(reportData.busPerScheduleID + 'DisableReportButton', 'reported');
          this.loading.dismiss();
          alert("Your report is successfully submitted!");
        } else {
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

  splitTime(timeToSplit) {
    let timeSplit = timeToSplit.split(':');
    let timeFormat = timeSplit[0] + '-' + timeSplit[1] + '-' + timeSplit[2];
    console.log("TimeFormat: " + timeFormat);
    return timeFormat;
  }

  getTotalTime(leave, arrive) {
    let splitLeave = leave.split(':');
    let splitArrive = arrive.split(':');
    var hours = (parseInt(splitArrive[0]) - 1) - parseInt(splitLeave[0]);
    var minutes = 60 - parseInt(splitLeave[1]) + parseInt(splitArrive[1]);
    if (minutes >= 60) {
      let temp = Math.floor(minutes / 60);
      hours = hours + temp;
      minutes = minutes - temp * 60;
    }
    let total = hours + 'h' + minutes + 'mn';
    console.log('Total Time: ' + total);
    return total;
  }

}
