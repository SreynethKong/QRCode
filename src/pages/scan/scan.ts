import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ScanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  scanData: {};
  passengerList: any;
  passenger: any;
  bpsi = '';
  passengerToUpdate= [];
  flag = false;
  buttonScan = false;
  options: BarcodeScannerOptions;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.getPassenger();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  home() {
    this.navCtrl.setRoot(HomePage);
  }

  scan() {
    this.options = {
      prompt: "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

      if(barcodeData.cancelled){
        let toast = this.toastCtrl.create({
          message: 'No QRCode Found',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else{
        this.passengerList.forEach(data => {
          if (data.bus_per_schedule_id == this.bpsi) {
            data.passenger.forEach(element => {
  
               if (barcodeData.text == element.qrcode) {
                element.status = 'false';
                this.passengerToUpdate.push(element.user_id);
                this.flag = true;
                let alert = this.alertCtrl.create({
                  title: 'Valid User',
                  subTitle: 'QRCode has been confirmed',
                  message: 'Username: ' + element.full_name,
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Scan Next',
                      handler: () => {
                        this.scan();
                        console.log('Buy clicked');
                      }
                    }
                  ]
                });
                alert.present();
              }
              
            });
  
            if(!this.flag){
              let alert = this.alertCtrl.create({
                title: 'Invalid User',
                message: 'The particular QRCode information is incorrect! ',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Scan Again',
                    handler: () => {
                      this.scan();
                      console.log('Scan Again Button is clicked');
                    }
                  }
                ]
              });
              alert.present();
            }
  
          }
        });
      }
    this.flag = false;
    console.log("Passengers to update: "+this.passengerToUpdate);
    localStorage.removeItem('getAPI');
    localStorage.setItem('getAPI',JSON.stringify(this.passengerList));
      
    },(err) => {
      console.log(err);
    });
  }

  getPassenger() {
    this.bpsi = localStorage.getItem('bus_per_schedule_id');
    this.passengerList = JSON.parse(localStorage.getItem('getAPI'));
    this.passengerList.forEach(element => {
      
      if (element['bus_per_schedule_id'] == this.bpsi) {
        this.passenger = element.passenger;
        console.log("Current Date: " + new Date().toLocaleDateString());
        console.log("Date of travel: " + new Date(element['date_of_travel']).toLocaleDateString());
        if(new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()){
          if(localStorage.getItem(element['bus_per_schedule_id']+'ArriveButton')){
            this.buttonScan = false;
          }else{
            this.buttonScan = true;
          }
          
        }
      }
      
    });
  }
}
