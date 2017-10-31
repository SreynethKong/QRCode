import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export class User {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

@Injectable()
export class AuthServiceProvider {

  currentUser: User;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public login(credentials) {
    if (credentials.username == null || credentials.password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.http.get('http://10.10.16.135:8080/shuttle-bus/schedule_api?username=' + credentials.username + '&&password=' + credentials.password).map(res => res.json()).subscribe(data => {

          if (data.validity === 'valid') {
            this.currentUser = new User(credentials.username, credentials.password);
            localStorage.setItem('getAPI', JSON.stringify(data.data));
            localStorage.setItem('authentication', 'authenticated');
            localStorage.setItem('credential',JSON.stringify(credentials));
            console.log(credentials);
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }

        });

      });
    }
  }


  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
