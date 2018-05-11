import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { Http } from '@angular/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
// import { Network } from '@ionic-native/network';
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

  email = '';
  password = '';
  loading: Loading;
  loginForm: FormGroup;
  space = false;
  registerCredentials = { email: '', password: ''};

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
      email: new FormControl('', [Validators.required,Validators.email]),
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
    this.registerCredentials.email = this.loginForm.get('email').value;
    this.registerCredentials.password = this.loginForm.get('password').value;
    console.log(this.loginForm.get('email').value);
    var email_format = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if(this.registerCredentials.email.toString() == '' || this.registerCredentials.password.toString() == ''){
      this.showLoading();
      this.showError("Please input your credentials!");
    }else{
      if(!email_format.test(this.registerCredentials.email)){
        console.log('True');
        this.showLoading();
        this.showError("Please input valid email address!");
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
      title: 'Incorrect Email or Password!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
