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

    $.fn.rssfetch = function (params) {

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
                var img = $('<div>' + feedContent + '</div>').find('img').first();
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
            images: true,
            fulltext: true,
            twitter: false,
            facebook: false,
            reverse: false
        };
        var params = $.extend(defaults, params);

        var selector = this;

        // create URL for feed with random data to get data from Google API
        var now = Date.parse(new Date());
        var feed = params.feed;

        if (params.feed.indexOf('?') == -1) {
            feed += '?x=' + now;
        }
        else {
            feed += '&x=' + now;
        }

        var feed = params.feed;

        var fullUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&num=' + params.entries + '&q=' + encodeURIComponent(feed);

        $.ajax({
            url: fullUrl,
            dataType: 'jsonp',
            success: onSuccess,
            error: OnFail
        });

        function OnFail(data) {
        }

        function onSuccess(data) {
            //callback(data.responseData.feed);

            //if (params.header) {
            //    $("#scroller_wrapper").prepend('<div class="' + params.headerclass + '">' + cleanEntities(data.responseData.feed.title) + '</div>');
            //}

            // For each rssItem in selector create "rssfetch"
            selector.each(function (i) {
                //////////////////////////////////////////////////////////////////////////////////
                // Get the page we are going to write our content into.
                var $page = $("#rssFeedPage");

                // Get the content area element for the page.
                var $content = $page.children(":jqmData(role=content)");

                //$content.parents('[data-role=page]').page('destroy').page();

                //////////////////////////////////////////////////////////
                //var $content = $page.children(":jqmData(role=content)");
                //$content.empty();
                //$("#urlListView2").empty();
                //$("#divrss").empty();
                //////////////////////////////////////////////////////////

                // Build the list of urls.
                //var markup = '<nav data-iscroll=\'{"hScroll":false,"vScroll":true,"resizeEvents":"orientationchange","resizeWrapper":true}\' data-id="content" data-role="content">';
                //markup += '<ul data-theme="a" id="rssfetch-ul2" data-role="listview" data-inset="false" data-filter="false" style="padding-top:20px;padding-bottom:20px;">';
                var markup = '';

                $.each(data.responseData.feed.entries, function (i) {
                    var title = cleanEntities(data.responseData.feed.entries[i].title);
                    var author = data.responseData.feed.entries[i].author;
                    var link = data.responseData.feed.entries[i].link;
                    var date = new Date(data.responseData.feed.entries[i].publishedDate);
                    var text = cleanEntities(data.responseData.feed.entries[i].contentSnippet);
                    var fullText = cleanEntities(data.responseData.feed.entries[i].content);
                    var displayText = (params.fulltext ? fullText : text);

                    var author = data.responseData.feed.entries[i].author;

                    // Get date 
                    var objDate = { year: '', month: '', day: '', hours: '', minutes: '', seconds: '' };
                    getDate(date, objDate);

                    //var rssItemContainer = $('<li>').appendTo(rssItemsContainer).attr('data-rssItem-id', i);
                    //var rssItemHeader = $('<div>');
                    //rssItemHeader.appendTo(rssItemContainer);

                    //var titleRssItem = $('<div>');

                    //var linkRssItem = $('<a>').attr('href', "#")
                    //                    .attr('class', 'linkpopup')
                    //                    .attr('data-params', link)
                    //                    .text(title)
                    //                    .appendTo(titleRssItem);

                    //var dateRssItem = $('<p style="padding-top:4px;">').text(objDate.year + '/' + objDate.month + '/' + objDate.day + ' - ' +
                    //                    	objDate.hours + ':' + objDate.minutes + ':' + objDate.seconds);

                    //rssItemHeader.append(titleRssItem).append(dateRssItem);

                    // Show image (parameter = true)
                    var _text = true;
                    // Get iany images from feed
                    //////////////////////////////////////////////////////
                    ////sReg = /<img[^>]*>/g;
                    //sReg = /<img[^>]*/g;
                    //imgTag = rsscontent.match(sReg);
                    //if ((imgTag == 'undefined') || (imgTag == null)) {
                    //    imgTag = '';
                    //}
                    //else {
                    //    imgTag = imgTag + ' class="thumbnail">';
                    //}
                    //////////////////////////////////////////////////////
                    var image = getImage(data.responseData.feed.entries[i].content);
                    if ((image == 'undefined') || (image == '') || (image == null)) {
                        image = './img/rss.png';
                        //rssItemContainer.append('<img id="img' + i + '" src="' + image + '" class="photopopup" />' +
                        //'<div class="photopopupContainer" id="img' + i + '" data-role="popup" data-overlay-theme="a" data-theme="a">' +
                        //'<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>' +
                        //'<p><img id="' + image + '" src="' + image + '" style="width:240px;height:auto;" /><br />' + displayText + '</p></div>');
                    }

                    markup += '<li data-id="' + i.toString() + '" data-image="' + image + '" data-title="' + title + '" data-url="' + link + '" data-author="' + author + '" data-desc="' + fullText + '" data-feed="' + feed + '">';
                    markup += '<a href="#" class="feed_wrapper">';

                    markup += '<img class="rounded-img" src="' + image + '" alt="." />';
                    if (_text) {
                        markup += '<div class="ellipsis" style="margin-top: 0px; !important;">' + title + '</div>';
                        markup += '<div class="ellipsis2">' + displayText + '</div></a>';
                    }
                    else {
                        markup += '<div class="ellipsis" style="margin-top: 20px; !important;">' + title + '</div></a>';
                    }
                    //markup += '<div class="split-custom-wrapper">';
                    //markup += '<a id="b_delete" data-corners="false" href="#" data-role="button" class="split-custom-button" data-icon="delete" data-theme="a" data-iconpos="notext"></a>';
                    //markup += '<a id="b_edit" data-corners="false" href="#" data-role="button" class="split-custom-button" data-icon="edit" data-theme="a" data-iconpos="notext"></a>';
                    //markup += '</div';
                    markup += '</li>';

                });

                $('#feeditems-ul').empty().append(markup);
                //$(this).removeClass('ui-btn-inner ui-li');
                //$(this).removeClass('ui-btn-inner');
                $('#feeditems-ul').trigger("create"); // *** THIS IS THE KEY ***

                $('#feeditems-ul').listview('refresh');

                //markup = markup + "</ul></nav>";

                //// Inject the list markup into the content element.
                //$content.html(markup);
                //$('#rssfetch-ul2').trigger("create"); // *** THIS IS THE KEY ***

                ////WS needed for scrolling
                //$content.parents('[data-role=page]').page('destroy').page();

                //// Pages are lazily enhanced. We call page() on the page
                //// element to make sure it is always enhanced before we
                //// attempt to enhance the listview markup we just injected.
                //$page.page();

                //// Enhance the listview we just injected.
                //$content.find(":jqmData(role=listview)").listview();

                ////// Now call changePage() and tell it to switch to the page we just modified.
                //$.mobile.changePage($page);

            });



        } //function onSuccess(data)     
        //success: function (data) { 


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


        //$(document).on('click', '.feed_wrapper .rounded-img', function (e) {
        //    //var zurl = $(this).attr("data-params");
        //    alert("aaa");
        //    //$('div#' + $(this).attr('id')).popup("open");
        //    event.preventDefault();
        //});
        $(document).delegate('.feed_wrapper .rounded-img', 'click touchend', function (e, data) {
            event.preventDefault();
            //event.stopPropagation();
            var i = $(this).parents('[data-role=listview] li').data("id");
            var title = $(this).parents('[data-role=listview] li').data("title");
            var url = $(this).parents('[data-role=listview] li').data("url");
            var desc = $(this).parents('[data-role=listview] li').data("desc");
            var feed = $(this).parents('[data-role=listview] li').data("feed");
            var image = $(this).parents('[data-role=listview] li').data("image");
            var author = $(this).parents('[data-role=listview] li').data("author");

            //if (url.indexOf("#search_users") > -1) {
            if ((url === "#search_users") || (url === "#yt_channel")) {
                //alert("YouTube");
                //var search = url.split('|').pop();
                store.set('yt_criteria', {
                    type: 'search_users',
                    start_index: 1,
                    qvalue: author,
                    nb_display: 'std'
                });
                window.location = "./youtube.html";
            }
            else {
                localStorage.setItem("currentfeed", feed);

                if (i == 'undefined') {
                    event.stopPropagation();
                }
                else {
                    if (typeof desc == "undefined")
                        desc = "(No description provided)";

                    var zimage = "<div class=\"center-wrapper\"><img src=\"" + image + "\" alt=\".\" style=\"width:200px;height:auto;max-height:200px;\" /></div>";
                    $("#articlePage .articleinfo").html(zimage + "<p>" + title + "</p><p>" + desc + "</p><p><a href=\"#\" data-params=\"" + url + "\" class=\"viewdata\">" + url + "</a></p>");
                }
                $.mobile.changePage("#articlePage");
            }
        });

        $(document).on('click', '.viewdata', function (e) {
            var zurl = $(this).attr("data-params");
            window.open(zurl, "_system");
            //localStorage.setItem("idata", zurl);
            //var href = "frame.html";
            //event.preventDefault();
            //window.open(href, "_system");
        });

        $(document).on('click', '.linkpopup', function (e) {
            var zurl = $(this).attr("data-params");
            //$('div#' + $(this).attr('id')).popup("open");
            localStorage.setItem("idata", "");
            localStorage.setItem("idata", zurl);
            var href = "frame.html";
            event.preventDefault();
            //$('#container').attr('src', url);
            window.open(href, "_system");
        });

        $(".linkpopup").on({
            popupbeforeposition: function () {
            }
        });

        return this;
    };

})(jQuery);




