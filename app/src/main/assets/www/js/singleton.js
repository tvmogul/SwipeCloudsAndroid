var Singleton = new function Singleton() {
    var instance = this;

    Singleton.getInstance = function () {
        return instance;
    }
    
    this.toString = function () {
        return "[object Singleton]";
    }

    this.instanceMethod = function () {
        alert("instance method called!");
    }

    Singleton.staticMethod = function () {
        //alert("static method called!");
    }

    return Singleton;
}

var Singleton = (function () {
    var instance = null;
    var SingletonClass = function () {
        this.texto = "texto";
        //alert("aaa");
    };

    return new function () {
        this.getInstance = function () {
            if (instance == null)
                instance = new SingletonClass();
            return instance;
        };
    };
})();
//var t = Singleton.getInstance();
//console.log(“t: ” + t.texto);
//t.texto = “Testando”;
//var x = Singleton.getInstance();
//console.log(“x: ” + x.texto);

//Singleton.getInstance().LoadAdMobPlugin();
//LoadAdMobPlugin: function () {
//var admob_ios_key = 'ca-app-pub-5767938168100966/8084518722';
//var admob_android_key = 'ca-app-pub-5767938168100966/8084518722';
////var admob_ios_key = 'ca-app-pub-9333321318675476/8595866609';
////var admob_android_key = 'ca-app-pub-9333321318675476/8595866609';
////var adId = (navigator.userAgent.indexOf('Android') >= 0) ? admob_android_key : admob_ios_key;   
//if (window.plugins && window.plugins.AdMob) {
//    var am = window.plugins.AdMob;
//    //am.destroyBannerView();
//    am.createBannerView(
//    {
//        'publisherId': admob_android_key,
//        'adSize': am.AD_SIZE.SMART_BANNER,
//        'bannerAtTop': true
//    }, function () {
//        am.requestAd({ 'isTesting': true }, function () {
//            am.showAd(true);
//        }, function () {
//            //alert('failed to request ad');
//        })
//    }, function () {
//        //alert("failed to create ad view");
//    });
//} else {
//    //alert('AdMob plugin not available/ready.');
//}

//function addLoadEvent(func) {
//    var oldonload = window.onload;
//    if (typeof window.onload != 'function') {
//        window.onload = func;
//    } else {
//        window.onload = function () {
//            oldonload();
//            func();
//        }
//    }
//}

//addLoadEvent(nameOfSomeFunctionToRunOnPageLoad);
//addLoadEvent(function () {
//    /* more code to run on page load */
//});