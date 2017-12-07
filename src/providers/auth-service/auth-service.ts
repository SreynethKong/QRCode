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

  credential = {user_id:'', username:'',fullname:'',profile:''};
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
    if (credentials.username == null || credentials.password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.http.get('http://96.9.67.154:8081/shuttlebus/checkValidity?username=' + credentials.username + '&&password=' + credentials.password).map(res => res.json()).subscribe(data => {

          if (data.validity === 'valid') {
            data.data.forEach(element => {
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
            this.credential.user_id = data.user_id;
            this.credential.username = data.username;
            this.credential.fullname = data.fullname;
            this.credential.profile = data.profile;
            localStorage.setItem('getAPI', JSON.stringify(data.data));
            localStorage.setItem('authentication', 'authenticated');
            localStorage.setItem('credential',JSON.stringify(this.credential));
            console.log(credentials);
            observer.next(true);
            observer.complete();
          } else if (data.validity ==='invalid'){
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
      this.scheduleList = JSON.parse(localStorage.getItem('getAPI'));
      this.scheduleList.forEach(element => {
  
        this.reportData.busPerScheduleID = element.bus_per_schedule_id;
        if (element.report_departure == 'false') {
          this.reportData.leave = localStorage.getItem(element.bus_per_schedule_id + 'Leave');
        } else {
          this.reportData.leave = element.report_departure;
        }
        if (element.report_arrival == 'false') {
          this.reportData.arrive = localStorage.getItem(element.bus_per_schedule_id + 'Arrive');
        } else {
          this.reportData.arrive = element.report_arrival;
        }
        localStorage.setItem('reportData',JSON.stringify(this.reportData));
        
        this.reportToUpdate.push(JSON.parse(localStorage.getItem('reportData')));
        element.passenger.forEach(element => {
          if (element.status == 'true') {
            this.passengerToUpdate.push(element.id);
          }
        });
      });
      console.log("Passenger: " + this.passengerToUpdate);
      let credential = JSON.parse(localStorage.getItem('credential'));
  
      let headers = new Headers();
      headers.append('data', JSON.stringify(this.passengerToUpdate));
      headers.append('report', JSON.stringify(this.reportToUpdate));
      this.http.get('http://96.9.67.154:8081/shuttlebus/updatePassenger?userId=' + credential.user_id, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          console.log(data.update);
          this.data = data;
          this.passengerToUpdate = [];
          this.reportToUpdate = [];
          observer.next(true);
          observer.complete();
        }, (err) => {
          this.passengerToUpdate = [];
          this.reportToUpdate = [];
          console.log(err);
          observer.next(false);
          observer.complete();
        });
    });

  }
}
