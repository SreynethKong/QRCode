import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private auth: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController) {
      
  }

  username = '';
  password = '';
  loading: Loading;
  loginForm: FormGroup;
  space = false;
  registerCredentials = { username: '', password: ''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required])
    });

  }

  noSpace(event){
    if(event.which === 32) {
      this.space = true;
      return false;
    }
    this.space = false;
    return true;
  }

  public login() {
    this.registerCredentials.username = this.loginForm.get('username').value;
    this.registerCredentials.password = this.loginForm.get('password').value;
    console.log(this.loginForm.get('username').value);
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(this.registerCredentials.username.toString() == '' || this.registerCredentials.password.toString() == ''){
      this.showLoading();
      this.showError("Please input your credentials!");
    }else{
      if(this.registerCredentials.username.toString().length >30){
        this.showLoading();
        this.showError("Check your username again!\nUsername has reached maximum length of 30 characters");
      }
      else if(format.test(this.registerCredentials.username)||format.test(this.registerCredentials.password)){
        console.log('True');
        this.showLoading();
        this.showError("No special characters allowed!");
      }else{
        this.showLoading();
        this.auth.login(this.registerCredentials).subscribe(allowed => {
          if (allowed) { 
            this.navCtrl.setRoot(HomePage);
          } else {
            
            if(localStorage.getItem('authentication')=='denied')   {
              this.showError("Access Denied");
              localStorage.clear();
            }  else{
              this.loading.dismiss();
              alert('Connection Error!');
            } 
          }
        },
          error => {
            this.loading.dismiss();
            this.showError(error);
          });
      }
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Incorrect Username or Password!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
