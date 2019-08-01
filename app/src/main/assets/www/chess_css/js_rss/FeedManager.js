//Singleton Object
var FeedManager = (function () {
    var instance;

    function createObject() {
        var cacheManager = CacheManager.getInstance();
        var URLS_KEY = "feeds";
        var urlMap;

        return {
            getUrls: function () {
                urlMap = cacheManager.get(URLS_KEY) || {};
                return urlMap;
            },
            getUrlDetails: function (urlID) {
                urlMap = cacheManager.get(URLS_KEY) || {};
                return urlMap[urlID];
            },
            saveUrl: function (feedItem) {
                urlMap = cacheManager.get(URLS_KEY) || {};
                urlMap[feedItem.id] = feedItem;
                cacheManager.put(URLS_KEY, urlMap);
            },
            saveUrls: function (arFeedItems) {
                urlMap = cacheManager.get(URLS_KEY) || {};
                for (i = 0; i < arFeedItems.length; i++) {
                    arFeedItems[i].id = "Feed_" + (new Date()).getTime() +i.toString();
                    urlMap[arFeedItems[i].id] = arFeedItems[i];
                }
                cacheManager.put(URLS_KEY, urlMap);
            },
            removeUrl: function (feedItem) {
                urlMap = cacheManager.get(URLS_KEY) || {};
                delete urlMap[feedItem.id];  // thisIsObject[key];
                cacheManager.put(URLS_KEY, urlMap);
            },
            removeAllUrls: function () {
                cacheManager.removeall(URLS_KEY);
            },
            cleanUpResources: function () {
                //use this for audio and video files you want to save
            }
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = createObject();
            }
            return instance;
        }
    };
})();



