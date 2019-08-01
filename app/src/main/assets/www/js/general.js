//$("div:tagcontent(url='index.html')").live('pageshow', function (e) {
//   
//});


$(document).delegate('footer a', 'click touchend', function () {
    //$(document).delegate('.ui-footer a', 'click', function () {
    try {
        $('#panel_controls').panel("close");
    }
    catch (e) { }

    var _link = $(this).attr("href");
    var link = _link.replace("#", "");
    //alert(link);
    if (link === "back") {
        history.back();
    }
    else if (link == "go_scan") {
        window.location = "./qrurl.html#mainPage";
    }
    else if (link == "go_history") {
        window.location = "./qrurl.html#listPage";
    }
    else if (link == "go_create") {
        window.location = "./qrurl.html#addEditPage";
    }
    else if (link === "closead") {
        window.location = "./index.html";
    }
    else if (link.match(/^dtv_/)) {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "sol_") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "dtv_web") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "dtv_tubes") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if ((link === "ww_feeds") || (link == "dtv_feeds")) {
        window.location = "./rssmobi.html";
    }
    else if (link === "rssmobi") {
        window.location = "./rssmobi.html";
    }
    else if (link === "shop") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_sergioapps") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_wildworkout") {
        window.open("http://www.wild-workout.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_dronestv") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_solutions") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_malibudiet") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_redcarpet") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if ((link === "listcloud") || (link === "dtv_cool") || (link === "cool")) {
        try {
            $('#listcloud .ui-btn-text').text('Cloud');
        }
        catch (e) { }
        window.location = "./general.html";
    }
    else if (link === "statiobreaktv") {
        window.open("http://www.stationbreaktv.com/mobile/index.html", "_blank");
    }
    else if (link === "youtube") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "unlock") {
        window.location = "./In_App_BuyNow.html";
    }
    else if (link === "games") {
        window.location = "./games.html";
    }
    else if (link === "ostaro") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "movies") {
        var _videolink = "drone movies";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list='" + _videolink + "'&format=5");
        localStorage.setItem("videodesc", "");
        window.location = "./videoplayer.html";
    }
    else if (link === "blogs_music") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if ((link === "music") || (link === "nowandbecause")) {
        var _videolink = "nowandbecause";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=nowandbecause&format=5");
        localStorage.setItem("videodesc", "");
        window.location = "./videoplayer.html";
    }
    else if (link === "blogs") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link == "category") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "rss_ads") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    $("#zvideowrapper").iscrollview("scrollTo", 0, 0, true);
    return false;
});

