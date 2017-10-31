webpackJsonp([2],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(46);
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
    function ScanPage(navCtrl, navParams, barcodeScanner, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.bpsi = '';
        this.passengerToUpdate = [];
        this.flag = false;
        this.buttonScan = false;
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
                var toast = _this.toastCtrl.create({
                    message: 'No QRCode Found',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                _this.passengerList.forEach(function (data) {
                    if (data.bus_per_schedule_id == _this.bpsi) {
                        data.passenger.forEach(function (element) {
                            if (barcodeData.text == element.qrcode) {
                                element.status = 'false';
                                _this.passengerToUpdate.push(element.user_id);
                                _this.flag = true;
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'Valid User',
                                    subTitle: 'QRCode has been confirmed',
                                    message: 'Username: ' + element.full_name,
                                    buttons: [
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            handler: function () {
                                                console.log('Cancel clicked');
                                            }
                                        },
                                        {
                                            text: 'Scan Next',
                                            handler: function () {
                                                _this.scan();
                                                console.log('Buy clicked');
                                            }
                                        }
                                    ]
                                });
                                alert_1.present();
                            }
                        });
                        if (!_this.flag) {
                            var alert_2 = _this.alertCtrl.create({
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
                            alert_2.present();
                        }
                    }
                });
            }
            _this.flag = false;
            console.log("Passengers to update: " + _this.passengerToUpdate);
            localStorage.removeItem('getAPI');
            localStorage.setItem('getAPI', JSON.stringify(_this.passengerList));
        }, function (err) {
            console.log(err);
        });
    };
    ScanPage.prototype.getPassenger = function () {
        var _this = this;
        this.bpsi = localStorage.getItem('bus_per_schedule_id');
        this.passengerList = JSON.parse(localStorage.getItem('getAPI'));
        this.passengerList.forEach(function (element) {
            if (element['bus_per_schedule_id'] == _this.bpsi) {
                _this.passenger = element.passenger;
                console.log("Current Date: " + new Date().toLocaleDateString());
                console.log("Date of travel: " + new Date(element['date_of_travel']).toLocaleDateString());
                if (new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()) {
                    if (localStorage.getItem(element['bus_per_schedule_id'] + 'ArriveButton')) {
                        _this.buttonScan = false;
                    }
                    else {
                        _this.buttonScan = true;
                    }
                }
            }
        });
    };
    return ScanPage;
}());
ScanPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-scan',template:/*ion-inline-start:"/Users/MacBook/QRcode/src/pages/scan/scan.html"*/'<!--\n  Generated template for the ScanPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-buttons left>\n      <button ion-button icon-only (click)="home()">\n        <ion-icon name="arrow-round-back"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title class="title">Scan QRCode</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div padding>\n    <button ion-button large color="primary" block (click)="scan()" *ngIf="buttonScan" >\n      <ion-icon name="qr-scanner"> Scan QRCode</ion-icon>\n    </button>\n  </div>\n\n  <ion-list>\n    <h2>List of Passengers</h2>\n    <ion-item *ngFor="let passenger of passenger; let i = index">\n      {{i+1}}. {{passenger.full_name}}\n      <ion-icon item-end [ngStyle]="{\'color\':\'green\'}" name="checkmark-circle" *ngIf="(passenger.status)==\'true\'"></ion-icon>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/MacBook/QRcode/src/pages/scan/scan.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
], ScanPage);

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(81);
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
        this.username = '';
        this.password = '';
        this.registerCredentials = { username: '', password: '' };
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        this.menuCtrl.enable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving this page
        this.menuCtrl.enable(true);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoading();
        this.auth.login(this.registerCredentials).subscribe(function (allowed) {
            if (allowed) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }
            else {
                _this.showError("Access Denied");
            }
        }, function (error) {
            _this.showError(error);
        });
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
            title: 'Fail',
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
        selector: 'page-login',template:/*ion-inline-start:"/Users/MacBook/QRcode/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title class="title">Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label floating>Username</ion-label>\n    <ion-input type="text" [(ngModel)]="registerCredentials.username"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Password</ion-label>\n    <ion-input type="password" [(ngModel)]="registerCredentials.password"></ion-input>\n  </ion-item>\n\n  <div padding>\n    <button ion-button color="primary" block (click)="login()">Log In</button>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/MacBook/QRcode/src/pages/login/login.html"*/,
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

