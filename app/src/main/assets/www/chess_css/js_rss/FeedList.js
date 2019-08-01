(function () {

    var feedManager = FeedManager.getInstance();

    $(document).on("pageinit", "#listPage", function (e) {
        e.preventDefault();

        var urls = feedManager.getUrls();
        if (jQuery.isEmptyObject(urls)) {
            restoreDefaults();
            //$.mobile.changePage("#listPage");
        }
    });

    $(document).on("pageshow", "#listPage", function (e) {
        e.preventDefault();
        updateUrlList();
    });

    $(document).delegate('#listPage .rounded-img', 'click touchend', function (e, data) {
        event.preventDefault();
        event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            event.stopPropagation();
        }
        else {
            localStorage["id_rssfeedcode"] = zid;
            GetFeeds();
            var urlID = localStorage["id_rssfeedcode"];
            var feedItem = new FeedItem("", "", "");
            if (urlID) {
                //Get feedItem from its ID.
                feedItem = feedManager.getUrlDetails(urlID);
            }
            var qrUrl = feedItem.url;
            if (qrUrl.indexOf("rsshandler.ashx") < 0) {
                $.mobile.changePage("#rssFeedPage");
            }
        }
    });

    $(document).delegate('li [data-icon="edit"]', 'click touchend', function (e, data) {
        event.preventDefault();
        //event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            event.stopPropagation();
        }
        else {
            localStorage["id_rssfeedcode"] = zid;
            $.mobile.changePage("#addEditPage");
        }
    });

    $(document).delegate('#newPage', 'click touchend', function (e, data) {
        localStorage["id_rssfeedcode"] = "";
        $.mobile.changePage("#addEditPage");
        event.preventDefault();
        //event.stopPropagation();
    });


    // Bill SerGio: TODO: Make this more specific than just a delete icon !!!!
    $(document).delegate('li [data-icon="delete"]', 'click touchend', function (e, data) {
        event.preventDefault();
        //event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            localStorage["id_rssfeedcode"] = "";
        }
        else {
            localStorage["id_rssfeedcode"] = zid;
            $.mobile.changePage("#deletePage");
        }
    });

    //    $(document).on("pagebeforeshow", "#rssFeedPage", function (e) {
    //        //$(document).on("pageshow", "#rssFeedPage", function (e) {
    //        e.preventDefault();

    //        //$('#feeditems-ul').trigger("create"); // *** THIS IS THE KEY ***
    //        //$('#feeditems-ul').listview('refresh');

    //        //GetFeeds();

    //        //$("#rssFeedPage").trigger("updatelayout");

    //    });

    $(document).on('click', '.ui-header a', function () {
        var el = $(this);
        var link = el.attr('href');
        if (link == "#from_article") {
            $.mobile.changePage("#rssFeedPage");
        }
        else if (link == "#movies") {
            //window.location = "./movies.html";
        }
    });



    $(document).on("pageinit", "#deletePage", function (e) {
        $("#removeAllUrls").on("tap", function () {
            e.preventDefault();
            feedManager.removeAllUrls();
            updateUrlList();
            $.mobile.changePage("#listPage");
        });

        $("#removeUrl").on("click touchend tap", function () {
            e.preventDefault();
            //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
            var urlID = localStorage["id_rssfeedcode"];
            var feedItem = new FeedItem("", "", "");

            if (urlID) {
                //Update an existing url
                feedItem = feedManager.getUrlDetails(urlID);
            }

            feedManager.removeUrl(feedItem);
            updateUrlList();
            $.mobile.changePage("#listPage");
        });
    });

    $(document).on("pageinit", "#rssFeedPage", function (e) {

    });


    /////////////////////////////////////////////
    $(document).on("pageinit", "#addEditPage", function (e) {
        e.preventDefault();

        $("#saveUrl").on("tap", function () {
            e.preventDefault();

            var feedItem = new FeedItem($("#title").val() || "Untitled",
                                          $("#desc").val() || "",
                                          $("#url").val() || "",
                                          $("#vid").val() || null);

            feedManager.saveUrl(feedItem);
            $.mobile.changePage("#listPage");
        });

        $("#restoreDefaults").on("tap", function () {
            e.preventDefault();
            restoreDefaults();
            $.mobile.changePage("#listPage");
        });

    });

    $(document).on("pageshow", "#addEditPage", function (e) {
        e.preventDefault();

        //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
        var urlID = localStorage["id_rssfeedcode"];
        var feedItem = new FeedItem("", "", "");

        if (urlID) {
            //Update an existing url
            feedItem = feedManager.getUrlDetails(urlID);
        }

        populateRecordingFields(feedItem);

        if (feedItem.location.length > 0) {
            $("#playUrl").closest('.ui-btn').show();
        } else {
            $("#playUrl").closest('.ui-btn').hide();
        }
    });

    $(document).on("pagebeforehide", "#addEditPage", function (e) {
        feedManager.cleanUpResources();
    });




    //url_prompt
    $(document).on("pageshow", "#deletePage", function (e) {
        e.preventDefault();

        //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
        var urlID = localStorage["id_rssfeedcode"];
        var feedItem = new FeedItem("", "", "");

        if (urlID) {
            //Update an existing url
            feedItem = feedManager.getUrlDetails(urlID);
        }

        populateDeleteField(feedItem);

    });

    //FUNCS
    function GetFeeds() {
        var urlID = localStorage["id_rssfeedcode"];
        var feedItem = new FeedItem("", "", "");
        if (urlID) {
            //Get feedItem from its ID.
            feedItem = feedManager.getUrlDetails(urlID);
        }

        //Get the url we saved.
        var qrUrl = feedItem.url;

        if (qrUrl.indexOf("rsshandler.ashx") > -1) {
            var _videolink = "stationbreaktv";
            localStorage.setItem("videotype", "embed");
            localStorage.setItem("videolink", "http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5");
            localStorage.setItem("videodesc", "FREE Movie Channels");
            window.location = "./videoplayer.html";
            return;
        }

        if (qrUrl) {
            //$('#divrss').empty();
            $('.divrss').rssfetch(
			{
			    feed: qrUrl,
			    entries: 100,
			    header: false,
			    headerclass: 'myheader',
			    images: true,
			    fulltext: true,
			    loadingImg: 'images/loading.gif',
			    twitter: false,
			    facebook: false
			});
        }
        //$("#yt_player").attr("src", "");
        //$.mobile.changePage("rssmobi.html#rssFeedPage", {
        //    transition: "flip",
        //    reverse: 'true',
        //    changeHash: false
        //});
        $("#listFeedPage").trigger("updatelayout");

    }

    function restoreDefaults() {
        feedManager.removeAllUrls();
        var urls = feedManager.getUrls();
        //var arFeedItems = [];
        //arFeedItems.push(new FeedItem("feed1", "feed1", "http://www.fark.com/fark.rss"));
        //arFeedItems.push(new FeedItem("feed2", "feed2", "http://rss.slashdot.org/Slashdot/slashdot"));
        //arFeedItems.push(new FeedItem("feed3", "feed3", "http://www.reddit.com/.rss"));
        //arFeedItems.push(new FeedItem("feed3", "feed4", "http://digg.com/news.rss"));
        var arFeedItems = [
                new FeedItem("CorrectionsOne.com", "CorrectionsOne.com Feed", "http://www.correctionsone.com/drones/rss.xml"),
                new FeedItem("Clipset Ar Drone", "Clipset Ar Drone Feed", "http://www.clipset.net/tag/ar-drone/feed/"),
                new FeedItem("Drone Warfare", "Drone Warfare Feed", "http://vcnv.org/taxonomy/term/135/feed"),
                new FeedItem("New Cool Stuff", "New Stuff, Breakthroughs, Things You Want", "http://www.sergioapps.com/rsshandler.ashx?cat=music&start=0&max=49&methodName=topFeeds&jsonp=onRSSLoaded"),
                new FeedItem("Yahoo News", "Yahoo News Feed", "http://news.yahoo.com/rss/"),
                new FeedItem("UFO.Whipnet.org RSS Feed", "UFO.Whipnet.org RSS Feed", "http://rss.whipnet.net/ufo/rss.feed.xml"),
                new FeedItem("UFO Secret and Mysteries", "UFO Secret and Mysteries", "http://www.ufo-secret.com/rss.php"),
                new FeedItem("UFO", "UFO Articles", "http://www.ufo-secret.com/rss.php?c=1"),
                new FeedItem("News RSS feed &#45", "News RSS feed &#45; UFO: Alien Invasion | Desura", "http://www.desura.com/games/ufo-alien-invasion/news/feed"),
                new FeedItem("Latest UFO News", "Latest UFO News", "http://feeds.feedburner.com/TheBestRealUfoVideosNewsUpdatedDailyUfosVideoSightingsAliensAlienPictures?format=xml")
        ];

        feedManager.saveUrls(arFeedItems);
        //window.location.reload();
        //$.mobile.changePage("#listPage");
    }


    function updateUrlList() {
        // Get list of urls
        var urls = feedManager.getUrls();

        // Get the page we are going to write our content into.
        var $page = $("#listPage");

        // Get the content area element for the page.
        var $content = $page.children(":jqmData(role=content)");

        //container.empty(); $("#urlListView").empty();

        // Build the list of urls.
        var markup = '<nav data-iscroll=\'{"hScroll":false,"vScroll":true,"resizeEvents":"orientationchange","resizeWrapper":true}\' data-id="content" data-role="content">';
        markup += '<ul data-theme="a" id="rssfetch-ul" data-role="listview" data-inset="false" data-filter="false" style="padding-top:20px;padding-bottom:20px;">';
        //var markup = '';

        if (jQuery.isEmptyObject(urls)) {
            //$("<li>No URLs Available</li>").appendTo("#urlListView");
            restoreDefaults();
            //$.mobile.changePage("#listPage");
            urls = feedManager.getUrls();
        }

        for (var url in urls) {
            var _text = true;
            var image = './img/rss.png';

            markup += '<li data-id="' + urls[url].id + '">';
            //markup += '<a href="#" class="link_wrapper">';
            markup += '<img class="rounded-img" src="' + image + '" alt="." />';
            if (_text) {
                markup += '<div class="ellipsis" style="margin-top: 0px; !important;">' + urls[url].title + '</div>';
                markup += '<div class="ellipsis2">' + urls[url].desc + '</div>';
            }
            else {
                markup += '<div class="ellipsis" style="margin-top: 20px; !important;">' + urls[url].title + '</div>';
            }
            markup += '<div class="split-custom-wrapper">';
            markup += '<a id="b_delete" data-corners="false" href="#" data-role="button" class="split-custom-button" data-icon="delete" data-theme="a" data-iconpos="notext"></a>';
            markup += '<a id="b_edit" data-corners="false" href="#" data-role="button" class="split-custom-button" data-icon="edit" data-theme="a" data-iconpos="notext"></a>';
            markup += '</div';
            markup += '</li>';
        }

        markup = markup + "</ul></nav>";

        // Inject the list markup into the content element.
        $content.html(markup);

        //WS needed for scrolling
        $content.parents('[data-role=page]').page('destroy').page();

        // Pages are lazily enhanced. We call page() on the page
        // element to make sure it is always enhanced before we
        // attempt to enhance the listview markup we just injected.
        $page.page();

        // Enhance the listview we just injected.
        $content.find(":jqmData(role=listview)").listview();

        // Now call changePage() and tell it to switch to the page we just modified.
        //$.mobile.changePage($page);

    }


    function populateRecordingFields(feedItem) {
        $("#vid").val(feedItem.id);
        $("#title").val(feedItem.title);
        $("#desc").val(feedItem.desc);
        $("#url").val(feedItem.url);
    }

    function populateDeleteField(feedItem) {
        $("#url_prompt").text(feedItem.title);
    }


    function LoadUpDefault() {

        var feedItem = new FeedItem("title", "desc", "url", "");

        feedManager.saveUrl(feedItem);
        $.mobile.changePage("#listPage");
    }


    var refreshIntervalId;
    function refreshListView() {
        refreshIntervalId = setTimeout("refreshListViewDelayed()", 100);
    }
    function refreshListViewDelayed() {
        clearInterval(refreshIntervalId);
        //$('#rsslistfetch-ul').listview('refresh');
        //$(".videowrapper").find(".iscroll-content").resizeWrapper();
    }


    // Find URL in the url list. Return index or -1 if not found.
    function findUrl(url) {
        var index = -1;
        var myUrls = getMyUrls();
        for (var i = 0; i < myUrls.length; i++) {
            if (myUrls[i] == encodeURIComponent(url)) {
                return i;
            }
        }
        return index;
    }

    // Add a URL to the list.
    function addUrl(url) {
        var myUrls = getMyUrls();
        // Check for duplicates
        if ((url == "http://") || (url == "")) {
        }
        else if (findUrl(url) == -1) {
            myUrls = myUrls.concat(encodeURIComponent(url));
            localStorage.setItem("myUrls", JSON.stringify(myUrls));
        }
        else {
            //alert("Link already in list!");
        }
    }


})();