/* general.html */
$(document).delegate('.general .ui-listview a img', 'click touchend', function () {
    var link = $(this).parent().attr("data-param");
    var category = $(this).parent().attr("href");
    //launchItem(link);
    //alert("category: " + category);
    //alert("link: " + link);
    if (link === "stationbreaktv") {
        window.open("http://www.stationbreaktv.com/mobile/index.html", "_blank");
    }
    else if (link.match(/^nb_/)) {
        if (link === "nb_tumblr") {
            window.open("http://www.nowandbecause.tumblr.com", "_blank");
        }
        else if (link === "nb_instagram") {
            window.open("http://www.instagram.com/nowandbecause", "_blank");
        }
        else if (link === "nb_facebook") {
            window.open("http://www.facebook.com/nowandbecause", "_blank");
        }
        else if (link === "nb_twitter") {
            window.open("http://www.twitter.com/_ministeroffunk", "_blank");
        }
        else if (link === "nb_vine") {
            window.open("https://vine.co/nowandbecause", "_blank");
        }
        else if (link === "nb_soundcloud") {
            window.open("http://www.soundcloud.com/nowandbecause", "_blank");
        }
        else if (link.match(/^reddit/)) {
            window.open("https://www.reddit.com/user/infomercialking", "_blank");
        }
        else if (link.match(/^youtube/)) {
            window.open("https://www.youtube.com/user/StationBreakTV/videos", "_blank");
        }
        else if (link.match(/^googleplus/)) {
            window.open("https://plus.google.com/105157363498617017057/posts", "_blank");
        }
        else if (link.match(/^Linkedin/)) {
            window.open("https://www.linkedin.com/profile/view?id=362652528&trk=nav_responsive_tab_profile", "_blank");
        }
        else if (link.match(/^blogger/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^digg/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^dribbble/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^myspace/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^pintrest/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^rss/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^snapchat/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^stumbleupon/)) {
            //window.open("xxx", "_blank");
        }
        else if (link.match(/^vimeo/)) {
            //window.open("xxx", "_blank");
        }
    }
    else if (link === "politics") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "nowandbecause") {
        var _videolink = "nowandbecause";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=nowandbecause&format=5");
        localStorage.setItem("videodesc", "NowandBecause is the Leading Band Seen Everywhere on American Television Nowadays...");
        window.location = "./videoplayer.html";
    }
    else if (link.match(/^dtv_/)) {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "sol_") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "nb_sol_") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "data") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "tools") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "games") {
        window.location = "./games.html";
    }
    else if (link === "blogs") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "cnnmoney") {
        var _videolink = "nowandbecause";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=CNNMoney&format=5");
        localStorage.setItem("videodesc", "CNN Money");
        window.location = "./videoplayer.html";
    }
    else if (link === "shop") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_sergioapps") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_wildworkout") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_dronestv") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_solutions") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_malibudiet") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link === "shop_redcarpet") {
        window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
    }
    else if (link == "rssmobi") {
        //window.location = "./categories.html";
        window.location = "./rssmobi.html";
    }
    else if (link === "holographicvideos") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "rss_ads") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "rss_cat") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "yt_search") {
        store.set('yt_criteria', {
            type: 'yt_search',
            start_index: 1,
            qvalue: link,
            nb_display: 'std'
        });
        window.location = "./yt_search.html";
    }
    else if (link === "maddogzs") {
        var _videolink = "maddogzs";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=maddogzs&format=5");
        localStorage.setItem("videodesc", "maddogzs");
        window.location = "./videoplayer.html";
    }
    else if (link === "drrazdan") {
        var _videolink = "maddogzs";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=drrazdan&format=5");
        localStorage.setItem("videodesc", "Dr. Sanjay Razdin");
        window.location = "./videoplayer.html";
    }
    else if (link === "music") {
        var _videolink = "music";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=music&format=5");
        localStorage.setItem("videodesc", "Music");
        window.location = "./videoplayer.html";
    }
    else if (link === "movies") {
        var _videolink = "movies";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=movies full length english&format=5");
        localStorage.setItem("videodesc", "Movies");
        window.location = "./videoplayer.html";
    }
    else if (link === "tv") {
        var _videolink = "tv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=tv shows&format=5");
        localStorage.setItem("videodesc", "TV Shows");
        window.location = "./videoplayer.html";
    }
    else if (link === "KraftCookingSchool") {
        var _videolink = "KraftCookingSchool";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=KraftCookingSchool&format=5");
        localStorage.setItem("videodesc", "Cooking & Recipes");
        window.location = "./videoplayer.html";
    }
    else if (link === "craftzine") {
        var _videolink = "craftzine";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=craftzine&format=5");
        localStorage.setItem("videodesc", "Housewares");
        window.location = "./videoplayer.html";
    }
    else if (link === "malibudiet") {
        var _videolink = "j2vfP7U-LBI";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed/j2vfP7U-LBI");
        //https: //www.youtube.com/watch?t=1&v=j2vfP7U-LBI
        localStorage.setItem("videodesc", "Since The 1980s The Malibu Diet Has Been Changing the Lives of People Everywhere...");
        window.location = "./videoplayer.html";
    }
    else if (link === "comedycentral") {
        var _videolink = "comedycentral";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=comedycentral&format=5");
        localStorage.setItem("videodesc", "Comedy Central");
        window.location = "./videoplayer.html";
    }
    else if (link === "ufos_all") {
        var _videolink = "stationbreaktv";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
        localStorage.setItem("videodesc", "FREE Movie Channels");
        window.location = "./videoplayer.html";
    }
    else if (link === "thirdphaseofmoon") {
        var _videolink = "thirdphaseofmoon";
        localStorage.setItem("videotype", "embed");
        localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=thirdphaseofmoon&format=5");
        localStorage.setItem("videodesc", "Aliens & UFOs");
        window.location = "./videoplayer.html";
    }
    else if (link === "mobilemates") {
        window.open("http://www.mobile-mates.com/mobilemates.html", "_blank");
    }
    else if (link === "qrurl") {
        window.location = "./qrurl.html";
    }
    else if (link === "games") {
        window.location = "./games.html";
    }
    else if (link === "maps") {
        window.location = "./map.html#page-map";
    }
    else if (link === "ratings") {
        window.location = "./ratings.html";
    }
    else if (link === "police") {
        var feed = "http://www.fbi.gov/news/stories/all-stories/rss.xml";
        localStorage["rssfeed"] = JSON.stringify(feed);
        window.location = "./rssfetch.html";
    }
    else if (link === "sweepstakes") {
        var feed = "http://z.about.com/6/g/contests/b/rss2.xml";
        localStorage["rssfeed"] = JSON.stringify(feed);
        window.location = "./rssfetch.html";
    }
    else if (link === "greenproducts") {
        var feed = "http://www.renewableenergyworld.com/rss/renews.rss";
        //var feed = "http://www.sergioapps.com/feeds/green_products.xml";
        localStorage["rssfeed"] = JSON.stringify(feed);
        window.location = "./rssfetch.html";
    }
    else if (link === "greenmoney") {
        //var feed = "http://www.sergioapps.com/feeds/green_money.xml";
        var feed = "http://www.sergioapps.com/feeds/boats.xml";
        localStorage["rssfeed"] = JSON.stringify(feed);
        window.location = "./rssfetch.html";
    }
    else if (link === "greenservices") {
        var feed = "http://www.sergioapps.com/feeds/green_services.xml";
        localStorage["rssFeed"] = JSON.stringify(feed);
        window.location = "./rssfetch.html";
    }
    else if (cloudID === "wordCloud") {
        var zsearch = link;
        localStorage.setItem("iyoutube", "");
        localStorage.setItem("iyoutube", zsearch);
        window.location = "./youtube.html";
    }
    else {
        store.set('yt_criteria', {
            type: 'search_videos',
            start_index: 1,
            qvalue: link,
            nb_display: 'std'
        });
        window.location = "./youtube.html";
    }

});