/***/ 112:
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
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		272,
		1
	],
	"../pages/scan/scan.module": [
		271,
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
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(218);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_scan_scan__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_auth_service_auth_service__ = __webpack_require__(81);
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
            __WEBPACK_IMPORTED_MODULE_8__pages_scan_scan__["a" /* ScanPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/scan/scan.module#ScanPageModule', name: 'ScanPage', segment: 'scan', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_scan_scan__["a" /* ScanPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_12__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_service_auth_service__ = __webpack_require__(81);
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
        this.clear = true;
        if (localStorage.getItem('authentication') == 'authenticated') {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
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
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
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
        this.showLoading();
        this.scheduleList = JSON.parse(localStorage.getItem('getAPI'));
        this.scheduleList.forEach(function (element) {
            element.passenger.forEach(function (element) {
                if (element.status == 'false') {
                    _this.passengerToUpdate.push(element.id);
                }
            });
        });
        console.log("Passenger: " + this.passengerToUpdate);
        var credential = JSON.parse(localStorage.getItem('credential'));
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]();
        headers.append('data', JSON.stringify(this.passengerToUpdate));
        this.http.get('http://10.10.16.135:8080/shuttle-bus/updatePassenger?username=' + credential.username + '&&password=' + credential.password, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data.update);
            if (data.update == 'success') {
                if (action == 'sync') {
                    localStorage.setItem('getAPI', JSON.stringify(data.data));
                    _this.loading.dismiss();
                    alert("Synced to latest");
                }
                else if (action == 'logout') {
                    data.data.forEach(function (element) {
                        if (new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()) {
                            console.log("Date of Travel: " + element['date_of_travel']);
                            _this.clear = false;
                        }
                    });
                    console.log("Clear: " + _this.clear);
                    if (_this.clear) {
                        localStorage.clear();
                    }
                    _this.loading.dismiss();
                }
            }
            else {
                _this.loading.dismiss();
                alert("Error!");
            }
        }, function (err) {
            _this.loading.dismiss();
            alert("Error Connection!");
            console.log(err);
        });
        this.passengerToUpdate = [];
    };
    MyApp.prototype.checkReport = function () {
        window.open('http://google.com', '_self');
    };
    MyApp.prototype.logOut = function () {
        var _this = this;
        this.auth.logout().subscribe(function (succ) {
            _this.syncToLatest('logout');
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/MacBook/QRcode/src/app/app.html"*/'<ion-menu id="myMenu" [content]="content">\n  <ion-header>\n    <ion-toolbar text-center>\n      <img width="150" height="150" src="../assets/img/profile_img.png">\n      <h3>Username</h3>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content [ngStyle]="{\'background\':\'#337ab7\'}">\n    <ion-list>\n      <button ion-item large (click)="home()" menuClose>\n        <ion-icon name="home" class="menuList"></ion-icon> Home\n      </button>\n      <button ion-item (click)="syncToLatest(\'sync\')" menuClose>\n        <ion-icon name="sync" class="menuList"></ion-icon> Sync to Latest\n      </button>\n      <button ion-item (click)="checkReport()" menuClose>\n        <ion-icon name="document" class="menuList"></ion-icon> Check Reports\n      </button>\n      <button ion-item (click)="logOut()" menuClose>\n        <ion-icon name="log-out" class="menuList"></ion-icon> Logout\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/MacBook/QRcode/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_8__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan_scan__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(39);
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
    function HomePage(navCtrl, alertCtrl, loadingCtrl, toastCtrl, http) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.scheduleID = '';
        this.disabled = {};
        this.checkDate = {};
        this.buttonReport = true;
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
        this.colors = ['#DDDDDD', '#A9CCE3', '#D7BDE2', '#E6B0AA', '#D6EAF8'];
        this.random = [];
        this.randomColor();
        this.getSchedules();
        this.check();
    }
    HomePage.prototype.getSchedules = function () {
        this.scheduleList = JSON.parse(localStorage.getItem('getAPI'));
    };
    HomePage.prototype.scan = function (bus_per_schedule_id) {
        console.log("Bus Per Schedule ID: " + bus_per_schedule_id);
        localStorage.setItem('bus_per_schedule_id', bus_per_schedule_id);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__scan_scan__["a" /* ScanPage */]);
    };
    HomePage.prototype.leave = function (bus_per_schedule_id) {
        var _this = this;
        var timeLeave = new Date().toLocaleTimeString();
        console.log(timeLeave.split(':'));
        var test = timeLeave.split(':');
        var timeFormat = test[0] + '-' + test[1] + '-' + test[2];
        console.log(timeFormat);
        var alert = this.alertCtrl.create({
            title: 'Leave Confirmation!',
            subTitle: 'Click OK to claim your departure at: ' + timeLeave,
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
                        localStorage.setItem(bus_per_schedule_id + 'Leave', timeFormat);
                        _this.check();
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.arrive = function (bus_per_schedule_id) {
        var _this = this;
        var timeArrive = new Date().toLocaleTimeString();
        var test = timeArrive.split(':');
        var timeFormat = test[0] + '-' + test[1] + '-' + test[2];
        console.log(timeFormat);
        var alert = this.alertCtrl.create({
            title: 'Arrival Confirmation!',
            subTitle: 'Click OK to certify your arrival at: ' + timeArrive,
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
                        localStorage.setItem(bus_per_schedule_id + 'Arrive', timeFormat);
                        _this.check();
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.check = function () {
        var _this = this;
        this.scheduleList.forEach(function (element) {
            if (new Date(element['date_of_travel']).toLocaleDateString() == new Date().toLocaleDateString()) {
                _this.checkDate[element.bus_per_schedule_id + 'CheckDate'] = true;
                if (localStorage.getItem(element.bus_per_schedule_id + 'LeaveButton') == null && localStorage.getItem(element.bus_per_schedule_id + 'ArriveButton') == null) {
                    _this.disabled[element.bus_per_schedule_id + 'LeaveButton'] = false;
                    _this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = true;
                    _this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = false;
                }
                else if (localStorage.getItem(element.bus_per_schedule_id + 'LeaveButton') == 'left') {
                    _this.disabled[element.bus_per_schedule_id + 'LeaveButton'] = true;
                    _this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = false;
                    _this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = false;
                }
                if (localStorage.getItem(element.bus_per_schedule_id + 'ArriveButton') == 'arrived') {
                    _this.disabled[element.bus_per_schedule_id + 'ArriveButton'] = true;
                    _this.disabled[element.bus_per_schedule_id + 'ShowReportButton'] = true;
                    _this.disabled[element.bus_per_schedule_id + 'DisableReportButton'] = false;
                }
                if (localStorage.getItem(element.bus_per_schedule_id + 'DisableReportButton') == 'reported') {
                    _this.disabled[element.bus_per_schedule_id + 'DisableReportButton'] = true;
                }
            }
            else {
                _this.checkDate[element.bus_per_schedule_id + 'CheckDate'] = false;
            }
        });
    };
    HomePage.prototype.report = function (bus_per_schedule_id) {
        var _this = this;
        var leave = new Date(localStorage.getItem(bus_per_schedule_id + 'Leave'));
        var arrive = new Date(localStorage.getItem(bus_per_schedule_id + 'Arrive'));
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: function (data) {
                        _this.reportData.busPerScheduleID = bus_per_schedule_id;
                        _this.reportData.leave = localStorage.getItem(bus_per_schedule_id + 'Leave');
                        _this.reportData.arrive = localStorage.getItem(bus_per_schedule_id + 'Arrive');
                        _this.reportData.distance = data.distance;
                        _this.reportData.time = data.time;
                        _this.reportData.fuel = data.fuel;
                        _this.reportData.expense = data.expense;
                        _this.reportData.extraInfo = data.extraInfo;
                        _this.confirmSubmit(_this.reportData);
                        console.log('Saved clicked ' + data.distance + _this.reportData);
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.confirmSubmit = function (reportData) {
        var _this = this;
        this.showLoading();
        var credential = JSON.parse(localStorage.getItem('credential'));
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]();
        headers.append('data', JSON.stringify(reportData));
        this.http.get('http://10.10.16.135:8080/shuttle-bus/updateDriverReport?username=' + credential.username + '&&password=' + credential.password, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.update == 'success') {
                localStorage.setItem(reportData.busPerScheduleID + 'DisableReportButton', 'reported');
                _this.check();
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
    HomePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    HomePage.prototype.randomColor = function () {
        for (var i = 0; this.random.length < this.colors.length; i++) {
            var index = Math.floor(Math.random() * this.colors.length);
            if (this.random.indexOf(this.colors[index]) === -1) {
                this.random.push(this.colors[index]);
            }
        }
        console.log("Random Colors: " + this.random);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/MacBook/QRcode/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="title">\n      Shuttle Bus Schedule\n    </ion-title>\n    <button ion-button large left menuToggle [ngStyle]="{\'background\':\'none\'}">\n      <ion-icon name="menu" class="menuToggle"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-card ion-item *ngFor="let schedule of scheduleList;let i = index" [ngStyle]="{\'margin-bottom\':\'10px\', \'background\' : random[i]}">\n      <ion-card-header>\n        <h1>{{schedule.destination}}</h1>\n        <p>{{schedule.date_of_travel}}</p>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-grid>\n          <ion-row>\n            <ion-col>\n              <div>Departure Time</div>\n              <h2> {{schedule.departure}} </h2>\n            </ion-col>\n            <ion-col>\n              <div>Arrival Time</div>\n              <h2> {{schedule.arrival}} </h2>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <p class="total">Total Passengers: {{schedule.customer+schedule.student+schedule.staff}}</p>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <p>Customer</p>\n              <h2> {{schedule.customer}} </h2>\n            </ion-col>\n            <ion-col>\n              <p>Student</p>\n              <h2> {{schedule.student}} </h2>\n            </ion-col>\n            <ion-col>\n              <p>Staff</p>\n              <h2> {{schedule.staff}} </h2>\n            </ion-col>\n          </ion-row>\n\n          <ion-row *ngIf="checkDate[(schedule.bus_per_schedule_id)+\'CheckDate\']">\n            <ion-col class="confirm">\n              <button ion-button outline block class="left" color="dark" [disabled]="disabled[(schedule.bus_per_schedule_id)+\'LeaveButton\']" (click)="leave(schedule.bus_per_schedule_id)">Leave</button>\n            </ion-col>\n            <ion-col class="confirm">\n              <button ion-button outline block class="right" color="dark" [disabled]="disabled[(schedule.bus_per_schedule_id)+\'ArriveButton\']" (click)="arrive(schedule.bus_per_schedule_id)">Arrive</button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n\n        <button ion-button icon-only block round (click)="report(schedule.bus_per_schedule_id)" *ngIf="disabled[(schedule.bus_per_schedule_id)+\'ShowReportButton\']" [disabled]="disabled[(schedule.bus_per_schedule_id)+\'DisableReportButton\']">\n          Fill Out Report\n          <ion-icon name="clipboard"></ion-icon>\n        </button>\n        <button ion-button icon-only block round (click)="scan(schedule.bus_per_schedule_id)">\n          Check Passenger\n          <ion-icon name="people"></ion-icon>\n        </button>\n      </ion-card-content>\n    </ion-card>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/MacBook/QRcode/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(157);
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
var User = (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    return User;
}());

var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.username == null || credentials.password == null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                _this.http.get('http://10.10.16.135:8080/shuttle-bus/schedule_api?username=' + credentials.username + '&&password=' + credentials.password).map(function (res) { return res.json(); }).subscribe(function (data) {
                    if (data.validity === 'valid') {
                        _this.currentUser = new User(credentials.username, credentials.password);
                        localStorage.setItem('getAPI', JSON.stringify(data.data));
                        localStorage.setItem('authentication', 'authenticated');
                        localStorage.setItem('credential', JSON.stringify(credentials));
                        console.log(credentials);
                        observer.next(true);
                        observer.complete();
                    }
                    else {
                        observer.next(false);
                        observer.complete();
                    }
                });
            });
        }
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
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

},[199]);
//# sourceMappingURL=main.js.map