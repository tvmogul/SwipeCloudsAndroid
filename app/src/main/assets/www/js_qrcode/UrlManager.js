//Singleton Object
var UrlManager = (function () {
    var instance;

    function createObject() {
        var cacheManager = CacheManager.getInstance();
        var URLS_KEY = "urls";
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
            saveUrl: function (urlItem) {
                urlMap = cacheManager.get(URLS_KEY) || {};
                urlMap[urlItem.id] = urlItem;
                cacheManager.put(URLS_KEY, urlMap);
            },
            saveUrls: function (arUrlItems) {
                urlMap = cacheManager.get(URLS_KEY) || {};
                for (i = 0; i < arUrlItems.length; i++) {
                    arUrlItems[i].id = "Url_" + (new Date()).getTime() +i.toString();
                    urlMap[arUrlItems[i].id] = arUrlItems[i];
                }
                cacheManager.put(URLS_KEY, urlMap);
            },
            removeUrl: function (urlItem) {
                urlMap = cacheManager.get(URLS_KEY) || {};
                delete urlMap[urlItem.id];  // thisIsObject[key];
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



