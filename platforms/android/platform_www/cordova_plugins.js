cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-appversion.RareloopAppVersion",
    "file": "plugins/cordova-plugin-appversion/www/app-version.js",
    "pluginId": "cordova-plugin-appversion",
    "clobbers": [
      "AppVersion"
    ]
  },
  {
    "id": "cordova-plugin-app-update.AppUpdate",
    "file": "plugins/cordova-plugin-app-update/www/AppUpdate.js",
    "pluginId": "cordova-plugin-app-update",
    "clobbers": [
      "AppUpdate"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "cordova-sqlite-storage.SQLitePlugin",
    "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
    "pluginId": "cordova-sqlite-storage",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "id": "ionic-plugin-keyboard.keyboard",
    "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
    "pluginId": "ionic-plugin-keyboard",
    "clobbers": [
      "cordova.plugins.Keyboard"
    ],
    "runs": true
  },
  {
    "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
    "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
    "pluginId": "phonegap-plugin-barcodescanner",
    "clobbers": [
      "cordova.plugins.barcodeScanner"
    ]
  },
  {
    "id": "mx.ferreyra.callnumber.CallNumber",
    "file": "plugins/mx.ferreyra.callnumber/www/CallNumber.js",
    "pluginId": "mx.ferreyra.callnumber",
    "clobbers": [
      "call"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-appversion": "1.0.0",
  "cordova-plugin-app-update": "1.6.0",
  "cordova-plugin-console": "1.0.5",
  "cordova-plugin-device": "1.1.4",
  "cordova-plugin-network-information": "1.3.3",
  "cordova-plugin-splashscreen": "4.0.3",
  "cordova-plugin-statusbar": "2.2.2",
  "cordova-plugin-swift-support": "3.1.1",
  "cordova-plugin-whitelist": "1.3.1",
  "cordova-sqlite-storage": "2.3.0",
  "ionic-plugin-keyboard": "2.2.1",
  "phonegap-plugin-barcodescanner": "6.0.8",
  "mx.ferreyra.callnumber": "0.0.2"
};
// BOTTOM OF METADATA
});