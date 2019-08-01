/**
 * This file contains common routines across all the pages.
 */
(function () {

    //Use JQM params plugin in order to pass data between pages.
    //$(document).bind("pagebeforechange", function (event, data) {
    //    $.mobile.pageData = (data && data.options && data.options.pageData) ? data.options.pageData : null;
    //});

    ////Register the back button when the home page loads
    //$(document).on("pageinit", "#listPage", function (e) {
    //    //Handle back button
    //    document.addEventListener("deviceready", function () {
    //        document.addEventListener("backbutton", function (e) {
    //            e.preventDefault();

    //            navigator.app.backHistory();

    //        }, false);
    //    }, false);

    //});

    $(document).bind("mobileinit", function () {
        // Make your jQuery Mobile framework configuration changes here!
        console.log("configuring jqm...");
        // required for "phoning home" (load external assets, etc.)
        jQuery.support.cors = true;
        jQuery.mobile.allowCrossDomainPages = true;
        jQuery.mobile.phonegapNavigationEnabled = true;
        jQuery.mobile.defaultDialogTransition = "pop";
        jQuery.mobile.defaultPageTransition = "none";
        //jQuery.mobile.loader.prototype.options.text = "loading";
        //jQuery.mobile.loader.prototype.options.textVisible = false;
        //jQuery.mobile.loader.prototype.options.theme = "a";
    });

    function LoadAdMobPlugin(bshow) {
        //Admob.ADSIZE_BANNER // standard banner - 320x50
        //Admob.ADSIZE_IAB_MRECT// medium rect - 300x250
        //Admob.ADSIZE_IAB_BANNER// full size banner - 468x60
        //Admob.ADSIZE_IAB_LEADERBOARD // leaderboard - 728x90
        //Admob.ADSIZE_SMART_BANNER // smart size - fit the ad view automatically
        //alert(navigator.userAgent.toString());
        var admob_ios_key = 'ca-app-pub-5767938168100966/8084518722';
        var admob_android_key = 'ca-app-pub-5767938168100966/8084518722';
        //var admob_ios_key = 'ca-app-pub-9333321318675476/8595866609';
        //var admob_android_key = 'ca-app-pub-9333321318675476/8595866609';

        var adId = (navigator.userAgent.indexOf('Android') >= 0) ? admob_android_key : admob_ios_key;
        if (window.plugins && window.plugins.AdMob) {
            var am = window.plugins.AdMob;
            am.destroyBannerView();
            am.createBannerView(
		    	    {
		    	        'publisherId': adId,
		    	        'adSize': am.AD_SIZE.SMART_BANNER,
		    	        'bannerAtTop': false
		    	    }, function () {
		    	        am.requestAd({ 'isTesting': true }, function () {
		    	            am.showAd(bshow);
		    	        }, function () {
		    	            alert('failed to request ad');
		    	        })
		    	    }, function () {
		    	        alert("failed to create ad view");
		    	    });
        } else {
            alert('AdMob plugin not available/ready.');
        }
        showAd(false);
    }

    function showAd(bshow) {
        if (window.plugins && window.plugins.AdMob) {
            var am = window.plugins.AdMob;
            am.showAd(bshow);
        } else {
            //alert('AdMob plugin not available/ready.');
        }
    }

})();