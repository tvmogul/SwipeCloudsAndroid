/*
* jQuery rssfetch Plugin 3.0.0
*
* Copyright (c) 2011 William SerGio
*
* I used $.ajax() jQuery method instead of the limited functionality in the $.getJSON() method of in the jQuery library.
* The $.ajax() method gives us access to the Error call back method of the AJAX request. 
* With this method and my unified AJAX response, handling errors is actually quite easy. 
* All AJAX errors are piped through my AJAXFailHandler() method which creates a "fail" AJAX response 
* and sets SUCCESS flag to false) and then manually executes the AJAX callback, passing in the fail response. 
* This way, from the AJAX response handler's point of view, it has no idea that anything has gone wrong and
* it only knows that it received a response object that was either flagged as a success or a failure.
* 
* This document is licensed as free software under the terms of the
* MIT License: http://www.opensource.org/licenses/mit-license.php
*/
(function ($, undefined) {

    $.fn.rsslistfetch = function (params) {

        //
        // Clean string
        //
        var cleanEntities = (function () {
            // block creating object more than once 
            var rssItem = document.createElement('div');

            function cleanHTMLEntities(str) {
                if (str && typeof str === 'string') {
                    // remove script/html tags
                    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
                    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                    rssItem.innerHTML = str;

                    // 'textContent' isn't avaiable in IE8
                    if (rssItem.textContent === undefined) {
                        str = rssItem.innerText;
                        rssItem.innerText = '';
                    }
                    else {
                        str = rssItem.textContent;
                        rssItem.textContent = '';
                    }
                }
                return str;
            }
            return cleanHTMLEntities;
        })();

        //
        // Create object whoose properties are feed values
        //
        var getDate = function (date, objDate) {

            var day = date.getUTCDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            objDate.year = (year.toString().length == 1 ? "0" : "") + year;
            objDate.month = (month.toString().length == 1 ? "0" : "") + month;
            objDate.day = (day.toString().length == 1 ? "0" : "") + day;
            objDate.hours = (hours.toString().length == 1 ? "0" : "") + hours;
            objDate.minutes = (minutes.toString().length == 1 ? "0" : "") + minutes;
            objDate.seconds = (seconds.toString().length == 1 ? "0" : "") + seconds;
        }

        //
        // Get image from feed and return an empty string if not found
        //
        var getImage = function (feedContent) {
            try {
                var img = $('<div>' + feedContent + '</div>').find('image').first();
                if ($(img).length == 0) {
                    return "";
                }
                else {
                    return $(img).attr('src');
                }
            }
            catch (e) {
                return "";
            };
        }

        // Default parameters
        var defaults = {
            entries: 100,
            header: false,
            headerclass: '',
            text: false,
            images: true,
            fulltext: false,
            date: false,
            twitter: false,
            facebook: false,
            reverse: false,
            listdivider: '',
            type: 'search_users'
        };
        var params = $.extend(defaults, params);

        var selector = this;

        // create URL for feed with random data to get data from Google API
        var now = Date.parse(new Date());
        var feed = params.feed;
        var category = params.category;
        var _text = params.text;
        var _listdivider = params.listdivider;
        var _type = params.type;

        var entries = JSON.parse(localStorage.getItem(feed)) || [];
        //if (entries == '') {

        var container = $(this);
        var containerId = container.attr('id');

        container.empty();

        // Create body container for rssItem
        //var bodyContainer = $("<nav>"); //.attr('data-role', 'content');

        // Container rssItem
        //        var rssItemsContainer = $("<ul>").attr('data-role', 'listview').attr('data-icon', 'arrow-r').attr('data-split-theme', 'a').attr('data-iconpos', 'notext');
        //        bodyContainer.append(rssItemsContainer);

        $.getJSON(feed, function (d) {
            //d[category].push({
            //    "title": "TEST",
            //    "link": "TEST",
            //    "publishedDate": "Tue, 10 Aug 2010 10:20:42 -0700",
            //    "contentSnippet": "TEST",
            //    "content": "TEST"
            //}); 
            var _text = false;
            var html = '<nav data-iscroll=\'{"hScroll":false,"vScroll":true,"resizeEvents":"orientationchange","resizeWrapper":true}\' data-id="content" data-role="content"><ul data-theme="a" id="rsslistfetch-ul" data-role="listview" data-inset="false" data-filter="false" style="padding-top:20px;padding-bottom:20px;">';

            if (_listdivider == "") {

            }
            else if (_listdivider == "movies") {
                html += '<li data-role="list-divider"><div id="movieheader"><img src="img_default/1_movie_categories.png" /></div></li>';
            }
            else if (_listdivider == "tv") {
                html += '<li data-role="list-divider"><div id="movieheader"><img src="img_default/1_tvshow_categories.png" /></div></li>';
            }
            else if (_listdivider == "blogs") {
                html += '<li data-role="list-divider"><div id="movieheader"><img src="img_default/1_blog_categories.png" /></div></li>';
            }
            else if (_listdivider == "music") {
                _text = false;
                html += '<li data-role="list-divider"><div id="movieheader"><img src="img_default/1_music_categories.png" /></div></li>';
            }
            else if (_listdivider == "logins") {
                html += '<li data-role="list-divider"><div id="movieheader"></div></li>';
            }
            else if (_listdivider == "games") {
                _text = true;
                html += '<li data-role="list-divider"><div id="movieheader"><img src="img_default/1_games_categories.png" /></div></li>';
            }

            $.each(d[category], function (i, data) {

                //"music":[
                //	{"title":"50s Music #1",
                //	"link":"#search_users",
                //	"search":"UC_DS9LuAltDzIRbdIsK7oIg",
                //	"shortDescription":"",
                //	"description":"",
                //	"image":"img_default/1_go.png",
                //	"publishedDate":"5/27/2014 9:13:33 PM"

                var title = cleanEntities(data.title);
                var link = data.link;
                var search = data.search;
                var shortDescription = cleanEntities(data.shortDescription);
                var description = cleanEntities(data.description);
                var image = data.image;
                var publishedDate = new Date(data.publishedDate);

                ////var sub = cleanEntities(data.subCategory);
                //var title = cleanEntities(data.title);
                //var link = data.link;
                //var date = new Date(data.publishedDate);
                //var text = cleanEntities(data.contentSnippet);
                //var fullText = cleanEntities(data.content);
                //var displayText = (params.fulltext ? fullText : text);
                //var search = data.search;

                html += '<li data-icon="false" data-role="listview" style="width:100%;display:block;">';
                html += '<a class="rsslistfetch-link" href="' + link + '" title="' + title + '">';
                html += '<img class="rounded-img" src="' + image + '" alt="' + title + '" data-search="' + search + '" data-id="' + link + '" />';

                if (_text) {
                    html += '<div class="ellipsis" style="margin-top: 0px; !important;">' + title + '</div>';
                    html += '<div class="ellipsis2">' + shortDescription + '</div>';
                }
                else {
                    html += '<div class="ellipsis" style="margin-top: 20px; !important;">' + title + '</div>';
                }

                html += '</a></li>';

                $('#rsslistfetch-ul').html(html);

                //var titleRssItem = $('<div>'); //headline
                //var linkRssItem = $('<a>').attr('href', "#")
                //                        .attr('class', 'linkpopup')
                //                        .attr('data-params', link)
                //                        .text(title).css('padding-top', '22px')
                //                        .appendTo(titleRssItem);

                //rssItemHeader.append(titleRssItem);

                //var image = data.image;
                //rssItemContainer.append('<img id="img' + i + '" src="' + image + '" class="photoListContainer" />');


            });
            html += '</ul><nav>';
            //lert(bodyContainer.html());
            // Add body container to top container
            container.append(html);
            container.parents('[data-role=page]').page('destroy').page();

            refreshListView();

        });
        ////////////////////////////////////////////////////////////////////////

        $(document).on('click touchend', '.rounded-img', function (e) {
            //$('div#movies1 ul li').on('click touchend', function (e) {
            //var link = $(this).attr('data-search');
            var link = $(this).data('search');
            if ((link == 'undefined') || (link == '#') || link.length < 1) {
                return;
            }
            if (category == "logins") {
                if (link == "youtube_pair") {
                    window.open('http://m.YouTube.com', '_system', 'location=no');
                    return false;
                }
                else if (link == "google") {
                    window.open("https://accounts.google.com/", '_system', 'location=no');
                    return false;
                }
                else if (link == "legal") {
                    window.location = "./legal.html";
                    return false;
                }
                else if (link == "cordova") {
                    window.location = "./cordova_new.html";
                    return false;
                }
                //function openDeviceBrowser(externalLinkToOpen) { window.open(externalLinkToOpen, '_system', 'location=no'); }
            }
            if (category == "games") {
                if (link == "chess") {
                    window.location = "chess.html";
                }
                else if (link == "checkers") {
                    window.location = "checkers.html";
                }
                else if (link == "solitaire") {
                    window.location = "solitaire.html";
                }
                else if (link == "bounce") {
                    window.location = "bounce.html";
                }
                else if (link == "burstmybubbles") {
                    window.location = "burstmybubbles.html";
                }
                else if (link == "swim") {
                    window.location = "swim.html";
                }
                else if (link == "puzzle") {
                    window.location = "puzzle.html";
                }
            }
            else {
                //var path = $(this).text();
                var _id = $(this).data('id');
                if ((_id === "#search_users") || (_id === "#yt_channel")) {
                    _type = "search_users";
                }

                if (link == "nowandbecause") {
                    _type = "search_users";
                }
                if (category == "blogs") {
                    _type = "search_users";
                }


                store.set('yt_criteria', {
                    type: _type,
                    start_index: 1,
                    qvalue: link,
                    nb_display: 'std'
                });


                //var criteria = store.get('yt_criteria')
                window.location = "./youtube.html";
            }
        });

        $(document).on('click', '.photopopup', function (e) {
            var aRssItem = $('<a>').attr('href', $(this).attr('id'));
            $('div#' + $(this).attr('id')).popup("open");
        });

        $(".photopopup").on({
            popupbeforeposition: function () {
                var maxHeight = $(window).height() - 60 + "px";
                $(".photopopup img").css("max-height", maxHeight);
            }
        });

        //<a href="#" class="linkpopup ui-link" data-params="http://www.fbi.gov/rss/video.xml" style="padding-top: 22px;">F.B.I. Feeds</a>

        $(document).on('click', '.linkpopup', function (e) {
            var feed = $(this).attr("data-params");
            //event.preventDefault();
            localStorage["rssfeed"] = JSON.stringify(feed);
            window.location = "./rssfetch.html#mainPage";
        });

        $(".linkpopup").on({
            popupbeforeposition: function () {
            }
        });

        //Delete Link
        var $currli;
        $(document).on('click', '.linkpopup2', function (e) {
            var feed = $(this).attr("data-params");
            event.preventDefault();
            $currli = $(this).closest('li');
            $("#datatest").html(feed);
            //$('#inlinecontent').simpledialog2({ 'hide': { effect: 'fadeOut', duration: 5000} });
            ShowPopup();
        });

        function ShowPopup() {
            //rest of the code
            shadowDiv = document.getElementById("popupDiv").style.display = 'block';
            //ShowRectangularDynamicDropShadow(shadowDiv, "#333333", 5);
            //rest of the code
        }

        function HidePopup() {
            if (document.getElementById) {
                var elem = document.getElementById("popupDiv");
                //shadowDiv = document.getElementById("shadow");
                //HideRectangularDynamicDropShadow(shadowDiv);
                elem.style.display = "none";
                //shadowDiv.style.display = "none";
                elem.innerhtml = "";
            }
        }

        $("#dok").button().on("click", function () {
            var path = $("#datatest").html();
            //alert(path);
            //$currli.remove();
            //$("#divrss").listview("refresh")
            delUrl(path);
        });

        // Find URL in the url list.
        // Return index or -1 if not found.
        function findUrl(url) {
            var index = -1;
            var myUrls = getMyFeeds();
            for (var i = 0; i < myUrls.length; i++) {
                //if (myUrls[i].link === encodeURIComponent(url)) {
                if (myUrls[i].link === url) {
                    return i;
                }
            }
            return index;
        }

        // Add a URL to the list.
        function addUrl(url) {
            var myUrls = getMyFeeds();
            // Check for duplicates
            if (findUrl(url) === -1) {
                myUrls = myUrls.concat(encodeURIComponent(url));
                localStorage.setItem("myfeeds", JSON.stringify(myUrls));
            }
        }


        $("#addfeed").button().on("click", function () {
            var myUrls = getMyFeeds();
            // Check for duplicates
            //if (findUrl(_link) === -1) {
            //myUrls = myUrls.concat(newitem);
            myUrls.push({
                "title": $('#title').val(),
                "link": $('#link').val(),
                "publishedDate": "Tue, 10 Aug 2010 10:20:42 -0700",
                "contentSnippet": $('#description').val(),
                "content": $('#description').val()
            });
            localStorage.setItem("myfeeds", JSON.stringify(myUrls));
            //}


            $("#title, #url, #description").val("");
            $("#divrss").empty();

            $('.divrss').rsslistfetch(
				{
				    feed: _feedurl,
				    entries: 100,
				    header: false,
				    headerclass: 'myheader',
				    images: true,
				    fulltext: true,
				    date: false,
				    loadingImg: 'images/loading.gif'
				});

            $('#divrss').listview('refresh');

            window.location = "./rsslistfetch.html#mainPage";

            return false;

            //$.mobile.changePage("#mainPage");

            //if ((_title == '') || (_link == '')) {
            //    alert('Nothing to add');
            //}

            //$("#title, #url").val("");
            //$("#iscroll_list").empty().append($(startList()).children()).listview("refresh");
        });


        // Delete URL from the list.
        function delUrl(url) {
            var myUrls = getMyFeeds();
            var index = findUrl(url);
            if (index !== -1) {
                myUrls.splice(index, 1);
                localStorage.setItem("myfeeds", JSON.stringify(myUrls));
            }
            //window.location = "./rsslistfetch.html#mainPage";
            //$('.divrss').empty();

            $('.divrss').rsslistfetch(
				{
				    feed: _feedurl,
				    entries: 100,
				    header: false,
				    headerclass: 'myheader',
				    text: false,
				    images: true,
				    fulltext: true,
				    date: false,
				    loadingImg: 'images/loading.gif'
				});

            $('#divrss').listview('refresh');
            //refreshPage();
            //window.location.reload()
            return false;

        }

        // Retrieve a list of URLs from the local storage. 
        // Use defaults if storage has not been initialized yet.
        // URLs are serialized using JSON for storage.
        //        function getMyFeeds() {
        //            var feed = params.feed;
        //            var myFeeds = JSON.parse(localStorage.getItem(feed)) || [];
        //            if (myFeeds == '') {
        //                myFeeds = {
        //                    "general": [
        //                        {
        //                            "title": "Health & Drugs",
        //                            "link": "http://mf.feeds.reuters.com/reuters/UKHealth",
        //                            "publishedDate": "Tue, 10 Aug 2010 10:20:42 -0700",
        //                            "contentSnippet": "contentSnippet",
        //                            "content": "content"
        //                        }
        //                    ]
        //                };
        //                //alert(JSON.stringify(myFeeds));
        //                localStorage.setItem("myfeeds", JSON.stringify(myFeeds));
        //            }
        //            return myFeeds;
        //        }


        // Retrieve a list of URLs from the local storage. 
        // Use defaults if storage has not been initialized yet.
        // URLs are serialized using JSON for storage.
        function getMyFeeds2(zparent) {
            var feed = params.feed;
            var myUrls = [];
            //var myUrls = JSON.parse(localStorage.getItem(feed)) || [];
            //if (myUrls == '') {
            //////////////////////////////////////////////////////////////////////
            $.getJSON('feeds/myfeeds.js', '', function (d) {
                //if ((d[zparent] == 'undefined') || (d[zparent] == null))
                //    return false;

                //$.each(d[zparent], function (i, item) {
                $.each(d["science"], function (i, item) {
                    myUrls.push({
                        "title": item.title,
                        "link": item.link,
                        "publishedDate": "Tue, 10 Aug 2010 10:20:42 -0700",
                        "contentSnippet": item.contentSnippet,
                        "content": item.content
                    });
                    //alert(item.title);
                    //alert(item.link);
                    //alert(item.contentSnippet);
                    //alert(item.content);
                });
                myUrls.join('');
            });

            //////////////////////////////////////////////////////////////////////
            //alert(JSON.stringify(myUrls));
            //localStorage.setItem(feed, JSON.stringify(myUrls));
            //}

            return myUrls;
        }

        $('[data-role=page]').live('pageshow', function (event) {
            //if (event.target.id.indexOf(yourPageId) == 0) {
            //    //do refresh here.
            //}
            $('#divrss').listview('refresh');
        });


        function refreshPage() {
            $.mobile.changePage(
            window.location.href,
            {
                allowSamePageTransition: true,
                transition: 'none',
                showLoadMsg: false,
                reloadPage: true
            }
          );
        }

        return this;
    };

})(jQuery);


