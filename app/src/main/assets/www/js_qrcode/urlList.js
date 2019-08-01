(function () {

    var urlManager = UrlManager.getInstance();

    $(document).on("pageinit", "#listPage", function (e) {
        e.preventDefault();

        var urls = urlManager.getUrls();
        if (jQuery.isEmptyObject(urls)) {
            var arUrlItems = [
                new UrlItem("DronesTV", "DronesTV Mobile App", "http://www.dronestv.net/"),
                new UrlItem("SerGio Apps", "FREE Mobile Apps", "http://www.sergioapps.com/"),
                new UrlItem("Infomercials", "FREE TV Time", "http://www.StationBreakTV.com/"),
                new UrlItem("Triple Your Internet Speed for FREE", "Triple Your Internet Speed for FREE", "https://www.youtube.com/watch?v=SDPUUBFdngs"),
                new UrlItem("Kabbalah Code", "Kabbalah Code", "http://www.kabbalahcode.com/"),
                new UrlItem("AeroDreams", "AeroDreams	Buenos Aires", "http://www.aerodreams-uav.com"),
                new UrlItem("Aerovision", "Aerovision	Buenos Aires", "http://aero-vision.com.ar/"),
                new UrlItem("Argentine Army", "Argentine Army Buenos Aires", "http://www.ejercito.mil.ar")
                ];
            urlManager.saveUrls(arUrlItems);
        }

    });

    $(document).on("pageshow", "#listPage", function (e) {
        e.preventDefault();
        updateUrlList();
    });

    $(document).delegate('.rounded-img', 'click touchend', function (e, data) {
        event.preventDefault();
        //event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            event.stopPropagation();
        }
        else {
            localStorage["id_qrcode"] = zid;
            $.mobile.changePage("#qrCodePage");
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
            localStorage["id_qrcode"] = zid;
            $.mobile.changePage("#addEditPage");
        }
    });

    $(document).delegate('#newPage', 'click touchend', function (e, data) {
        localStorage["id_qrcode"] = "";
        $.mobile.changePage("#addEditPage");
        event.preventDefault();
        event.stopPropagation();
    });


    // Bill SerGio: TODO: Make this more specific than just a delete icon !!!!
    $(document).delegate('li [data-icon="delete"]', 'click touchend', function (e, data) {
        event.preventDefault();
        //event.stopPropagation();
        var zid = $(this).parents('[data-role=listview] li').data("id");
        if (zid == 'undefined') {
            localStorage["id_qrcode"] = "";
        }
        else {
            localStorage["id_qrcode"] = zid;
            $.mobile.changePage("#deletePage");
        }
    });

    $(document).on("pageshow", "#qrCodePage", function (e) {
        e.preventDefault();
        var urlID = localStorage["id_qrcode"];

        // Get the url parameter if you prefer passing url parameters
        //var qrUrl = decodeURIComponent(urlObj.hash.replace(/.*url=/, ""));

        var qr_id = localStorage["id_qrcode"];
        var urlItem = new UrlItem("", "", "");
        if (qr_id) {
            //Get urlItem from its ID.
            urlItem = urlManager.getUrlDetails(urlID);
        }

        //Get the url we saved.
        var qrUrl = urlItem.url;

        if (qrUrl) {
            // Get page we are going to write content into.
            var $page = $("#qrCodePage");

            // Get content area element for the page.
            var $content = $page.children(":jqmData(role=content)");

            // I am not a big fan of using Google which requires an Internet connection here
            // But I pot this out as an option here
            //var markup = '<img class="center" src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + qrUrl + '" alt="' + qrUrl + '" style="padding-top:60px;" /><br /><span class="wordwrap">' + qrUrl + '</span><br />';
            // Inject the QR code markup into the content element.
            //$content.html(markup);


            // Let's use the QR Code JavaScript Library
            ///////////////////////////////////////////////////////////////////
            // Canvas
            //$('#qrcodeCanvas').empty();
            //$('#qrcodeCanvas').qrcode({ text: qrUrl });

            // Table
            //$('#qrcodeCanvas').empty();
            //$('#qrcodeTable').qrcode({
            //    render: "table",
            //    text: qrUrl
            //});

            // Canvas no text - we will write our own text below QR Code.
            $('#output').empty();
            $('#output').qrcode(qrUrl);

            $('#url_text').empty();
            $('#url_text').html(qrUrl + '<br />' + urlItem.desc);

            ///////////////////////////////////////////////////////////////////

        }

    });





    $(document).on("pageinit", "#deletePage", function (e) {
        $("#removeAllUrls").on("tap", function () {
            e.preventDefault();
            urlManager.removeAllUrls();
            updateUrlList();
            $.mobile.changePage("#listPage");
        });

        $("#removeUrl").on("click touchend tap", function () {
            e.preventDefault();
            //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
            var urlID = localStorage["id_qrcode"];
            var urlItem = new UrlItem("", "", "");

            if (urlID) {
                //Update an existing url
                urlItem = urlManager.getUrlDetails(urlID);
            }

            urlManager.removeUrl(urlItem);
            updateUrlList();
            $.mobile.changePage("#listPage");
        });
    });

    $(document).on("pageinit", "#qrCodePage", function (e) {

    });


    /////////////////////////////////////////////
    $(document).on("pageinit", "#addEditPage", function (e) {
        e.preventDefault();

        $("#saveUrl").on("tap", function () {
            e.preventDefault();

            var urlItem = new UrlItem($("#title").val() || "Untitled",
                                          $("#desc").val() || "",
                                          $("#url").val() || "",
                                          $("#vid").val() || null);

            urlManager.saveUrl(urlItem);
            $.mobile.changePage("#listPage");
        });

    });

    $(document).on("pageshow", "#addEditPage", function (e) {
        e.preventDefault();

        //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
        var urlID = localStorage["id_qrcode"];
        var urlItem = new UrlItem("", "", "");

        if (urlID) {
            //Update an existing url
            urlItem = urlManager.getUrlDetails(urlID);
        }

        populateEditFields(urlItem);

        if (urlItem.location.length > 0) {
            $("#playUrl").closest('.ui-btn').show();
        } else {
            $("#playUrl").closest('.ui-btn').hide();
        }
    });

    $(document).on("pagebeforehide", "#addEditPage", function (e) {
        urlManager.cleanUpResources();
    });




    //url_prompt
    $(document).on("pageshow", "#deletePage", function (e) {
        e.preventDefault();

        //var urlID = ($.mobile.pageData && $.mobile.pageData.urlID) ? $.mobile.pageData.urlID : null;
        var urlID = localStorage["id_qrcode"];
        var urlItem = new UrlItem("", "", "");

        if (urlID) {
            //Update an existing url
            urlItem = urlManager.getUrlDetails(urlID);
        }

        populateDeleteField(urlItem);

        //if (urlItem.location.length > 0) {
        //    $("#playUrl").closest('.ui-btn').show();
        //} else {
        //    $("#playUrl").closest('.ui-btn').hide();
        //}
    });

    //function zzzupdateUrlList() {
    //    var urls = urlManager.getUrls();
    //    $("#urlListView").empty();
    //    var html = '<nav data-iscroll=\'{"hScroll":false,"vScroll":true,"resizeEvents":"orientationchange","resizeWrapper":true}\' data-id="content" data-role="content"><ul data-theme="a" id="rsslistfetch-ul" data-role="listview" data-filter="false" style="padding-top:20px;padding-bottom:20px;">';

    //    if (jQuery.isEmptyObject(urls)) {
    //        $("<li>No URLs Available</li>").appendTo("#urlListView");
    //    } else {
    //        for (var url in urls) {
    //            //$("<li><a href='#addEditPage?urlID=" + urls[url].id + "'><img src='./img/qr.png' />" + urls[url].title + "</a>" + "<a href='#deletePage?urlID=" + urls[url].id + "'>Delete</a></li>").appendTo("#urlListView");
    //            //$("<li><div id='div_qrcode'><a href='#qrCodePage?urlID=" + urls[url].id + "'>" + urls[url].title + "</a></div>" + "<div id='editcontrols'><div id='div_addedit' class='center-wrapper'><a href='#addEditPage?urlID=" + urls[url].id + "'><img src='./img/edit-black.png' /></a></div>" + "<div id='div_delete' class='center-wrapper'><a href='#deletePage?urlID=" + urls[url].id + "'><img src='./img/delete-black.png' /></a></div></div></li>").appendTo("#urlListView");
    //            //$("<li data-id='" + urls[url].id + "'><a href='#'><img class='rounded-img' src='./img/qr.png' /><div class='ellipsis'>" + urls[url].title + "</div><div class='ellipsis2'>" + urls[url].desc + "</div></a><div class='split-custom-wrapper'><a href='#' data-role='button' class='split-custom-button' data-icon='delete' data-theme='a' data-iconpos='notext'></a><a href='#' data-role='button' class='split-custom-button' data-icon='edit' data-theme='a' data-iconpos='notext'></a></div></li>").appendTo("#urlListView");
    //            $('<li data-id="' + urls[url].id + '"><a href="#"><img class="rounded-img" src="img/qr.png" /><div class="ellipsis">title</div><div class="ellipsis2">description</div></a><div class="split-custom-wrapper"><a href="#" data-role="button" class="split-custom-button" data-icon="delete" data-theme="a" data-iconpos="notext"></a><a href="#" data-role="button" class="split-custom-button" data-icon="edit" data-theme="a" data-iconpos="notext"></a></div></li>').appendTo('#urlListView');
    //        }
    //    }
    //    $('#urlListView').trigger("create"); // *** THIS IS THE KEY ***
    //}

    function updateUrlList() {
        // Get list of urls
        var urls = urlManager.getUrls();

        // Get the page we are going to write our content into.
        var $page = $("#listPage");

        // Get the content area element for the page.
        var $content = $page.children(":jqmData(role=content)");

        //container.empty(); $("#urlListView").empty();

        // Build the list of urls.
        var markup = '<nav data-iscroll=\'{"hScroll":false,"vScroll":true,"resizeEvents":"orientationchange","resizeWrapper":true}\' data-id="content" data-role="content">';
        markup += '<ul data-theme="a" id="rsslistfetch-ul" data-role="listview" data-inset="false" data-filter="false" style="padding-top:20px;padding-bottom:20px;">';

        if (jQuery.isEmptyObject(urls)) {
            //$("<li>No URLs Available</li>").appendTo("#urlListView");
            var arUrlItems = [
                new UrlItem("DronesTV", "DronesTV Mobile App", "http://www.dronestv.net/"),
                new UrlItem("SerGio Apps", "FREE Mobile Apps", "http://www.sergioapps.com/"),
                new UrlItem("Infomercials", "FREE TV Time", "http://www.StationBreakTV.com/"),
                new UrlItem("Triple Your Internet Speed for FREE", "Triple Your Internet Speed for FREE", "https://www.youtube.com/watch?v=SDPUUBFdngs"),
                new UrlItem("Kabbalah Code", "Kabbalah Code", "http://www.kabbalahcode.com/"),
                new UrlItem("AeroDreams", "AeroDreams	Buenos Aires", "http://www.aerodreams-uav.com"),
                new UrlItem("Aerovision", "Aerovision	Buenos Aires", "http://aero-vision.com.ar/"),
                new UrlItem("Argentine Army", "Argentine Army Buenos Aires", "http://www.ejercito.mil.ar")
                ];
            urlManager.saveUrls(arUrlItems);
        }

        for (var url in urls) {
            var _text = true;
            var image = './img/qr.png';
            markup += '<li data-id="' + urls[url].id + '">';
            //markup += '<a href="#" id="link_wrapper">';
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


    function populateEditFields(urlItem) {
        $("#vid").val(urlItem.id);
        $("#title").val(urlItem.title);
        $("#desc").val(urlItem.desc);
        $("#url").val(urlItem.url);
    }

    function populateDeleteField(urlItem) {
        $("#url_prompt").text(urlItem.title);
    }


    function LoadUpDefault() {

        var urlItem = new UrlItem("title", "desc", "url", "");

        urlManager.saveUrl(urlItem);
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


