/**
 * This file contains common routines across all the pages.
 */
(function () {

    //Use JQM params plugin in order to pass data between pages.
    $(document).bind("pagebeforechange", function (event, data) {
        $.mobile.pageData = (data && data.options && data.options.pageData) ? data.options.pageData : null;
    });

    //Register the back button when the home page loads
    $(document).on("pageinit", "#listPage", function (e) {
        //Handle back button
        document.addEventListener("deviceready", function () {
            document.addEventListener("backbutton", function (e) {
                e.preventDefault();

                navigator.app.backHistory();

            }, false);
        }, false);

    });
})();