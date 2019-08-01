/**
 * youtubeVideoGallery plugin for jquery
 * Simple video gallery for youtube, for more details see http://plugins.jquery.com/youtubevideogallery
 *
 * @author clanceyp
 * @see http://plugins.jquery.com/youtubevideogallery/
 * @version 1.3.0
 *
 */


;(function($) {
"use strict";

    $.fn.extend({
        youtubeVideoGallery:function(options) {
            var version = '1.3.0',
                isLegacyIE = (/\bMSIE [4|5|6|7]/.test(navigator.userAgent)),
                defaults = {
                    assetFolder : '',
                    type : 'search_videos',
                    fancybox : {
                        arrows : false,
                        closeBtn : true,
                        closeEffect : 'fade',
                        helpers : {
                            media : {},
                            buttons : {}
                        },
                        openEffect : 'fade'
                    },
                    forceLegacyIE:false,
                    iframeTemplate:'<iframe title="Youtube video player" id="youtube-videogallery-iframe" style="height:{options.innerHeight}px;width:{options.innerWidth}px;" frameborder="0" src="about:blank" />',
                    innerHeight:344,
                    innerWidth: 286,
                    newWindow: '(opens in a new window)',
                    playButton: 'play-button-red@40.png',
                    plugin:'videopage',
                    style:'',
                    title:'default',
                    description:'default',
                    thumbWidth:116,
                    videos:[],
                    urlImg : 'http://img.youtube.com/vi/$id/0.jpg',
                    urlEmbed : 'http://www.youtube.com/embed/$id',
                    urlLink : 'http://www.youtube.com/watch?v=$id'
                };

            this.test = {};
            this.version = version;

            function log(message){
                if ('console' in window && window.console.log){
                    window.console.log(message);
                }
            }
            function getVideoLinks($this){
                var arr = [],
                    a = $this.find("a");
                a.each(function(i, el){
                    arr.push({
                        id: getId( $(el).attr('href') ),
                        title:$(el).text()
                    });
                });
                return arr;
            }
            function getIdFromEntry(obj){
                if (typeof obj === 'string'){
                    return getId(obj);
                } else if (obj.id && typeof obj.id === 'string'){
                    return obj.id;
                } else if (obj.link && obj.link.length ){
                    for ( var i = 0, l = obj.link.length; i < l ; i++){
                        if (obj.link[i].type === 'text/html'){
                            return getId(obj.link[i].href)
                        }
                    }
                }
                //log('could not find ID from object, maybe an unsupported API?')
                return '';
            }
            function getId(href){
                var id = '';
                if (!!href && href.indexOf('www.youtube.com/v/') > 0) {
                    id = getBefore(href.split('www.youtube.com/v/')[1], '?')
                } else if (!!href && href.indexOf('/embed/') > 0){
                    id = getBefore(href.split('/embed/')[1], '?');
                } else if (!!href && href.indexOf('?v=') > 0){// this could be version if API call!!
                    id = getBefore(href.split('?v=')[1],'&');
                } else if (!!href && href.indexOf('video:') > 0){
                    id = getBefore(href.split('video:')[1], ':');
                } else if (!!href){
                    id = href;
                }
                return id;
            }
            function getBefore(str, before){
                if (!!str && str.indexOf(before)){
                    str = str.split(before)[0];
                }
                return str;
            }
            function getIframeTemplate(innerWidth, innerHeight){
                var str = options.iframeTemplate;
                return str.replace('{options.innerHeight}', innerHeight).replace('{options.innerWidth}', innerWidth);
            }
            function open(e){
                var el = e.currentTarget;
                e.preventDefault();
                $('div.youtube-videogallery-bodycover').css( { 'height':$(document).height()} );
                $('div.youtube-videogallery-display').css({
                    'marginLeft':-options.innerWidth/2,
                    'marginTop':-options.innerHeight/2
                });
                $('#youtube-videogallery-iframe').attr( 'src', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) );
                $('body').addClass('youtube-videogallery-active');
            }
            function close(e){
                $('#youtube-videogallery-iframe').attr( 'src', 'about:blank');
                $('body').removeClass('youtube-videogallery-active');
            }
            function setButtonMargin(w, h, context){
                if (w === 0 || h === 0){
                    $(context).find("img.youtube-videogallery-play").remove();
                    return;
                }
                var z = h + 10;
                $(context).find("img.youtube-videogallery-play").css({
                    'marginLeft':-w/2 +'px',
                    'marginTop': z +'px'
                });
            }
            function getStyle(style){
                if (!!style){
                    return "youtube-videogallery-" + style;
                }
                return '';
            }
            function getTitleStyle(title){
                return title === 'full' ? 'youtube-videogallery-allowtitle' : '';
            }

            //BILL SERGIO: Convert duration in seconds to time format
            function toHHMMSS(d) {
                var time = "";
                var sec_num = parseInt(d, 10); // don't forget the second param
                if ( (sec_num != undefined) && (sec_num != null) && (sec_num > -1) ) {
                    var hours   = Math.floor(sec_num / 3600);
                    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                    var seconds = sec_num - (hours * 3600) - (minutes * 60);

                    if (hours   < 10) {hours   = "0"+hours;}
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    time = hours+':'+minutes+':'+seconds;
                }
                if(time == 'undefined') {
                    time = '';
                }
                return time;
            }


            function getVideosFromFeed(data){
                var videos = [];
                var items = (data && data.data && data.data.items) ? data.data.items : (data && data.feed && data.feed.entry) ? data.feed.entry : [];
                          
                $( items ).each(function(i, item){
                    var id = getIdFromEntry(item);
                    var strDuration = toHHMMSS(item.duration);
                    //var x = 'Success!';
                    //try {
                    //    x = item.toString();
                    //    alert(x);
                    //}
                    //catch(err) {
                    //        x = "shit";
                    //}


//                    var _updated;
//                    try {
//                        _updated = item.updated.$t
//                    } catch (g) {
//                        _updated = '';
//                    }

//                    var _thumbs;
//                    try {
//                        _thumbs = item.media$group.media$thumbnail
//                    } catch (e) {
//                        _thumbs = '';
//                    }

//                    var _duration;
//                    try {
//                        _duration = item.media$group.yt$duration.seconds
//                    } catch (p) {
//                        _duration = '';
//                    }

//                    var _favCount;
//                    try {
//                        _favCount = item.yt$statistics.favoriteCount
//                    } catch (x) {
//                        _favCount = '';
//                    }

//                    var _viewCount;
//                    try {
//                        _viewCount = item.yt$statistics.viewCount
//                    } catch (y) {
//                        _viewCount = '';
//                    }

//                    var _category;
//                    try {
//                        _category = item.media$group.media$category.$t
//                    } catch (z) {
//                        _category = '';
//                    }

//                    var _description;
//                    try {
//                        _description = item.media$group.media$description.$t
//                    } catch (A) {
//                        _description = '';
//                    }

//                    var _keywords;
//                    try {
//                        _keywords = item.media$group.media$keywords.$t
//                    } catch (B) {
//                        _keywords = '';
//                    }



                    videos.push({
                        id: id,
                        category: item.category.$t || item.category,
                        title: item.title.$t || item.title,
                        description: item.description.$t || item.description,
                        duration: strDuration
                    });

                });
               
                return videos;
            }

            /**
             * this.test = object
             *
             * Test object to expose private methods to a test API.
             * This allows us to test private methods, without
             * exposing them (e.g. they can't be overwritten)
             *
             */
            this.test = {
                getBefore:getBefore,
                getId:getId,
                getVideoLinks:getVideoLinks,
                getIframeTemplate:getIframeTemplate,
                getTitleStyle:getTitleStyle,
                getStyle:getStyle,
                getVideosFromFeed:getVideosFromFeed,
                getIdFromEntry:getIdFromEntry
            };
            function load($this, options) {

                var videos = ( options.videos.length ) ? options.videos : getVideoLinks($this);
                var html = '';
                var href;
                var src;
                var titleSpan;
                var descriptionSpan;
                var timeSpan = '';
                var video;
                var playButtonSrc = (!!options.assetFolder) ? options.assetFolder +'/'+ options.playButton : options.playButton;
                playButtonSrc = '/youtube/play-button-red@40.png';
                var img = document.createElement('img');

                img.onload = function(){
                    setButtonMargin(this.width, this.height, $this);
                };
                img.onerror = function(){
                    setButtonMargin(0, 0, $this);
                };
                img.src = playButtonSrc+'?'+(new Date());

                for (var i = 0, l = videos.length; i < l; i++){
                    video = videos[i];
                    if (!video.id){continue;}
                    if(video.title === 'https://youtube.com/devicesupport') {
                        continue;
                    }

                    href = options.urlLink.replace("$id", video.id);
                    //href= href + "&modestbranding=1&amp;rel=0";
                    src = options.urlImg.replace("$id", video.id);

                    titleSpan = (!!video.title && options.title !== 'none') ? '<div class="ellipsis">'+ video.title +'</div>' : '';
                    //timeSpan =  '<p class="ui-li-aside">'+ video.duration +'</p>';    
                   
                    //type = video.type;

                    descriptionSpan = '<div class="ellipsis2">(no description)</div>';     
                    if(video.description) {
                        descriptionSpan = '<div class="ellipsis2">' + video.description + '</div>';    
                    }
                    //Blue  #0044CC
                    //Light Blue #3388CC
                    //Red   #BD362F
                    //Green #51A351
                    //Aqua  #2F96B4
                    //Orange #F89406
                    //bgcolors['#0044CC', '#BD362F', '#51A351', '#2F96B4', '#F89406']; //Blue, Red, Green, Aqua, Orange

                    //descriptionSpan REMOVE HTML!

                    html+= '<li data-icon="false" data-role="listview" style="width:100%;display:block;"><a title="'+video.title+'" data-youtube-id="'+ video.id +'" href="'+ href +'" class="youtube-videogallery-link"><div class="imgtime">'+ video.duration +'</div><img  class="ui-li-icon" src="'+ src +'" style="width:'+options.thumbWidth+'px" /></a>' + titleSpan + descriptionSpan + '</li>';
                }

                if(videos.length < 1) {
                    titleSpan = '<div class="ellipsis">No More Videos</div>';
                    descriptionSpan = '<div class="ellipsis2">(no description)</div>';     
                    html = '<li data-icon="false" data-role="listview" style="width:100%;display:block;"><a title="No Videos" data-youtube-id="novideos" href="#novideos" class="novideos-link"><div class="imgtime"></div><img  class="ui-li-icon" src="img_default/novideos.png" style="width:'+options.thumbWidth+'px" /></a>' + titleSpan + descriptionSpan + '</li>';
                }

                $this.empty()
                    .append(html)
                    .addClass('youtube-videogallery-container')
                    .addClass( getStyle( options.style ) )
                    .addClass( getTitleStyle( options.title ) );

                $this.find("a.novideos-link").each(function(i, el){
                    $(el)
                        .attr('href', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) )
                        .attr('aria-controls','youtube-videogallery-iframe')
                        .attr('cboxTitle', '')
                        .attr('boxtype', 'youtube')
                        .colorbox({iframe:true, innerWidth:options.innerWidth, innerHeight:options.innerHeight});
                });

                if (options.plugin === 'videopage'){
                    $this.find("a.youtube-videogallery-link")
                        .attr('href','#')
                        .each(function(i, el){
                            $(el).attr('data-search', $(el).attr('data-youtube-id'));
                        });

                } else if (options.supported && options.plugin === 'colorbox' && $.colorbox){
                    $this.find("a.youtube-videogallery-link").each(function(i, el){
                        $(el)
                            .attr('href', options.urlEmbed.replace("$id", $(el).attr('data-youtube-id') ) )
                            .attr('aria-controls','youtube-videogallery-iframe')
                            .attr('cboxTitle', '')
                            .attr('boxtype', 'youtube')
                            .colorbox({iframe:true, innerWidth:options.innerWidth, innerHeight:options.innerHeight});
                    });
                } else if (options.supported && options.plugin === 'fancybox' && !!$().fancybox){
                    $this.find("a.youtube-videogallery-link").each(function(i, el){
                        $(el)
                            //.attr('rel', 'media-gallery')
                            .attr('rel', 'gal')
                            .attr('title', '')
                            .attr('maxWidth', '800')
                            .attr('maxHeight', '600')
                            .attr('fitToView', true)
                            .attr('width', '99%')
                            .attr('height', '70%')
                            .attr('autoSize', true)
                            .attr('closeClick', false)
                            .attr('openEffect', 'none')
                            .attr('closeEffect', 'none')
                            .fancybox(options.fancybox);
                    });
                } else if (options.supported && options.plugin === 'self'){
                    if (!$('div.youtube-videogallery-bodycover').length){
                        $('body')
                            .append('<div class="youtube-videogallery-bodycover"/>')
                            .append('<div class="youtube-videogallery-display">'+ getIframeTemplate(options.innerWidth, options.innerHeight) +'</div>');
                        $('div.youtube-videogallery-bodycover').on('click',close);
                        $(document).on('keydown', function(e) {
                            if (e.which === 27) {
                                close();
                            }
                        });
                    }
                    $this.find("a.youtube-videogallery-link").on('click',open);  
                } else {
                    $this.find("a.youtube-videogallery-link")
                        .attr('target','_blank')
                        .append('<span class="youtube-videogallery-screen-reader-only">'+options.newWindow+'</span>')
                        .each(function(i, el){
                            $(el).attr('title', $(el).attr('title')+' '+ options.newWindow);
                        });
                }

                $(this).removeClass('ui-btn-inner ui-li');
	            $(this).removeClass('ui-btn-inner');

                //$('#youtube-videogallery').listview('refresh');
                refreshListView();
                return $this;

            }



            $(document).on('click touchend', '.youtube-videogallery-link', function (e) {
                //$('div#movies1 ul li').on('click touchend', function (e) {
                var link = $(this).attr('data-search');
                //var link = $(this).data('search');

                if ((typeof link == 'undefined') || (link == '#') || (link.length < 1)) {
                    return;
                }

                localStorage.setItem('videoid', link);
                var _videoid = localStorage.getItem('videoid');

                var w = $(window).innerWidth() -50;
                var h = (.85) * w;
                $('#yt_player').width(w + 'px');
                $('#yt_player').height(h + 'px');

                //<li><a href="#">Action</a><a href="#" data-id="xxx" style="width:80px;"></a></li>
                //var path = $(this).parent().text();
                $.mobile.changePage("youtube.html#videoPage", { transition: "flip", changeHash: false });

                var ztheme = "theme=dark&amp;";
                if (_themeid_dronestv == "dark") {
	            } else {
                    ztheme = "theme=light&amp;";
	            }

                var z_url = "https://www.youtube.com/embed/" + link + "?rel=0&amp;hd=0&amp;modestbranding=1&amp;fs=1&amp;" + ztheme + "showinfo=0&amp;controls=1&amp;wmode=transparent";
                $("#yt_player").attr("src", z_url);
                $("#videotext").text($(this).parent().text()); 

            });

            //////////////////////////////////////////////////////////////////////////////////////////////////////




            //////////////////////////////////////////////////////////////////////////////////////////////////////
	        function test() {
                //<p><a href="http://www.youtube.com/embed/eaCCkfjPm0o" target="someFrame">Charlie 3</a></p>
	            //window.location = "./index.html#mainPage";
                //$("#someFrame").attr("src", "http://www.youtube.com/embed/eaCCkfjPm0o");

                 //changePage("#playerPage", "flip", true, false);
	        }


            // Set options
            options =  $.extend(defaults, options);
            options.supported = (
            /* don't show lightbox if: old untested jquery version, or the lightbox is bigger than the viewport */
                    !!$().on &&
                    ( $(window).width() > options.innerWidth || $(window).height() > options.innerHeight)
                );
            options.plugin = (isLegacyIE && !options.forceLegacyIE) ? 'none' : options.plugin;// by default turn off plugins for IE<=7

            // it's an API, load promise and return the original object for chaining
            //WS
            if (!!options.apiUrl){
                var $this = this,
                    apiUrl = options.apiUrl,
                    jqxhr = $.ajax({
                        url:apiUrl,
                        dataType:"jsonp",
                        beforeSend:function(){
                            if (!options.apiFallbackUrl){
                                return;
                            }
                            $this.each(function(i, el){
                                $(el).empty()
                                    .append('<li><a /></li>')
                                    .find('a')
                                    .attr('href', options.apiFallbackUrl)
                                    .text(options.apiFallbackUrl);
                            });
                        }})
                        .done(function(data) {
                            options.videos = getVideosFromFeed(data);
                            $this.each(function(i, el){
                               load($(el), options);
                            });
                        })
                        .fail(function(){
                            //log('Error getting youtube API requested by jQuery.youtubeVideoGallery: '+ apiUrl);
                        });

                        //alert("Eureka!");
                        //$this.parents('[data-role=page]').page('destroy').page();
                        //$('#youtube-videogallery').listview('refresh');      
                        //$.mobile.silentScroll(0);                  
                        return $this;
            }
            return this.each(function(i, el){
                load($(el), options);
            });

        }       
    }); //

})(window.jQuery);



//var columnWidth = 450; // width of your content column - any
//var defaultVideoWidth = 400; // theme tag width - 400,500
//var increaseRatio = columnWidth / defaultVideoWidth;

//var iframe = $("iframe", this);
//if (iframe.length > 0) {
//var currHeight = iframe.height();
//var newHeight = currHeight * increaseRatio;
//iframe.height(newHeight).width(columnWidth);
//} else {
//var object = $("object", this);
//var embed = $("embed", object);
//var currHeight = object.attr('height');
//var newHeight = currHeight * increaseRatio;
//object.width(columnWidth).attr('height', newHeight);
//embed.width(columnWidth).attr('height', newHeight);
//};




