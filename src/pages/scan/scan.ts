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
  passengerToUpdate = [];
  flag = false;
  buttonScan = true;
  view: any;
  private options: BarcodeScannerOptions;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
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

      if (barcodeData.cancelled) {
        localStorage.setItem('cancel_scan','true');
        let toast = this.toastCtrl.create({
          message: 'No QRCode Found',
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
        console.log("BarcodeScanner is cancelled!!!");
      
      }
      else {
        this.passengerList.forEach(data => {
          if (data.id == this.bpsi) {
            data.passenger_list.forEach(element => {

              if (element.qr_status == true) {
                this.flag = true;
                let alert = this.alertCtrl.create({
                  title: 'QRCode has been checked already',
                  message: 'Username: ' + element.full_name,
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel Button is clicked');
                      }
                    },
                    {
                      text: 'Scan Next',
                      handler: () => {
                        this.scan();
                        console.log('Scan Next Button is clicked');
                      }
                    }
                  ]
                });
                alert.present();
              } else {
                if (barcodeData.text == element.qrcode) {
                  element.qr_status = true;
                  this.passengerToUpdate.push(element.id);
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
                          console.log('Cancel Button is clicked');
                        }
                      },
                      {
                        text: 'Scan Next',
                        handler: () => {
                          this.scan();
                          console.log('Scan Next Button is clicked');
                        }
                      }
                    ]
                  });
                  alert.present();
                }

              }
            });

            if (!this.flag) {
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
      console.log("Passengers to update: " + this.passengerToUpdate);
      localStorage.setItem('list_schedules', JSON.stringify(this.passengerList));
    }, (err) => {
      console.log(err);
    });
  }

  getPassenger() {
    this.bpsi = localStorage.getItem('schedule_id');
    this.passengerList = JSON.parse(localStorage.getItem('list_schedules'));
    this.passengerList.forEach(element => {

      if (element['id'] == this.bpsi) {
        this.passenger = element.passenger_list;
        console.log("Current Date: " + new Date().toLocaleDateString());
        console.log("Date of travel: " + new Date(element['dep_date']).toLocaleDateString());
        if(new Date(element['dep_date']).toLocaleDateString() == new Date().toLocaleDateString()){
          this.buttonScan = false;
          console.log("Button Scan: "+ this.buttonScan);
        }
      }

    });
  }
}
