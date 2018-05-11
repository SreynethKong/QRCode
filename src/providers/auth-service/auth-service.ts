import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {

  credential = {email:'',username:'',password:'',fullname:'',profile:''};
  scheduleList: any;
  data: any;
  passengerToUpdate = [];
  reportToUpdate = [];
  reportData = {
    'busPerScheduleID': '',
    'leave': '',
    'arrive': ''
  };

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public login(credentials) {
    if (credentials.email == null || credentials.password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.http.get('http://188.166.173.225:8080/sbs/checkValidity?email=' + credentials.email + '&&password=' + credentials.password).map(res => res.json()).subscribe(data => {
          console.log(data);
          if (data.validity == true) {
            data.list_schedules.forEach(element => {
              if(element.report_arrival != 'false'){
                localStorage.setItem(element.bus_per_schedule_id+'ArriveButton','arrived');
                localStorage.setItem(element.bus_per_schedule_id+'Arrive',element.report_arrival);
              }
              if(element.report_departure != 'false'){
                localStorage.setItem(element.bus_per_schedule_id+'LeaveButton','left');
                localStorage.setItem(element.bus_per_schedule_id+'Leave',element.report_departure)
              }
              if(element.report_status == 'true'){
                localStorage.setItem(element.bus_per_schedule_id+'DisableReportButton','reported');
              }
            });
            this.credential.email = credentials.email;
            this.credential.username = credentials.username;
            this.credential.fullname = data.fullname;
            this.credential.profile = data.profile;
            localStorage.setItem('list_schedules', JSON.stringify(data.list_schedules));
            localStorage.setItem('authentication', 'authenticated');
            localStorage.setItem('credential',JSON.stringify(this.credential));
            console.log(credentials);
            observer.next(true);
            observer.complete();
          } else if (data.validity == false){
            localStorage.setItem('authentication', 'denied');
            observer.next(false);
            observer.complete();
          }
        }, (err) => {
          console.log(err);
          observer.next(false);
          observer.complete();
        });
      });
    }
  }

  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public update(){
    return Observable.create( observer=>{
      this.scheduleList = JSON.parse(localStorage.getItem('list_schedules'));
      this.scheduleList.forEach(element => {
  
        // this.reportData.busPerScheduleID = element.bus_per_schedule_id;
        // if (element.report_departure == 'false') {
        //   this.reportData.leave = localStorage.getItem(element.bus_per_schedule_id + 'Leave');
        // } else {
        //   this.reportData.leave = element.report_departure;
        // }
        // if (element.report_arrival == 'false') {
        //   this.reportData.arrive = localStorage.getItem(element.bus_per_schedule_id + 'Arrive');
        // } else {
        //   this.reportData.arrive = element.report_arrival;
        // }
        // localStorage.setItem('reportData',JSON.stringify(this.reportData));
        
        // this.reportToUpdate.push(JSON.parse(localStorage.getItem('reportData')));

        element.passenger_list.forEach(element => {
          if (element.qr_status == true) {
            this.passengerToUpdate.push(element.id);
          }
        });
      });
      console.log("Passenger: " + this.passengerToUpdate);
      let credential = JSON.parse(localStorage.getItem('credential'));
  
      let headers = new Headers();
      headers.append('data', JSON.stringify(this.passengerToUpdate));
      // headers.append('report', JSON.stringify(this.reportToUpdate));
      this.http.get('http://188.166.173.225:8080/sbs/updatePassenger?email=' + credential.email, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          console.log(data.update);
          this.data = data;
          this.passengerToUpdate = [];
          // this.reportToUpdate = [];
          observer.next(true);
          observer.complete();
        }, (err) => {
          this.passengerToUpdate = [];
          // this.reportToUpdate = [];
          console.log(err);
          observer.next(false);
          observer.complete();
        });
    });

  }
}
