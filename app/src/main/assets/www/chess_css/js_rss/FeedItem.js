/* BEGIN: Model for our Url Item */
/* If you have seprate files that use this model then your model in a separate FeedItem.js file */
var FeedItem = function (title, desc, url, id) {
    this.title = title || "";
    this.desc = desc || "";
    this.url = url || "";
    this.id = id || "Feed_" + (new Date()).getTime();
};

FeedItem.prototype.toString = function () {
    return "Title = " + this.title + ", " +
		   "Description = " + this.desc + ", " +
		   "Url = " + this.url + ", " +
		   "ID = " + this.id;
};
/* END: Model for our Url Item */