function launchItem(path) {
    //var path = $("#datatest").html();
    //$('#dcancel').click();
    //alert("path: " + path);
    if ((cloudID == "mainCloud") || (cloudID == "wordCloud")) {

        if (path.match(/^dtv_/)) {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path === "sol_") {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path.match(/^sol_obama/)) {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path.match(/^sol_/)) {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path.match(/^cf_/)) {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path === 'politics') {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path === "mobilemates") {
            window.open("http://www.mobile-mates.com/mobilemates.html", "_blank");
        }
        else if (path == 'social') {
            zCentreFunc = 0;
            loadCloud('socialCloud', cloudShape, cloudZoom);
        }
        else if (path.match(/^video_/)) {
            var t_linkType = "";
            var t_link = "";
            var t_desc = "";
            var parts = {};
            parts = path.split('|');
            for (var i = 0; i < parts.length; i++) {
                if (parts.length > 2) {
                    try {
                        t_link = parts[1];
                        t_desc = parts[2];
                    }
                    catch (e) {
                    }
                }
            }
            localStorage.setItem("videotype", "embed_youtube");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list='" + t_link + "'&format=5");
            localStorage.setItem("videodesc", t_desc);
            window.location = "./videoplayer.html";
        }
        else if (path === "2GrIJGqwpcM") {
            localStorage.setItem("videotype", "embed_youtube");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list='" + path + "'&format=5");
            localStorage.setItem("videodesc", "MY FUNKY BUDDHA<br />Published on Apr 20, 2015<br />420 MUSIC from MIAMI, FL! ORIGINAL MUSIC/LYRICS by NOWandBECAUSE. Song: MY FUNKY BUDDHA McDonalds, Coca Cola, Love, Starbucks are DRUGS! Some are SAFER! Some are CHEAPER! Some are DIRTY! Some bring the REAPER! Some are ILLEGAL like ACID and REEFER! Some are LETHAL like COKE and PIZZA!<br />Original Music by NOWandBECAUSE. Copyright 2012.<br />");
            window.location = "./videoplayer.html";
        }
        else if ((path === "autopsies")
            || (path === "murders")
            || (path === "witchcraft")
            || (path === "demons")
            || (path === "news")
            || (path === "666")
            || (path === "voodoo")
            || (path === "pagan rites")
            || (path === "drugs")
            || (path === "sex")
            || (path === "marijuana")
            || (path === "police")
            || (path === "fbi")
            || (path == "home housewares") 
            || (path == "nowandbecause")
            || (path == "youtube")
            || (path == "comedy") 
            || (path == "money jobs") 
            || (path == "health diets")
            || (path == "recipes cooking") 
            || (path == "self improvement") 
            || (path == "dating")
            || (path == "diets")
            || (path == "news")
            || (path == "medical breakthroughs") ) {
            localStorage.setItem("videotype", "embed_youtube");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list='" + path + "'&format=5");
            localStorage.setItem("videodesc", "");
            window.location = "./videoplayer.html";
        }
        else if (path === 'social') {
            zCentreFunc = 0;
            loadCloud('socialCloud', cloudShape, cloudZoom);
        }
        else if (path === 'news') {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path === 'beauty') {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path === 'ufos_all') {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path === "blogs") {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if ( (path === 'ustream') 
               || (path === "movies")
               || (path === "tv")
               || (path === "tools")
               || (path === "itunes")
               || (path === "music")
               || (path === "malibudiet")
               || (path === "ratings")
               || (path === "rssmobi")
               || (path === "games") ) {
            window.location = "./" + path + ".html";
        }
        else if (path == "shop") {
            window.open("http://www.sergioapps.com/storefront.html#/store", "_blank");
        }
        else if (path == "jobs") {
            //var feed = "http://www.jobdig.com/jobs/South_Dakota/All_Job_Types/listing.xml";
            var feed = "http://www.watchingthenet.com/feed";
            localStorage["rssfeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html";
        }
        else if (path == "maps") {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path == "rss_ads") {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
        }
        else if (path == "police") {
            var feed = "http://www.fbi.gov/news/stories/all-stories/rss.xml";
            localStorage["rssfeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html";
        }
        else if (path == "sweepstakes") {
            var feed = "http://z.about.com/6/g/contests/b/rss2.xml";
            localStorage["rssfeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html";
        }
        else if (path == "qrurl") {
            window.location = "./qrurl.html#mainPage";
        }
        else if (path == "greenproducts") {
            var feed = "http://www.renewableenergyworld.com/rss/renews.rss";
            localStorage["rssfeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html";
        }
        else if (path == "greenmoney") {
            var feed = "http://www.sergioapps.com/feeds/green_money.xml";
            localStorage["rssfeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html";
        }
        else if (path == "greenservices") {
            var feed = "http://www.sergioapps.com/feeds/green_services.xml";
            localStorage["rssFeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html";
        }
        else if (path == "dating") {
            //window.location = "./ad01.html";
            //var feed = "http://www.sergioapps.com/feeds/green_money.xml";
            var feed = "http://www.sergioapps.com/feeds/boats.xml";
            localStorage["rssfeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html";
        }
    }
    else if (cloudID == "socialCloud") {
        if (path === "tumblr") {
            window.open("http://www.nowandbecause.tumblr.com", "_blank");
        }
        else if (path === "instagram") {
            window.open("http://www.instagram.com/nowandbecause", "_blank");
        }
        else if (path === "facebook") {
            window.open("http://www.facebook.com/nowandbecause", "_blank");
        }
        else if (path === "twitter") {
            window.open("http://www.twitter.com/_ministeroffunk", "_blank");
        }
        else if (path === "vine") {
            window.open("https://vine.co/nowandbecause", "_blank");
        }
        else if (path === "soundcloud") {
            window.open("http://www.soundcloud.com/nowandbecause", "_blank");
        }
        else if (path.match(/^reddit/)) {
            window.open("https://www.reddit.com/user/infomercialking", "_blank");
        }
        else if (path.match(/^youtube/)) {
            window.open("https://www.youtube.com/user/StationBreakTV/videos", "_blank");
        }
        else if (path.match(/^googleplus/)) {
            window.open("https://plus.google.com/105157363498617017057/posts", "_blank");
        }
        else if (path.match(/^Linkedin/)) {
            window.open("https://www.linkedin.com/profile/view?id=362652528&trk=nav_responsive_tab_profile", "_blank");
        }
        else if (path.match(/^blogger/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^digg/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^dribbble/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^myspace/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^pintrest/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^rss/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^snapchat/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^stumbleupon/)) {
            //window.open("xxx", "_blank");
        }
        else if (path.match(/^vimeo/)) {
            //window.open("xxx", "_blank");
        }
    }
}


