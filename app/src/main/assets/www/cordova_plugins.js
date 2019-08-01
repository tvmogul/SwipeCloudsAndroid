cordova.define('cordova/plugin_list', function (require, exports, module) {
    module.exports = [
        {
            "file": "plugins/cordova-plugin-barcodescanner/www/barcodescanner.js",
            "id": "cordova-plugin-barcodescanner.BarcodeScanner",
            "clobbers": [
                "cordova.plugins.barcodeScanner"
            ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
        "cordova-plugin-barcodescanner": "0.7.0"
    }
    // BOTTOM OF METADATA
});

//cordova.define('cordova/plugin_list', function (require, exports, module) {
//    module.exports = [
//    {
//        "file": "plugins/com.brodysoft.sqlitePlugin/www/SQLitePlugin.js",
//        "id": "com.brodysoft.sqlitePlugin.SQLitePlugin",
//        "clobbers": [
//            "SQLitePlugin"
//        ]
//    },
//    {
//        "file": "plugins/com.adobe.plugins.GAPlugin/www/GAPlugin.js",
//        "id": "com.adobe.plugins.GAPlugin.GAPlugin",
//        "clobbers": [
//            "GAPlugin"
//        ]
//    },
//    {
//        "file": "plugins/com.surfernetwork.fileplugin/www/FilePlugin.js",
//        "id": "com.surfernetwork.fileplugin.FilePlugin",
//        "clobbers": [
//            "window.FilePlugin"
//        ]
//    }
//];
//    module.exports.metadata =
//    // TOP OF METADATA
//{
//"com.google.playservices": "19.0.0",
//"com.brodysoft.sqlitePlugin": "1.0.0",
//"com.adobe.plugins.GAPlugin": "2.3.1",
//"com.surfernetwork.fileplugin": "1.0.2"
//}
//    // BOTTOM OF METADATA
//});