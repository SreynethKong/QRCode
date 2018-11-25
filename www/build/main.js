webpackJsonp([3],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReportPage = (function () {
    function ReportPage(navCtrl, loadingCtrl, toastCtrl, alertCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.http = http;
        this.reportData = {
            'busPerScheduleID': '',
            'leave': '',
            'arrive': '',
            'distance': '',
            'time': '',
            'fuel': '',
            'expense': '',
            'extraInfo': ''
        };
        this.reportData.busPerScheduleID = localStorage.getItem('bus_per_schedule_id');
        this.reportData.leave = localStorage.getItem(this.reportData.busPerScheduleID + 'Leave');
        this.reportData.arrive = localStorage.getItem(this.reportData.busPerScheduleID + 'Arrive');
        this.reportData.time = this.getTotalTime(this.reportData.leave, this.reportData.arrive);
        this.form = true;
        this.submitForm = false;
    }
    ReportPage.prototype.ngOnInit = function () {
        this.report = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormGroup */]({
            distance: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required]),
            fuel: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required]),
            expense: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required]),
            extraInfo: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */]('')
        });
    };
    ReportPage.prototype.onlyDecimalNumberKey = function (event) {
        console.log();
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        // if (charCode === 46 && this.value.split('.').length === 2) {
        //     return false;
        return true;
    };
    ReportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReportPage');
    };
    ReportPage.prototype.home = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    ReportPage.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.report.get('distance').value);
        if (this.report.get('distance').value == '' || this.report.get('fuel').value == '' || this.report.get('expense').value == '') {
            var toast = this.toastCtrl.create({
                message: 'Please input all required fields!',
                duration: 2500,
                position: 'bottom'
            });
            toast.present();
        }
        else if (this.report.get('distance').value < 1 || this.report.get('fuel').value < 1 || this.report.get('expense').value < 100 || this.report.get('expense').value % 100 != 0 || this.report.get('distance').value > 999999 || this.report.get('fuel').value > 999999 || this.report.get('expense').value > 999999999) {
            var toast = this.toastCtrl.create({
                message: 'Please check all the fields again!',
                duration: 2500,
                position: 'bottom'
            });
            toast.present();
        }
        else {
            this.reportData.leave = this.splitTime(this.reportData.leave);
            this.reportData.arrive = this.splitTime(this.reportData.arrive);
            this.reportData.distance = parseFloat(this.report.get('distance').value).toString();
            this.reportData.fuel = parseFloat(this.report.get('fuel').value).toString();
            this.reportData.expense = parseFloat(this.report.get('expense').value).toString();
            this.reportData.extraInfo = this.report.get('extraInfo').value;
            var confirm_1 = this.alertCtrl.create({
                title: 'Confirm your report input',
                message: 'Total Distance : ' + this.reportData.distance + ' [km]' +
                    '<br>Fuel in Liters : ' + this.reportData.fuel + ' [liters]' +
                    '<br>Total Expense: ' + this.reportData.expense + ' [riels]' +
                    '<br>Extra Information: ' + this.reportData.extraInfo,
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function () {
                            console.log('Disagree clicked');
                        }
                    },
                    {
                        text: 'Confirm',
                        handler: function () {
                            _this.confirmSubmit(_this.reportData);
                            console.log('Agree clicked');
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    ReportPage.prototype.confirmSubmit = function (reportData) {
        var _this = this;
        console.log(reportData.leave);
        this.showLoading();
        localStorage.setItem(reportData.busPerScheduleID + 'reportData', JSON.stringify(reportData));
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append('data', JSON.stringify(reportData));
        this.http.get('http://96.9.67.154:8081/shuttlebus/updateDriverReport', { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.update == 'success') {
                _this.reportData.leave = localStorage.getItem(_this.reportData.busPerScheduleID + 'Leave');
                _this.reportData.arrive = localStorage.getItem(_this.reportData.busPerScheduleID + 'Arrive');
                _this.form = false;
                _this.submitForm = true;
                localStorage.setItem(reportData.busPerScheduleID + 'DisableReportButton', 'reported');
                _this.loading.dismiss();
                alert("Your report is successfully submitted!");
            }
            else {
                _this.loading.dismiss();
                alert("Error: Fail to submit report!");
            }
        }, function (err) {
            _this.loading.dismiss();
            alert("Error Connection!");
            console.log(err);
        });
    };
    ReportPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    ReportPage.prototype.splitTime = function (timeToSplit) {
        var timeSplit = timeToSplit.split(':');
        var timeFormat = timeSplit[0] + '-' + timeSplit[1] + '-' + timeSplit[2];
        console.log("TimeFormat: " + timeFormat);
        return timeFormat;
    };
    ReportPage.prototype.getTotalTime = function (leave, arrive) {
        var splitLeave = leave.split(':');
        var splitArrive = arrive.split(':');
        var hours = (parseInt(splitArrive[0]) - 1) - parseInt(splitLeave[0]);
        var minutes = 60 - parseInt(splitLeave[1]) + parseInt(splitArrive[1]);
        if (minutes >= 60) {
            var temp = Math.floor(minutes / 60);
            hours = hours + temp;
            minutes = minutes - temp * 60;
        }
        var total = hours + 'h' + minutes + 'mn';
        console.log('Total Time: ' + total);
        return total;
    };
    return ReportPage;
}());
ReportPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-report',template:/*ion-inline-start:"/Users/MacBook/QRCode/src/pages/report/report.html"*/'<!--\n  Generated template for the ReportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="home()">\n        <ion-icon name="arrow-round-back"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="title">Report Form</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n\n    <ion-card-header>\n      <h1>Schedule Details</h1>\n    </ion-card-header>\n\n    <ion-card-content padding>\n      <h2>\n        <span class="data">Departure Time : </span> {{reportData.leave}}</h2>\n      <h2>\n        <span class="data">Arrival Time : </span> {{reportData.arrive}}</h2>\n      <h2>\n        <span class="data">Total Time Spent: </span> {{reportData.time}}</h2>\n      <h2 *ngIf="submitForm">\n        <span class="data">Total Distance: </span> {{reportData.distance}} [km]</h2>\n      <h2 *ngIf="submitForm">\n        <span class="data">Fuel in Liters: </span> {{reportData.fuel}} [liters]</h2>\n      <h2 *ngIf="submitForm">\n        <span class="data">Total Expense: </span> {{reportData.expense}} [riels]</h2>\n      <h2 *ngIf="submitForm">\n        <span class="data">Extra Information: </span> {{reportData.extraInfo}}</h2>\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <form novalidate (ngSubmit)="onSubmit(report)" [formGroup]="report" *ngIf="form">\n\n    <ion-item no-lines>\n      <ion-label stacked>Total Distance :</ion-label>\n      <ion-input class="input" type="number" value="" min="1" max="999999" formControlName="distance" placeholder="km" (keypress)="onlyDecimalNumberKey($event)"></ion-input>\n    </ion-item>\n\n    <div class="error" *ngIf="report.get(\'distance\').value.toString() == \'\' && report.get(\'distance\').hasError(\'required\') && report.get(\'distance\').touched">\n      *field is required\n    </div>\n    <div class="error" *ngIf="report.get(\'distance\').value.toString() != \'\' && report.get(\'distance\').value < 1 && report.get(\'distance\').touched">\n      *value cannot be zero\n    </div>\n    <div class="error" *ngIf="report.get(\'distance\').value > 999999 && report.get(\'distance\').touched">\n      *maximum value [999999]\n    </div>\n\n    <ion-item no-lines>\n      <ion-label stacked>Fuel in Liters :</ion-label>\n      <ion-input class="input" type="number" value="" min="1" max="999999" formControlName="fuel" placeholder="liters" (keypress)="onlyDecimalNumberKey($event)"></ion-input>\n    </ion-item>\n\n    <div class="error" *ngIf="report.get(\'fuel\').value.toString() == \'\' && report.get(\'fuel\').hasError(\'required\') && report.get(\'fuel\').touched">\n      *field is required\n    </div>\n    <div class="error" *ngIf="report.get(\'fuel\').value.toString() != \'\' && report.get(\'fuel\').value<1 && report.get(\'fuel\').touched">\n      *value cannot be zero\n    </div>\n    <div class="error" *ngIf="report.get(\'fuel\').value > 999999 && report.get(\'fuel\').touched">\n      *maximum value [999999]\n    </div>\n\n    <ion-item no-lines>\n      <ion-label stacked>Total Expense :</ion-label>\n      <ion-input class="input" type="number" value="" min="100" max="" step="100" formControlName="expense" placeholder="riels"\n        (keypress)="onlyDecimalNumberKey($event)"></ion-input>\n    </ion-item>\n\n    <div class="error" *ngIf="report.get(\'expense\').value.toString() == \'\'  && report.get(\'expense\').hasError(\'required\') && report.get(\'expense\').touched">\n      *field is required\n    </div>\n    <div class="error" *ngIf="report.get(\'expense\').value.toString() != \'\' && report.get(\'expense\').value < 100 && report.get(\'expense\').touched">\n      *mininum value [100]\n    </div>\n    <div class="error" *ngIf="report.get(\'expense\').value >= 100 && report.get(\'expense\').value <= 999999999 && report.get(\'expense\').value % 100 !=0  && report.get(\'expense\').touched">\n      *value should be a multiplication of 100\n    </div>\n\n    <div class="error" *ngIf="report.get(\'expense\').value >999999999  && report.get(\'expense\').touched">\n      *maximum value [999999999]\n    </div>\n\n    <ion-item no-lines>\n      <ion-label stacked>Extra Information ( Optional ):</ion-label>\n      <ion-textarea class="input" type="text" value="" formControlName="extraInfo"></ion-textarea>\n    </ion-item>\n\n    <div padding>\n      <button ion-button block color="primary">Submit</button>\n    </div>\n  </form>\n\n\n</ion-content>'/*ion-inline-end:"/Users/MacBook/QRCode/src/pages/report/report.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
], ReportPage);

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { Network } from '@ionic-native/network';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, http, auth, loadingCtrl, alertCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.email = '';
        this.password = '';
        this.space = false;
        this.submitAttempt = false;
        this.registerCredentials = { email: '', password: '' };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        this.menuCtrl.enable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving this page
        this.menuCtrl.enable(true);
    };
    LoginPage.prototype.ngOnInit = function () {
        this.loginForm = new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* Validators */].email]),
            password: new __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["g" /* Validators */].maxLength(30)])
        });
    };
    LoginPage.prototype.noSpace = function (event) {
        if (event.which === 32) {
            this.space = true;
            return false;
        }
        this.space = false;
        return true;
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.submitAttempt = true;
        localStorage.clear();
        this.registerCredentials.email = this.loginForm.get('email').value;
        this.registerCredentials.password = this.loginForm.get('password').value;
        console.log(this.loginForm.get('email').value);
        var email_format = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (this.registerCredentials.email.toString() == '' || this.registerCredentials.password.toString() == '') {
            this.showLoading();
            this.showError("Please input your credentials!");
        }
        else {
            if (!email_format.test(this.registerCredentials.email)) {
                console.log('True');
                this.showLoading();
                this.showError("Please input valid email address!");
            }
            else {
                this.showLoading();
                this.auth.login(this.registerCredentials).subscribe(function (allowed) {
                    if (allowed) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    }
                    else {
                        if (localStorage.getItem('authentication') == 'denied') {
                            _this.showError("Access Denied");
                            localStorage.clear();
                        }
                        else {
                            _this.loading.dismiss();
                            alert('Connection Error!');
                        }
                    }
                }, function (error) {
                    _this.loading.dismiss();
                    _this.showError(error);
                });
            }
        }
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Incorrect Email or Password!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/MacBook/QRCode/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <!-- <ion-navbar>\n    <ion-title class="title">SBBS</ion-title>\n  </ion-navbar> -->\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <form class="login_form" padding novalidate (ngSubmit)="login(report)" [formGroup]="loginForm">\n    <img class="img-sign-in" src="assets/img/sign_in.png">\n    <h1 class="sign-in">Sign In</h1>\n    <ion-item no-lines class="login_field">\n      <ion-input type="email" value="" formControlName="email" placeholder="Email" (keypress)="noSpace($event)"></ion-input>\n    </ion-item>\n\n    <div class="error" *ngIf="!loginForm.get(\'email\').touched && submitAttempt">\n      *field is required\n    </div>\n    <div class="error" *ngIf="loginForm.get(\'email\').value.toString() ==\'\' && loginForm.get(\'email\').hasError(\'required\') && loginForm.get(\'email\').touched">\n      *field is required\n    </div>\n    <div class="error" *ngIf="loginForm.get(\'email\').value.toString() !=\'\' && space">\n      *space is not allowed\n    </div>\n    <div class="error" *ngIf="loginForm.get(\'email\').value.toString() !=\'\' && loginForm.get(\'email\').hasError(\'email\') && loginForm.get(\'email\').touched">\n      *not valid\n    </div>\n\n    <ion-item no-lines class="login_field">\n      <ion-input type="password" value="" formControlName="password" placeholder="Password"></ion-input>\n    </ion-item>\n\n    <div class="error" *ngIf="!loginForm.get(\'password\').touched && submitAttempt">\n      *field is required\n    </div>\n    <div class="error" *ngIf="loginForm.get(\'password\').hasError(\'required\') && loginForm.get(\'password\').touched">\n      *field is required\n    </div>\n    <div class="error" *ngIf="loginForm.get(\'password\').touched && loginForm.get(\'password\').hasError(\'minlength\')">\n      *password must be at least 8 characters long\n    </div>\n    <div class="error" *ngIf="loginForm.get(\'password\').touched && loginForm.get(\'password\').hasError(\'maxlength\')">\n      *password maximum of 30 characters\n    </div>\n\n    <div style="margin-top: 15px">\n      <button ion-button block color="primary">Login</button>\n    </div>\n  </form>\n\n</ion-content>'/*ion-inline-end:"/Users/MacBook/QRCode/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		403,
		2
	],
	"../pages/report/report.module": [
		402,
		1
	],
	"../pages/scan/scan.module": [
		401,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(344);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_scan_scan__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_report_report__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_barcode_scanner__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_auth_service_auth_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_call_number__ = __webpack_require__(283);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_scan_scan__["a" /* ScanPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_report_report__["a" /* ReportPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/scan/scan.module#ScanPageModule', name: 'ScanPage', segment: 'scan', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/report/report.module#ReportPageModule', name: 'ReportPage', segment: 'report', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_scan_scan__["a" /* ScanPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_report_report__["a" /* ReportPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_call_number__["a" /* CallNumber */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_13__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__["a" /* Network */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 160,
	"./af.js": 160,
	"./ar": 161,
	"./ar-dz": 162,
	"./ar-dz.js": 162,
	"./ar-kw": 163,
	"./ar-kw.js": 163,
	"./ar-ly": 164,
	"./ar-ly.js": 164,
	"./ar-ma": 165,
	"./ar-ma.js": 165,
	"./ar-sa": 166,
	"./ar-sa.js": 166,
	"./ar-tn": 167,
	"./ar-tn.js": 167,
	"./ar.js": 161,
	"./az": 168,
	"./az.js": 168,
	"./be": 169,
	"./be.js": 169,
	"./bg": 170,
	"./bg.js": 170,
	"./bm": 171,
	"./bm.js": 171,
	"./bn": 172,
	"./bn.js": 172,
	"./bo": 173,
	"./bo.js": 173,
	"./br": 174,
	"./br.js": 174,
	"./bs": 175,
	"./bs.js": 175,
	"./ca": 176,
	"./ca.js": 176,
	"./cs": 177,
	"./cs.js": 177,
	"./cv": 178,
	"./cv.js": 178,
	"./cy": 179,
	"./cy.js": 179,
	"./da": 180,
	"./da.js": 180,
	"./de": 181,
	"./de-at": 182,
	"./de-at.js": 182,
	"./de-ch": 183,
	"./de-ch.js": 183,
	"./de.js": 181,
	"./dv": 184,
	"./dv.js": 184,
	"./el": 185,
	"./el.js": 185,
	"./en-au": 186,
	"./en-au.js": 186,
	"./en-ca": 187,
	"./en-ca.js": 187,
	"./en-gb": 188,
	"./en-gb.js": 188,
	"./en-ie": 189,
	"./en-ie.js": 189,
	"./en-il": 190,
	"./en-il.js": 190,
	"./en-nz": 191,
	"./en-nz.js": 191,
	"./eo": 192,
	"./eo.js": 192,
	"./es": 193,
	"./es-do": 194,
	"./es-do.js": 194,
	"./es-us": 195,
	"./es-us.js": 195,
	"./es.js": 193,
	"./et": 196,
	"./et.js": 196,
	"./eu": 197,
	"./eu.js": 197,
	"./fa": 198,
	"./fa.js": 198,
	"./fi": 199,
	"./fi.js": 199,
	"./fo": 200,
	"./fo.js": 200,
	"./fr": 201,
	"./fr-ca": 202,
	"./fr-ca.js": 202,
	"./fr-ch": 203,
	"./fr-ch.js": 203,
	"./fr.js": 201,
	"./fy": 204,
	"./fy.js": 204,
	"./gd": 205,
	"./gd.js": 205,
	"./gl": 206,
	"./gl.js": 206,
	"./gom-latn": 207,
	"./gom-latn.js": 207,
	"./gu": 208,
	"./gu.js": 208,
	"./he": 209,
	"./he.js": 209,
	"./hi": 210,
	"./hi.js": 210,
	"./hr": 211,
	"./hr.js": 211,
	"./hu": 212,
	"./hu.js": 212,
	"./hy-am": 213,
	"./hy-am.js": 213,
	"./id": 214,
	"./id.js": 214,
	"./is": 215,
	"./is.js": 215,
	"./it": 216,
	"./it.js": 216,
	"./ja": 217,
	"./ja.js": 217,
	"./jv": 218,
	"./jv.js": 218,
	"./ka": 219,
	"./ka.js": 219,
	"./kk": 220,
	"./kk.js": 220,
	"./km": 221,
	"./km.js": 221,
	"./kn": 222,
	"./kn.js": 222,
	"./ko": 223,
	"./ko.js": 223,
	"./ky": 224,
	"./ky.js": 224,
	"./lb": 225,
	"./lb.js": 225,
	"./lo": 226,
	"./lo.js": 226,
	"./lt": 227,
	"./lt.js": 227,
	"./lv": 228,
	"./lv.js": 228,
	"./me": 229,
	"./me.js": 229,
	"./mi": 230,
	"./mi.js": 230,
	"./mk": 231,
	"./mk.js": 231,
	"./ml": 232,
	"./ml.js": 232,
	"./mn": 233,
	"./mn.js": 233,
	"./mr": 234,
	"./mr.js": 234,
	"./ms": 235,
	"./ms-my": 236,
	"./ms-my.js": 236,
	"./ms.js": 235,
	"./mt": 237,
	"./mt.js": 237,
	"./my": 238,
	"./my.js": 238,
	"./nb": 239,
	"./nb.js": 239,
	"./ne": 240,
	"./ne.js": 240,
	"./nl": 241,
	"./nl-be": 242,
	"./nl-be.js": 242,
	"./nl.js": 241,
	"./nn": 243,
	"./nn.js": 243,
	"./pa-in": 244,
	"./pa-in.js": 244,
	"./pl": 245,
	"./pl.js": 245,
	"./pt": 246,
	"./pt-br": 247,
	"./pt-br.js": 247,
	"./pt.js": 246,
	"./ro": 248,
	"./ro.js": 248,
	"./ru": 249,
	"./ru.js": 249,
	"./sd": 250,
	"./sd.js": 250,
	"./se": 251,
	"./se.js": 251,
	"./si": 252,
	"./si.js": 252,
	"./sk": 253,
	"./sk.js": 253,
	"./sl": 254,
	"./sl.js": 254,
	"./sq": 255,
	"./sq.js": 255,
	"./sr": 256,
	"./sr-cyrl": 257,
	"./sr-cyrl.js": 257,
	"./sr.js": 256,
	"./ss": 258,
	"./ss.js": 258,
	"./sv": 259,
	"./sv.js": 259,
	"./sw": 260,
	"./sw.js": 260,
	"./ta": 261,
	"./ta.js": 261,
	"./te": 262,
	"./te.js": 262,
	"./tet": 263,
	"./tet.js": 263,
	"./tg": 264,
	"./tg.js": 264,
	"./th": 265,
	"./th.js": 265,
	"./tl-ph": 266,
	"./tl-ph.js": 266,
	"./tlh": 267,
	"./tlh.js": 267,
	"./tr": 268,
	"./tr.js": 268,
	"./tzl": 269,
	"./tzl.js": 269,
	"./tzm": 270,
	"./tzm-latn": 271,
	"./tzm-latn.js": 271,
	"./tzm.js": 270,
	"./ug-cn": 272,
	"./ug-cn.js": 272,
	"./uk": 273,
	"./uk.js": 273,
	"./ur": 274,
	"./ur.js": 274,
	"./uz": 275,
	"./uz-latn": 276,
	"./uz-latn.js": 276,
	"./uz.js": 275,
	"./vi": 277,
	"./vi.js": 277,
	"./x-pseudo": 278,
	"./x-pseudo.js": 278,
	"./yo": 279,
	"./yo.js": 279,
	"./zh-cn": 280,
	"./zh-cn.js": 280,
	"./zh-hk": 281,
	"./zh-hk.js": 281,
	"./zh-tw": 282,
	"./zh-tw.js": 282
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 376;

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_scan_scan__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_service_auth_service__ = __webpack_require__(83);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(ionicApp, http, toastCtrl, platform, statusBar, splashScreen, loadingCtrl, auth) {
        var _this = this;
        this.ionicApp = ionicApp;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.passengerToUpdate = [];
        this.reportToUpdate = [];
        this.reportData = {
            'busPerScheduleID': '',
            'leave': '',
            'arrive': ''
        };
        this.userInfo = { email: '', username: '', password: '', fullname: '', profile: '' };
        localStorage.clear();
        if (localStorage.getItem('authentication') == 'authenticated') {
            this.auth.credential = JSON.parse(localStorage.getItem('credential'));
            this.auth.update().subscribe(function (allowed) {
                if (allowed) {
                    if (_this.auth.data.validity == true) {
                        _this.userInfo.email = _this.auth.data.email;
                        _this.userInfo.username = _this.auth.data.username;
                        _this.userInfo.fullname = _this.auth.data.fullname;
                        _this.userInfo.profile = _this.auth.data.profile;
                        localStorage.setItem('list_schedules', JSON.stringify(_this.auth.data.list_schedules));
                        localStorage.setItem('credential', JSON.stringify(_this.userInfo));
                        _this.auth.credential = JSON.parse(localStorage.getItem('credential'));
                    }
                }
            }, function (error) {
                console.log(error);
            });
            this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        }
        platform.ready().then(function () {
            var lastTimeBackPress = 0;
            var timePeriodToExit = 2000;
            platform.registerBackButtonAction(function () {
                // get current active page
                var view = _this.nav.getActive();
                if (view.component.name == "HomePage") {
                    //Double check to exit app                  
                    if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                        _this.platform.exitApp(); //Exit from app
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'Press back again to exit App?',
                            duration: 3000,
                            position: 'bottom'
                        });
                        toast.present();
                        lastTimeBackPress = new Date().getTime();
                    }
                }
                else if (view.component.name == "LoginPage") {
                    _this.platform.exitApp();
                }
                else {
                    // go to previous page
                    if (localStorage.getItem('cancel_scan') == 'true') {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_scan_scan__["a" /* ScanPage */]);
                        localStorage.removeItem('cancel_scan');
                    }
                    else {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
                    }
                }
            });
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.home = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.syncToLatest = function (action) {
        var _this = this;
        console.log(this.auth.update());
        this.showLoading();
        this.auth.update().subscribe(function (allowed) {
            if (allowed) {
                if (_this.auth.data.update == 'success') {
                    if (action == 'sync') {
                        _this.userInfo.email = _this.auth.data.email;
                        _this.userInfo.username = _this.auth.data.username;
                        _this.userInfo.fullname = _this.auth.data.fullname;
                        _this.userInfo.profile = _this.auth.data.profile;
                        localStorage.setItem('list_schedules', JSON.stringify(_this.auth.data.list_schedules));
                        localStorage.setItem('credential', JSON.stringify(_this.userInfo));
                        _this.auth.credential = JSON.parse(localStorage.getItem('credential'));
                        _this.loading.dismiss();
                        alert("Synced to latest");
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
                    }
                    else if (action == 'logout') {
                        localStorage.clear();
                        _this.loading.dismiss();
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]);
                    }
                }
                else {
                    _this.loading.dismiss();
                    alert("Error Updation!");
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
                }
            }
            else {
                _this.loading.dismiss();
                alert("Error Connection!");
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
            }
        }, function (error) {
            console.log(error);
        });
    };
    MyApp.prototype.checkReport = function () {
        // window.open('http://96.9.67.154:8081/shuttlebus', '_self');
    };
    MyApp.prototype.logOut = function () {
        var _this = this;
        this.auth.logout().subscribe(function (succ) {
            _this.syncToLatest('logout');
        });
    };
    MyApp.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/MacBook/QRCode/src/app/app.html"*/'<ion-menu id="myMenu" [content]="content" >\n  <ion-header>\n    <ion-toolbar text-center>\n      <img class="img-circle" src="assets/img/profile_img.png">\n      <h3>{{auth.credential.username}}</h3>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content [ngStyle]="{\'background\':\'#337ab7\'}">\n    <ion-list>\n      <button ion-item large (click)="home()" menuClose>\n        <ion-icon name="home" class="menuList"></ion-icon> Home\n      </button>\n      <button ion-item (click)="syncToLatest(\'sync\')" menuClose>\n        <ion-icon name="sync" class="menuList"></ion-icon> Sync to Latest\n      </button>\n      <!-- <button ion-item (click)="checkReport()" menuClose>\n        <ion-icon name="document" class="menuList"></ion-icon> Check Reports\n      </button> -->\n      <button ion-item (click)="logOut()" menuClose>\n        <ion-icon name="log-out" class="menuList"></ion-icon> Log Out\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/MacBook/QRCode/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_9__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan_scan__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__report_report__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.scheduleID = '';
        this.disabled = {};
        this.checkDate = {};
        this.colors = ['#DDDDDD', '#A9CCE3', '#D7BDE2', '#E6B0AA', '#D6EAF8'];
        this.getSchedules();
        this.check();
    }
    HomePage.prototype.getSchedules = function () {
        this.scheduleList = JSON.parse(localStorage.getItem('list_schedules'));
        console.log("Date: " + new Date(this.scheduleList['dep_date']).toLocaleDateString());
    };
    HomePage.prototype.checkSchedule = function () {
        var checkSchedule = this.scheduleList;
        if (checkSchedule.length == 0) {
            return true;
        }
        return false;
    };
    HomePage.prototype.compareDate = function (dep_date) {
        return (new Date(dep_date).toLocaleDateString() == new Date().toLocaleDateString());
    };
    HomePage.prototype.scan = function (schedule_id) {
        console.log("Schedule ID: " + schedule_id);
        localStorage.setItem('schedule_id', schedule_id);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scan_scan__["a" /* ScanPage */]);
    };
    HomePage.prototype.report = function (bus_per_schedule_id) {
        localStorage.setItem('bus_per_schedule_id', bus_per_schedule_id);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__report_report__["a" /* ReportPage */]);
    };
    HomePage.prototype.leave = function (bus_per_schedule_id) {
        this.getTime('Leave', bus_per_schedule_id);
    };
    HomePage.prototype.arrive = function (bus_per_schedule_id) {
        this.getTime('Arrive', bus_per_schedule_id);
    };
    HomePage.prototype.getTime = function (action, bus_per_schedule_id) {
        var _this = this;
        this.http.get('http://96.9.67.154:8081/shuttlebus/getTime')
            .map(function (res) { return res.json(); })
            .subscribe(function (ele) {
            if (action == 'Leave') {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Leave Confirmation!',
                    subTitle: 'Click OK to confirm your departure at: ' + ele.time,
                    buttons: [
                        {
                            text: 'Cancel',
                            handler: function (data) {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: 'OK',
                            handler: function (data) {
                                localStorage.setItem(bus_per_schedule_id + 'LeaveButton', 'left');
                                localStorage.setItem(bus_per_schedule_id + 'Leave', ele.time);
                                _this.check();
                                console.log('Saved clicked');
                            }
                        }
                    ]
                });
                alert_1.present();
            }
            if (action == 'Arrive') {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Arrival Confirmation!',
                    subTitle: 'Click OK to certify your arrival at: ' + ele.time,
                    buttons: [
                        {
                            text: 'Cancel',
                            handler: function (data) {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: 'OK',
                            handler: function (data) {
                                localStorage.setItem(bus_per_schedule_id + 'ArriveButton', 'arrived');
                                localStorage.setItem(bus_per_schedule_id + 'Arrive', ele.time);
                                _this.check();
                                console.log('Saved clicked');
                            }
                        }
                    ]
                });
                alert_2.present();
            }
        }, function (err) {
            alert('Connection Error!');
            console.log(err);
        });
    };
    HomePage.prototype.formatDate = function (date) {
        return __WEBPACK_IMPORTED_MODULE_5_moment___default()(date).format("ddd,l");
    };
    HomePage.prototype.check = function () {
        // this.scheduleList.forEach(element => {
        //   if (new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()) {
        //     this.checkDate[element.bus_per_schedule_id + 'CheckDate'] = true;
        //     if (localStorage.getItem(element.bus_per_schedule_id + 'LeaveButton') == null && localStorage.getItem(element.bus_per_schedule_id + 'ArriveButton') == null) {
        //       this.disabled[element.bus_per_schedule_id + 'LeaveButton'] = false;
        //       this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = true;
        //       this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = false;
        //     }
        //     else if (localStorage.getItem(element.bus_per_schedule_id + 'LeaveButton') == 'left') {
        //       this.disabled[element.bus_per_schedule_id + 'LeaveButton'] = true;
        //       this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = false;
        //       this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = false;
        //     }
        //     if (localStorage.getItem(element.bus_per_schedule_id + 'ArriveButton') == 'arrived') {
        //       this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = true;
        //       this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = true;
        //       this.disabled[element.bus_per_schedule_id + 'DisableReportButton'] = false;
        //     }
        //     if (localStorage.getItem(element.bus_per_schedule_id + 'DisableReportButton') == 'reported') {
        //       this.disabled[element.bus_per_schedule_id + 'DisableReportButton'] = true;
        //     }
        //   } else {
        //     this.checkDate[element.bus_per_schedule_id + 'CheckDate'] = false;
        //   }
        // });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/MacBook/QRCode/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="title">\n      Shuttle Bus Schedules\n    </ion-title>\n    <button ion-button large left menuToggle [ngStyle]="{\'background\':\'none\'}">\n      <ion-icon name="menu" class="menuToggle"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="no-data" *ngIf="checkSchedule()">\n    <img class="no-data" src="assets/img/no_data.png">\n    <h1 class="no-data-text">You have NO upcoming schedules!</h1>\n  </div>\n  \n  <ion-list no-lines>\n    <ion-card no-padding *ngFor="let schedule of scheduleList;let i = index" [ngStyle]="{\'margin-bottom\':\'10px\', \'background\' : \'white\'}">\n      <ion-card-header>\n        <h1>{{schedule.des_from}} - {{schedule.des_to}}<p item-end class="today" *ngIf="compareDate(schedule.dep_date)">Today</p></h1>\n        \n        <!-- {{schedule.dep_date}}<p item-end class="today" *ngIf="compareDate(schedule.dep_date)">TODAY</p> -->\n        \n      </ion-card-header>\n      <ion-card-content>\n        <ion-grid no-padding>\n          <ion-row>\n            <ion-col>\n                <ion-row>\n                    <ion-col class="column-left">\n                        <div>Departure Date</div>\n                        <h2> {{formatDate(schedule.dep_date)}} </h2>\n                        \n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                      <ion-col class="column-left">\n                          <div>Departure Time</div>\n                          <h2> {{schedule.dep_time}} </h2>\n                      </ion-col>\n                  </ion-row>\n                  <ion-row >\n                      <ion-col class="column-left">\n                        <div>Remaining Seats</div>\n                      <h2 style="padding-bottom: 2px !important"> {{schedule.remaining_seats}} </h2>\n                      </ion-col>\n                    </ion-row>\n            </ion-col>\n            <ion-col>\n              <ion-row>\n                <ion-col class="column-right" no-padding>\n                  <ion-item class="number">Customer: <h2 item-end>{{schedule.customer}}</h2></ion-item>\n                    \n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col class="column-right" no-padding>\n                    <ion-item class="number">Student: <h2 item-end>{{schedule.student}}</h2></ion-item>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col class="column-right" no-padding>\n                      <ion-item class="number">Staff: <h2 item-end>{{schedule.staff}}</h2></ion-item>\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col class="column-right" no-padding>\n                        <ion-item class="number">Total: <h2 item-end>{{schedule.no_of_booking}}</h2></ion-item>\n                        \n                    </ion-col>\n                  </ion-row>\n\n              \n            </ion-col>\n          </ion-row>\n\n          <!-- <ion-row *ngIf="checkDate[(schedule.bus_per_schedule_id)+\'CheckDate\']">\n            <ion-col class="confirm">\n              <button ion-button outline block class="left" color="dark" [disabled]="disabled[(schedule.bus_per_schedule_id)+\'LeaveButton\']" (click)="leave(schedule.bus_per_schedule_id)">Leave</button>\n            </ion-col>\n            <ion-col class="confirm">\n              <button ion-button outline block class="right" color="dark" [disabled]="disabled[(schedule.bus_per_schedule_id)+\'ArriveButton\']" (click)="arrive(schedule.bus_per_schedule_id)">Arrive</button>\n            </ion-col>\n          </ion-row> -->\n        </ion-grid>\n        \n        <!-- <button ion-button icon-only block round (click)="report(schedule.bus_per_schedule_id)" *ngIf="disabled[(schedule.bus_per_schedule_id)+\'ShowReportButton\']" [disabled]="disabled[(schedule.bus_per_schedule_id)+\'DisableReportButton\']">\n          Fill Out Report\n        </button> -->\n        <button ion-button icon-only block (click)="scan(schedule.id)" style="margin-top: 1px !important">\n          Check Passenger\n        </button>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/MacBook/QRCode/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(283);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ScanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ScanPage = (function () {
    function ScanPage(navCtrl, navParams, barcodeScanner, alertCtrl, toastCtrl, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.callNumber = callNumber;
        this.bpsi = '';
        this.passengerToUpdate = [];
        this.flag = false;
        this.buttonScan = true;
        this.getPassenger();
    }
    ScanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ScanPage');
    };
    ScanPage.prototype.home = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    ScanPage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: "Scan your barcode "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            if (barcodeData.cancelled) {
                localStorage.setItem('cancel_scan', 'true');
                var toast = _this.toastCtrl.create({
                    message: 'No QRCode Found',
                    duration: 3000,
                    position: 'bottom',
                });
                toast.present();
                console.log("BarcodeScanner is cancelled!!!");
            }
            else {
                _this.passengerList.forEach(function (data) {
                    if (data.id == _this.bpsi) {
                        data.passenger_list.forEach(function (element) {
                            if (element.qr_status == true) {
                                _this.flag = true;
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'QRCode has been checked already',
                                    message: 'Username: ' + element.full_name,
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: function () {
                                                console.log('Cancel Button is clicked');
                                            }
                                        },
                                        {
                                            text: 'Scan Next',
                                            handler: function () {
                                                _this.scan();
                                                console.log('Scan Next Button is clicked');
                                            }
                                        }
                                    ]
                                });
                                alert_1.present();
                            }
                            else {
                                if (barcodeData.text == element.qrcode) {
                                    element.qr_status = true;
                                    _this.passengerToUpdate.push(element.id);
                                    _this.flag = true;
                                    var alert_2 = _this.alertCtrl.create({
                                        title: 'Valid User',
                                        subTitle: 'QRCode has been confirmed',
                                        message: 'Username: ' + element.full_name,
                                        buttons: [
                                            {
                                                text: 'Cancel',
                                                role: 'cancel',
                                                handler: function () {
                                                    console.log('Cancel Button is clicked');
                                                }
                                            },
                                            {
                                                text: 'Scan Next',
                                                handler: function () {
                                                    _this.scan();
                                                    console.log('Scan Next Button is clicked');
                                                }
                                            }
                                        ]
                                    });
                                    alert_2.present();
                                }
                            }
                        });
                        if (!_this.flag) {
                            var alert_3 = _this.alertCtrl.create({
                                title: 'Invalid User',
                                message: 'The particular QRCode information is incorrect! ',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
                                        }
                                    },
                                    {
                                        text: 'Scan Again',
                                        handler: function () {
                                            _this.scan();
                                            console.log('Scan Again Button is clicked');
                                        }
                                    }
                                ]
                            });
                            alert_3.present();
                        }
                    }
                });
            }
            _this.flag = false;
            console.log("Passengers to update: " + _this.passengerToUpdate);
            localStorage.setItem('list_schedules', JSON.stringify(_this.passengerList));
        }, function (err) {
            console.log(err);
        });
    };
    ScanPage.prototype.getPassenger = function () {
        var _this = this;
        this.bpsi = localStorage.getItem('schedule_id');
        this.passengerList = JSON.parse(localStorage.getItem('list_schedules'));
        this.passengerList.forEach(function (element) {
            if (element['id'] == _this.bpsi) {
                _this.passenger = element.passenger_list;
                console.log("Current Date: " + new Date().toLocaleDateString());
                console.log("Date of travel: " + new Date(element['dep_date']).toLocaleDateString());
                if (new Date(element['dep_date']).toLocaleDateString() == new Date().toLocaleDateString()) {
                    _this.buttonScan = false;
                    console.log("Button Scan: " + _this.buttonScan);
                }
            }
        });
    };
    ScanPage.prototype.showInfo = function (phone_num, username) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Contact : ' + username,
            message: 'Phone Number: ' + phone_num,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Call',
                    handler: function () {
                        console.log('Call clicked');
                        if (phone_num == null) {
                            var alert_4 = _this.alertCtrl.create({
                                title: 'Cannot Call',
                                subTitle: 'No phone number info',
                                buttons: ['Dismiss']
                            });
                            alert_4.present();
                        }
                        else {
                            _this.callNumber.callNumber(phone_num, true)
                                .then(function (res) { return console.log('Launched dialer!', res); })
                                .catch(function (err) { return console.log('Error launching dialer', err); });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    return ScanPage;
}());
ScanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-scan',template:/*ion-inline-start:"/Users/MacBook/QRCode/src/pages/scan/scan.html"*/'<!--\n  Generated template for the ScanPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="home()">\n        <ion-icon name="arrow-round-back"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="title">Scan QRCode</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div padding>\n    <button ion-button large color="primary" block [disabled]="buttonSca" (click)="scan()"  >\n      <ion-icon name="qr-scanner"> Scan QRCode</ion-icon>\n    </button>\n  </div>\n\n  <ion-list>\n    <h2>List of Passengers</h2>\n    <ion-grid >\n      <ion-row>\n        <ion-col col-6 class="col-header">\n          Name\n        </ion-col>\n        <ion-col class="col-header">\n          Seats\n        </ion-col>\n        <ion-col col-2 class="col-header">\n          Status\n        </ion-col>\n        <ion-col col-2 class="col-header">\n          Info\n        </ion-col>\n      </ion-row>\n      <ion-row *ngFor="let passenger of passenger; let i = index">\n        <ion-col col-6 class="col-content-name">\n          {{i+1}}. {{passenger.user_name}}\n        </ion-col>\n        <ion-col class="col-content">\n          {{passenger.no_of_booking}}\n        </ion-col>\n        \n        <ion-col col-2 class="col-content">\n          <ion-icon item-end [ngStyle]="{\'color\':\'green\'}" name="checkmark-circle" *ngIf="(passenger.qr_status)==true"></ion-icon>\n          <ion-icon item-end [ngStyle]="{\'color\':\'red\'}" name="close-circle" *ngIf="(passenger.qr_status)==false"></ion-icon>\n        </ion-col>\n        <ion-col col-2 class="col-content">\n          <ion-icon name="information-circle" (click)="showInfo(passenger.phone, passenger.user_name)"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <!-- <ion-item *ngFor="let passenger of passenger; let i = index">\n      {{i+1}}. {{passenger.full_name}} {{passenger.no_of_booking}}\n      <ion-icon item-end [ngStyle]="{\'color\':\'green\'}" name="checkmark-circle" *ngIf="(passenger.qr_status)==false"></ion-icon>\n    </ion-item> -->\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/MacBook/QRCode/src/pages/scan/scan.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */]])
], ScanPage);

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        this.credential = { email: '', username: '', password: '', fullname: '', profile: '' };
        this.passengerToUpdate = [];
        this.reportToUpdate = [];
        this.reportData = {
            'busPerScheduleID': '',
            'leave': '',
            'arrive': ''
        };
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email == null || credentials.password == null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                _this.http.get('http://shuttlebus.vkirirom.com/checkValidity?email=' + credentials.email + '&&password=' + credentials.password).map(function (res) { return res.json(); }).subscribe(function (data) {
                    console.log(data);
                    if (data.validity == true) {
                        data.list_schedules.forEach(function (element) {
                            if (element.report_arrival != 'false') {
                                localStorage.setItem(element.bus_per_schedule_id + 'ArriveButton', 'arrived');
                                localStorage.setItem(element.bus_per_schedule_id + 'Arrive', element.report_arrival);
                            }
                            if (element.report_departure != 'false') {
                                localStorage.setItem(element.bus_per_schedule_id + 'LeaveButton', 'left');
                                localStorage.setItem(element.bus_per_schedule_id + 'Leave', element.report_departure);
                            }
                            if (element.report_status == 'true') {
                                localStorage.setItem(element.bus_per_schedule_id + 'DisableReportButton', 'reported');
                            }
                        });
                        _this.credential.email = credentials.email;
                        _this.credential.username = credentials.username;
                        _this.credential.fullname = data.fullname;
                        _this.credential.profile = data.profile;
                        localStorage.setItem('list_schedules', JSON.stringify(data.list_schedules));
                        localStorage.setItem('authentication', 'authenticated');
                        localStorage.setItem('credential', JSON.stringify(_this.credential));
                        console.log(credentials);
                        observer.next(true);
                        observer.complete();
                    }
                    else if (data.validity == false) {
                        localStorage.setItem('authentication', 'denied');
                        observer.next(false);
                        observer.complete();
                    }
                }, function (err) {
                    console.log(err);
                    observer.next(false);
                    observer.complete();
                });
            });
        }
    };
    AuthServiceProvider.prototype.logout = function () {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            observer.next(true);
            observer.complete();
        });
    };
    AuthServiceProvider.prototype.update = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.scheduleList = JSON.parse(localStorage.getItem('list_schedules'));
            _this.scheduleList.forEach(function (element) {
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
                element.passenger_list.forEach(function (element) {
                    if (element.qr_status == true) {
                        _this.passengerToUpdate.push(element.id);
                    }
                });
            });
            console.log("Passenger: " + _this.passengerToUpdate);
            var credential = JSON.parse(localStorage.getItem('credential'));
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('data', JSON.stringify(_this.passengerToUpdate));
            // headers.append('report', JSON.stringify(this.reportToUpdate));
            _this.http.get('http://shuttlebus.vkirirom.com/updatePassenger?email=' + credential.email, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log(data.update);
                _this.data = data;
                _this.passengerToUpdate = [];
                // this.reportToUpdate = [];
                observer.next(true);
                observer.complete();
            }, function (err) {
                _this.passengerToUpdate = [];
                // this.reportToUpdate = [];
                console.log(err);
                observer.next(false);
                observer.complete();
            });
        });
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AuthServiceProvider);

//# sourceMappingURL=auth-service.js.map

/***/ })

},[326]);
//# sourceMappingURL=main.js.map