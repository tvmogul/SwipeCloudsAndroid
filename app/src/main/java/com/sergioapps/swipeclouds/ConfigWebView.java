package com.sergioapps.swipeclouds;

class ConfigWebView {

	//Permission variables
	static boolean BOOL_JSCRIPT     = true;     //enable JavaScript for webview
	static boolean BOOL_FUPLOAD     = true;     //upload file from webview
	static boolean BOOL_CAMUPLOAD   = true;     //enable upload from camera for photos
	static boolean BOOL_ONLYCAM	    = false;	//incase you want only camera files to upload
 	static boolean BOOL_MULFILE     = false;    //upload multiple files in webview
	static boolean BOOL_LOCATION    = true;     //track GPS locations
	static boolean BOOL_RATINGS     = true;     //show ratings dialog; auto configured, edit method get_rating() for customizations
	static boolean BOOL_PBAR        = true;     //show progress bar in app
	static boolean BOOL_ZOOM        = false;    //zoom control for webpages view
	static boolean BOOL_SFORM       = false;    //save form cache and auto-fill information
	static boolean BOOL_OFFLINE     = false;    //whether the loading webpages are offline or online
	static boolean BOOL_EXTURL      = true;     //open external url with default browser instead of app webview

	//Configuration variables  file:///android_res/dir/file.html
	static String CONFIG_URL          = "file:///android_asset/init.html";
	static String CONFIG_F_TYPE       = "*/*";  //to upload any file type using "*/*"; check file type references for more

	//Rating system variables
	static int MSG_DAYS            = 3;        //after how many days of usage would you like to show the dialog
	static int MSG_TIMES           = 10;       //overall request launch times being ignored
	static int MSG_INTERVAL        = 2;        //reminding users to rate after days interval
}
