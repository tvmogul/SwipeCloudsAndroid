package com.sergioapps.swipeclouds;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.View;

import android.content.DialogInterface;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.ActivityManager;
import android.app.DownloadManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.v4.content.ContextCompat;
import android.support.v4.app.NotificationCompat;
import android.text.Html;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.math.BigInteger;
import java.net.URLDecoder;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.sergioapps.userdata.DeviceUuidFactory;

import android.app.ProgressDialog;

import com.sergioapps.utils.CheckForStuff;

import android.os.AsyncTask;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

//import okhttp3.MediaType;
//import okhttp3.OkHttpClient;
//import okhttp3.Request;
//import okhttp3.RequestBody;
//import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    boolean isReloading = false;

    static boolean BOOL_JSCRIPT     = ConfigWebView.BOOL_JSCRIPT;
    static boolean BOOL_FUPLOAD     = ConfigWebView.BOOL_FUPLOAD;
    static boolean BOOL_CAMUPLOAD   = ConfigWebView.BOOL_CAMUPLOAD;
    static boolean BOOL_ONLYCAM		= ConfigWebView.BOOL_ONLYCAM;
    static boolean BOOL_MULFILE     = ConfigWebView.BOOL_MULFILE;
    static boolean BOOL_LOCATION    = ConfigWebView.BOOL_LOCATION;
    static boolean BOOL_RATINGS     = ConfigWebView.BOOL_RATINGS;
    static boolean BOOL_PBAR        = ConfigWebView.BOOL_PBAR;
    static boolean BOOL_ZOOM        = ConfigWebView.BOOL_ZOOM;
    static boolean BOOL_SFORM       = ConfigWebView.BOOL_SFORM;
    static boolean BOOL_OFFLINE		= ConfigWebView.BOOL_OFFLINE;
    static boolean BOOL_EXTURL		= ConfigWebView.BOOL_EXTURL;

    //Configuration variables
    private static String CONFIG_URL      = ConfigWebView.CONFIG_URL;
    private static String CONFIG_F_TYPE   = ConfigWebView.CONFIG_F_TYPE;

    public static String CONFIG_HOST		= web_host(CONFIG_URL);

    //Careful with these variable names if altering
    WebView swipeclouds_view;
    ProgressBar web_progress;
    TextView web_loading_text;
    NotificationManager web_notification;
    Notification web_notification_new;

    private String web_cam_message;
    private ValueCallback<Uri> web_file_message;
    private ValueCallback<Uri[]> web_file_path;
    private final static int web_file_req = 1;

    private final static int loc_perm = 1;
    private final static int file_perm = 2;

    int PERMISSION_ALL = 1;
    String[] PERMISSIONS = {
        Manifest.permission.GET_ACCOUNTS,
        Manifest.permission.GET_ACCOUNTS_PRIVILEGED,
        Manifest.permission.READ_PHONE_NUMBERS,
        Manifest.permission.WRITE_SETTINGS,
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.ACCOUNT_MANAGER,
        Manifest.permission.READ_CONTACTS,
        Manifest.permission.WRITE_CONTACTS,
        Manifest.permission.WRITE_EXTERNAL_STORAGE,
        Manifest.permission.READ_SMS,
        Manifest.permission.CAMERA,
        Manifest.permission.CAMERA,
        Manifest.permission.INSTALL_SHORTCUT,
        Manifest.permission.UNINSTALL_SHORTCUT,
        Manifest.permission.INTERNET,
        Manifest.permission.ACCESS_NETWORK_STATE,
        Manifest.permission.ACCESS_WIFI_STATE,
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.WRITE_EXTERNAL_STORAGE,
        Manifest.permission.VIBRATE,
        Manifest.permission.CAMERA,
        Manifest.permission.RECORD_AUDIO,
        Manifest.permission.CHANGE_WIFI_STATE,
        Manifest.permission.ACCESS_WIFI_STATE,
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.ACCESS_COARSE_LOCATION,
        Manifest.permission.ACCESS_LOCATION_EXTRA_COMMANDS,
        Manifest.permission.READ_PHONE_STATE,
        Manifest.permission.READ_CONTACTS,
        Manifest.permission.GET_ACCOUNTS,
        Manifest.permission.ACCESS_NETWORK_STATE,
        Manifest.permission.BLUETOOTH,
        Manifest.permission.BROADCAST_STICKY,
        Manifest.permission.CHANGE_NETWORK_STATE,
        Manifest.permission.CHANGE_WIFI_MULTICAST_STATE,
        Manifest.permission.DISABLE_KEYGUARD,
        Manifest.permission.EXPAND_STATUS_BAR,
        Manifest.permission.READ_SMS,
        Manifest.permission.RECEIVE_MMS,
        Manifest.permission.RECEIVE_SMS,
        Manifest.permission.RECEIVE_WAP_PUSH,
        Manifest.permission.WRITE_CONTACTS,
        Manifest.permission.READ_PHONE_STATE
    };

    private SecureRandom random = new SecureRandom();

    private static final String TAG = com.sergioapps.swipeclouds.MainActivity.class.getSimpleName();

    //public com.sergioapps.userdata.DeviceUuidFactory myFactory;
    public String _appid = "";
    String appdata = "";
    public DeviceUuidFactory myGuid;

    //public DeviceUuidFactory myGuid;
    public String _firstRun = "0";

    private JsHandler _jsHandler;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        if (Build.VERSION.SDK_INT >= 21) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            //getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimary));
            Uri[] results = null;
            if (resultCode == Activity.RESULT_OK) {
                if (requestCode == web_file_req) {
                    if (null == web_file_path) {
                        return;
                    }
                    if (intent == null || intent.getData() == null) {
                        if (web_cam_message != null) {
                            results = new Uri[]{Uri.parse(web_cam_message)};
                        }
                    } else {
                        String dataString = intent.getDataString();
                        if (dataString != null) {
                            results = new Uri[]{ Uri.parse(dataString) };
                        } else {
                            if(BOOL_MULFILE) {
                                if (intent.getClipData() != null) {
                                    final int numSelectedFiles = intent.getClipData().getItemCount();
                                    results = new Uri[numSelectedFiles];
                                    for (int i = 0; i < numSelectedFiles; i++) {
                                        results[i] = intent.getClipData().getItemAt(i).getUri();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            web_file_path.onReceiveValue(results);
            web_file_path = null;
        } else {
            if (requestCode == web_file_req) {
                if (null == web_file_message) return;
                Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
                web_file_message.onReceiveValue(result);
                web_file_message = null;
            }
        }
    }

    @SuppressLint({"SetJavaScriptEnabled", "WrongViewCast"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.w("READ_PERM = ",Manifest.permission.READ_EXTERNAL_STORAGE);
        Log.w("WRITE_PERM = ",Manifest.permission.WRITE_EXTERNAL_STORAGE);
        //Prevent the app from being started again when it is still alive in the background
        if (!isTaskRoot()) {
            finish();
            return;
        }

        setContentView(R.layout.activity_main);

        if (BOOL_PBAR) {
            web_progress = findViewById(R.id.web_progress);
        } else {
            findViewById(R.id.web_progress).setVisibility(View.GONE);
        }
        //WS
        web_loading_text = findViewById(R.id.title_view);
        Handler handler = new Handler();

        //Launching app rating request
        if (BOOL_RATINGS) {
            handler.postDelayed(new Runnable() { public void run() { get_rating(); }}, 1000 * 60); //running request after few moments
        }

        if(!hasPermissions(this, PERMISSIONS)){
            ActivityCompat.requestPermissions(this, PERMISSIONS, PERMISSION_ALL);
        }

        //Getting basic device information
        get_info();

        //try {
        //    myGuid = new DeviceUuidFactory(this);
        //    appdata = myGuid.getAppData();
        //    _firstRun = myGuid.getFirstRun();
        //    String strUserData = myGuid.getUserData();
        //    Toast.makeText(getApplicationContext(), strUserData, Toast.LENGTH_LONG).show();
        //}
        //catch (Exception e) {
        //    e.printStackTrace();
        //}

        // For testing
        //super.loadUrl("file:///android_asset/www/assets/init.html?" + appdata);
        //super.onResume();
        // It is not necessary to thread this since "postUrl" is already threaded!
        //final String appdata = "appid=77777777-0000-0000-0000-000000000000&appname=WW01&appversion=1|1.0&sdk=10&dn=TOSHIBA&ph=3052546329&email=tvmogul1@yahoo.com&city=Miami&state=FL&ctry=United States&pc=33157&lat=0.0&lng=0.0&fr=1&methodName=installData&jsonp=onRSSLoaded";
        //PostExample example = new PostExample();
        //String response = null;
        //try {
        //    response = example.post("http://www.sergioapps.com/post", appdata);
        //} catch (IOException e) {
        //    e.printStackTrace();
        //}
        //System.out.println(response);

        //Getting GPS location of device if given permission
        if(!check_permission("ACCESS_FINE_LOCATION")){
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, loc_perm);
        }
        get_location();

        swipeclouds_view = findViewById(R.id.swipeclouds_view);

        //Webview settings; defaults are customized for best performance
        WebSettings webSettings = swipeclouds_view.getSettings();

        if(!BOOL_OFFLINE){
            webSettings.setJavaScriptEnabled(BOOL_JSCRIPT);
        }

        // MUST set this for loading of local files like:
        // file:///android_asset (assets) and file:///android_res (resources) directories
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setUseWideViewPort(true);

        webSettings.setSaveFormData(BOOL_SFORM);
        webSettings.setSupportZoom(BOOL_ZOOM);
        webSettings.setGeolocationEnabled(BOOL_LOCATION);

        webSettings.setBuiltInZoomControls(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setDisplayZoomControls(false);
        //webSettings.setSupportZoom(false);
        webSettings.setDefaultTextEncodingName("UTF-8");
        // Setting Local Storage
        webSettings.setDatabaseEnabled(true);
        webSettings.setDomStorageEnabled(true);
        // No Cache
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAppCacheEnabled(true);
        webSettings.setGeolocationEnabled(true);


        swipeclouds_view.setDownloadListener(new DownloadListener() {

            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));

            request.setMimeType(mimeType);
            String cookies = CookieManager.getInstance().getCookie(url);
            request.addRequestHeader("cookie", cookies);
            request.addRequestHeader("User-Agent", userAgent);
            request.setDescription(getString(R.string.dl_downloading));
            request.setTitle(URLUtil.guessFileName(url, contentDisposition, mimeType));
            request.allowScanningByMediaScanner();
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, URLUtil.guessFileName(url, contentDisposition, mimeType));
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            assert dm != null;
            dm.enqueue(request);
            Toast.makeText(getApplicationContext(), getString(R.string.dl_downloading2), Toast.LENGTH_LONG).show();
        }
        });

        //swipeclouds_view.setFocusable(true);
        //swipeclouds_view.setFocusableInTouchMode(true);
        swipeclouds_view.setScrollBarStyle(View.SCROLLBARS_INSIDE_INSET);

        if (Build.VERSION.SDK_INT >= 21) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            /* getWindow().setStatusBarColor(getResources().getColor(R.color.colorPrimaryDark)); */
            swipeclouds_view.setLayerType(View.LAYER_TYPE_HARDWARE, null);
            webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        } else if (Build.VERSION.SDK_INT >= 19) {
            swipeclouds_view.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        }
        swipeclouds_view.setVerticalScrollBarEnabled(false);


        swipeclouds_view.setWebViewClient(new Callback());

        //swipeclouds_view.addJavascriptInterface(new JavaScriptInterface(), "interface");
        _jsHandler = new JsHandler(this, swipeclouds_view);
        swipeclouds_view.addJavascriptInterface(_jsHandler, "JsHandler");

        //Rendering the default URL
        //loadUrl("file:///android_asset/www/assets/init.html?" + appdata);
        //swipeclouds_view("file:///android_asset/assets/tests.html", false);
        swipeclouds_view("file:///android_asset/www/init.html", false);
        /* swipeclouds_view(CONFIG_URL, false); */

        swipeclouds_view.setWebChromeClient(new WebChromeClient() {
            //Handling input[type="file"] requests for android API 16+
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture){
                if(BOOL_FUPLOAD) {
                    web_file_message = uploadMsg;
                    Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                    i.addCategory(Intent.CATEGORY_OPENABLE);
                    i.setType(CONFIG_F_TYPE);
                    if(BOOL_MULFILE) {
                        i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                    }
                    startActivityForResult(Intent.createChooser(i, getString(R.string.fl_chooser)), web_file_req);
                }
            }
            //Handling input[type="file"] requests for android API 21+
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams){
                get_file();
                if(BOOL_FUPLOAD) {
                    if (web_file_path != null) {
                        web_file_path.onReceiveValue(null);
                    }
                    web_file_path = filePathCallback;
                    Intent takePictureIntent = null;
                    if (BOOL_CAMUPLOAD) {
                        takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                        if (takePictureIntent.resolveActivity(MainActivity.this.getPackageManager()) != null) {
                            File photoFile = null;
                            try {
                                photoFile = create_image();
                                takePictureIntent.putExtra("PhotoPath", web_cam_message);
                            } catch (IOException ex) {
                                Log.e(TAG, "Image file creation failed", ex);
                            }
                            if (photoFile != null) {
                                web_cam_message = "file:" + photoFile.getAbsolutePath();
                                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(photoFile));
                            } else {
                                takePictureIntent = null;
                            }
                        }
                    }
                    Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
                    if(!BOOL_ONLYCAM) {
                        contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
                        contentSelectionIntent.setType(CONFIG_F_TYPE);
                        if (BOOL_MULFILE) {
                            contentSelectionIntent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
                        }
                    }
                    Intent[] intentArray;
                    if (takePictureIntent != null) {
                        intentArray = new Intent[]{takePictureIntent};
                    } else {
                        intentArray = new Intent[0];
                    }

                    Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
                    chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
                    chooserIntent.putExtra(Intent.EXTRA_TITLE, getString(R.string.fl_chooser));
                    chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);
                    startActivityForResult(chooserIntent, web_file_req);
                }
                return true;
            }

            //Getting webView rendering progress
            @Override
            public void onProgressChanged(WebView view, int p) {
                if (BOOL_PBAR) {
                    web_progress.setProgress(p);
                    if (p == 100) {
                        web_progress.setProgress(0);
                    }
                }
            }

            // overload the geoLocations permissions prompt to always allow instantly as app permission was granted previously
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                if(Build.VERSION.SDK_INT < 23 || (Build.VERSION.SDK_INT >= 23 && check_permission("ACCESS_FINE_LOCATION"))){
                    // location permissions were granted previously so auto-approve
                    callback.invoke(origin, true, false);
                } else {
                    // location permissions not granted so request them
                    ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, loc_perm);
                }
            }
        });

        if (getIntent().getData() != null) {
            String path = getIntent().getDataString();
            /*
            If you want to check or use specific directories or schemes or hosts

            Uri data        = getIntent().getData();
            String scheme   = data.getScheme();
            String host     = data.getHost();
            List<String> pr = data.getPathSegments();
            String param1   = pr.get(0);
            */
            swipeclouds_view(path, false);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        //Coloring the "recent apps" tab header; doing it onResume, as an insurance
        if (Build.VERSION.SDK_INT >= 23) {
            Bitmap bm = BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher);
            ActivityManager.TaskDescription taskDesc;
            //taskDesc = new ActivityManager.TaskDescription(getString(R.string.app_name), bm, getColor(R.color.colorPrimary));
            //MainActivity.this.setTaskDescription(taskDesc);
        }
        get_location();
    }

    //Setting activity layout visibility
    private class Callback extends WebViewClient {

        //Activity activity;
        //String TAG = "JsHandler";
        //WebView webView;
        //
        ////public com.sergioapps.userdata.DeviceUuidFactory myFactory;
        //public String _appid = "";
        //String appdata = "";
        //public DeviceUuidFactory myGuid;
        //
        ////public DeviceUuidFactory myGuid;
        //public String _firstRun = "0";
        //
        //public Callback(Activity _contxt, WebView _webView) {
        //    activity = _contxt;
        //    webView = _webView;
        //}

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            get_location();
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            //SplashScreen
            findViewById(R.id.web_welcome).setVisibility(View.GONE);
            findViewById(R.id.swipeclouds_view).setVisibility(View.VISIBLE);
        }
        //@Override
        //public void onPageFinished(WebView view, String url) {
        //    Log.i("onPageFinished-->", url);
        //    isReloading = false;
        //    if (!isViewAttached()) {
        //        return;
        //    }
        //    handler.removeCallbacks(hideLoader);
        //    handler = new Handler();
        //    handler.postDelayed(hideLoader, 2000);
        //    view.setWebContentsDebuggingEnabled(true);
        //    view.setWebChromeClient(new WebChromeClient());
        //    view.evaluateJavascript("javascript:document.getElementById('username').value= '"+OkHttpUtil.mLogin+"'; document.getElementById('password').value= '"+OkHttpUtil.mPassword+"';postOk();", new ValueCallback<String>() {
        //        @Override
        //        public void onReceiveValue(String s) {
        //
        //        }
        //    });
        //}

        //For android below API 23 @SuppressWarnings("deprecation")
        @Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            Toast.makeText(getApplicationContext(), getString(R.string.went_wrong), Toast.LENGTH_SHORT).show();
            swipeclouds_view("file:///android_res/raw/error.html", false);
        }

        ////Overriding webview URLs
        //@SuppressWarnings("deprecation")
        //@Override
        //public boolean shouldOverrideUrlLoading(WebView view, String url) {
        //    try {
        //        return url_actions(view, url);
        //    } catch (IOException e) {
        //        e.printStackTrace();
        //    }
        //    return false;
        //}

        // You need to override all the methods called "shouldOverrideUrlLoading."
        // The shouldOverrideUrlLoading(WebView view, String url) method is deprecated in API 24
        // and the shouldOverrideUrlLoading(WebView view, WebResourceRequest request) method is
        // added in API 24. If you are targeting older versions of android, you need the former
        // method, and if you are targeting 24 (or later, if someone is reading this in distant
        // future) it's advisable to override the latter method as well.
        @TargetApi(Build.VERSION_CODES.N)
        @SuppressWarnings("deprecation")
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            isReloading = true;
            try {
                url_actions(view, request.getUrl().toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
            return true;
        }
    }

    //Actions based on shouldOverrideUrlLoading
    //public boolean url_actions(WebView view, String url){
    private void url_actions(WebView view, String url) throws IOException {

        if (!BOOL_OFFLINE && !DetectConnection.isInternetAvailable(MainActivity.this)) {
            //Show toast error if not connected to the network
            Toast.makeText(getApplicationContext(), getString(R.string.check_connection), Toast.LENGTH_SHORT).show();

        } else if (url.startsWith("close:")) {
            //Use this in a hyperlink to exit your app :: href="close:"
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addCategory(Intent.CATEGORY_HOME);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            //startActivity(intent);
            view.getContext().startActivity(intent);

        } else if (url.startsWith("exit:")) {
            //Use this in a hyperlink to execute a HARD exit from app :: href="exit:"
            exitApp(view);

        } else if (url.startsWith("refresh:")) {
            //Use this in a hyperlink to redirect back to default URL :: href="refresh:android"
            //swipeclouds_view(CONFIG_URL, false);
            //OR...
            String newString = url.replace("refresh:", "");
            view.loadUrl(newString);

        } else if (url.startsWith("mailto:")) {
            //By overriding this interface you can use any server to send an email
            view.getContext().startActivity(new Intent(Intent.ACTION_SENDTO, Uri.parse(url)));

        } else if (url.startsWith("tel:")) {
            //Use this in a hyperlink to launch default phone dialer for specific number :: href="tel:+17862505136"
            Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse(url));
            view.getContext().startActivity(intent);
//
//        } else if (url.startsWith("msg:")) {
//            //"toast:" + msg;
//            String newString = url.replace("msg:","");
//            Toast.makeText(view.getContext(), newString, Toast.LENGTH_SHORT).show();
//            //showToast(context, newString);
//            //return data back to JavaScript function
//            //class JsObject {
//            //    @JavascriptInterface
//            //    public String toString() { return "injectedObject"; }
//            //}
//            //view.getSettings().setJavaScriptEnabled(true);
//            //view.addJavascriptInterface(new JsObject(), "injectedObject");
//            //view.loadData("", "text/html", null);
//            //view.loadUrl("javascript:alert(injectedObject.toString())");
//
//        } else if (url.startsWith("share:")) {
//            String htmlDocument = url.replace("share:","");
//            Intent sharingIntent = new Intent(Intent.ACTION_SEND);
//            sharingIntent.setType("text/html");
//            sharingIntent.putExtra(Intent.EXTRA_TEXT, Html.fromHtml(htmlDocument));
//            view.getContext().startActivity(Intent.createChooser(sharingIntent,"Share using"));
//
//        } else if (url.startsWith("map:")) {
//            //"map:" + URL
//            String newString = url.replace("map:","");
//            Uri gmmIntentUri = Uri.parse(newString); //Uri.parse("geo:37.7749,-122.4194");
//            Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
//            mapIntent.setPackage("com.google.android.apps.maps");
//            if (mapIntent.resolveActivity(getPackageManager()) != null) {
//                view.getContext().startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(newString)));
//            }
//            //String[] arrOfStr = newString.split("|");
//            //for (String a : arrOfStr){ }
//            //String lat = "";
//            //String lng = "";
//            //String addr = "";
//            //try { lat = arrOfStr[0]; lng = arrOfStr[1]; addr = arrOfStr[2]; }
//            //catch(Exception ex){ }
//
//        } else if (url.startsWith("addr:")) {
//            //"addr:" + addr
//            String addr = url.replace("addr:","");
//            view.getContext().startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(addr)));
//
//        } else if (url.startsWith("printnow:")) {
//            //class="not-printable" remove all div's with this class!
//            String jobName = url.replace("print:", "");
//            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) {
//                //new UIHelper(this).showToast("Printing NOT supported below KitKat!");
//                return;
//            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//                // Get a PrintManager instance
//                PrintManager printManager = (PrintManager) view.getContext().getSystemService(Context.PRINT_SERVICE);
//                if (printManager != null) {
//                    // Get a print adapter instance
//                    PrintDocumentAdapter printAdapter;
//                    //PrintAttributes printAttributes = new PrintAttributes.Builder().build();
//                    PrintAttributes.Builder builder = new PrintAttributes.Builder();
//                    builder.setMediaSize(PrintAttributes.MediaSize.ISO_A4);
//                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//                        printAdapter = view.createPrintDocumentAdapter(jobName);
//                        printManager.print(jobName, printAdapter, builder.build());
//                    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//                        //noinspection deprecation
//                        printAdapter = view.createPrintDocumentAdapter();
//                        printManager.print(jobName, printAdapter, builder.build());
//                    } else {
//                        //to satisfy lint
//                        return;
//                    }
//                } else {
//                    Log.e(getClass().getName(), "ERROR: Method called on too low Android API version");
//                }
//            }
//
//        } else if (url.startsWith("print:")) {
//            // This saves the screen of the browser to a pdf file
//            // class="not-printable" remove all div's with this class!
//            // We pass in jobName of file WITHOUT .pdf extension
//            String jobName = url.replace("print:", "");
//            String spath = Environment.getExternalStorageDirectory() + File.separator + "ARC";
//            final String fileName = jobName + ".pdf";
//            final String filePath = spath + File.separator + jobName + ".pdf";
//            File path = new File(spath);
//            if(!(new CheckForStuff()).dir_exists(spath)){
//                path = new File(spath);
//                // The File.mkdirs() method will create all needed directories;
//                // mkdir() will only create the last directory in the pathname.
//                boolean success = path.mkdirs();
//                Log.e(getClass().getName(), success ? "ARC Directory Has Been Created!" : "ARC Directory NOT Created!");
//            }
//
//            final ProgressDialog progressDialog = new ProgressDialog(view.getContext());
//            progressDialog.setMessage("Please wait");
//            progressDialog.show();
//
//            PdfView.createWebPrintJob((Activity)view.getContext(), view, path, jobName, new PdfView.Callback() {
//
//                public void success(String path) {
//                    progressDialog.dismiss();
//                    //PdfView.openPdfFile((Activity)context.getApplicationContext(),"PDF Saved",
//                    //"Do you want to open saved pdf file?" + fileName, filePath);
//                    //showToast(context, "PDF File: " + fileName + " Saved Successfully!");
//                    try {
//                        Toast.makeText(getApplicationContext(), "Downloaded Successfully (Documents are present in \"Print Files\" menu)", Toast.LENGTH_SHORT).show();
//                    } catch (Exception e) {
//                        //Log.i("ZEBRA", e.getMessage().toString());
//                    }
//                }
//                public void failure() {
//                    progressDialog.dismiss();
//                }
//            });
//
//        } else if (url.startsWith("rate:")) {
//            //Use this to open your apps page on google play store app :: href="rate:android"
//            final String app_package = getPackageName(); //requesting app package name from Context or Activity object
//            try {
//                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + app_package)));
//            } catch (ActivityNotFoundException anfe) {
//                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + app_package)));
//            }
//
//        } else if (url.startsWith("pdffiles:")) {
//            String pathDirectoryDownloads = (Environment.DIRECTORY_DOWNLOADS);
//            //String pathExternalStorageDirectory = (Environment.getExternalStorageDirectory()).toString();
//            String htmlPdfFiles= createPdfsTable(pathDirectoryDownloads);
//            String html = "<html><body>Hello, World!<br />Hello, World!<br />Hello, World!<br />Hello, World!<br />Hello, World!<br /></body></html>";
//            String baseUrl    = "file:///android_asset/";
//            String mimeType   = "text/html";
//            String encoding   = "UTF-8";
//            String historyUrl = "http://www.yahoo.com/";
//            view.loadDataWithBaseURL(baseUrl, htmlPdfFiles, mimeType, encoding, historyUrl);
//
//        } else if (url.contains(".pdf")) {
//            String url2 = URLDecoder.decode(url, "UTF-8");
//            String url3 = url2.substring(0, url2.lastIndexOf('?'));
//            String jobName = url3.substring(url3.lastIndexOf('/'));
//            String spath = Environment.getExternalStorageDirectory() + File.separator + "ARC";
//
//            String test = jobName;
//            if(test.contains(".pdf.pdf")){
//                jobName = test.replace(".pdf.pdf", ".pdf");
//            }
//
//            if(!jobName.contains(".pdf")){
//                jobName = jobName + ".pdf";
//            }
//
//            //Removes all slashes from file name!
//            final String noSlashes = jobName.replaceAll("\\/", "");
//            final String fileName = noSlashes;
//            final String filePath = spath + File.separator + noSlashes;
//            File path;
//            if(!(new CheckForStuff()).dir_exists(spath)){
//                path = new File(spath);
//                boolean success = path.mkdirs();
//            }
//            new DownloadFile().execute(url3, fileName, filePath);
//
//        } else if (url.startsWith("viewpdfs:")) {
//            Intent intent = new Intent(MainActivity.this, PdfViewActivity.class);
//            startActivity(intent);
//
//        } else if (url.startsWith("msglong:")) {
//            String newString = url.replace("toast:", "");
//            showToast(getApplicationContext(), newString);
//
//        } else if (BOOL_EXTURL && !web_host(url).equals(CONFIG_HOST)) {
//            //Opening external URLs in android default web browser
//            swipeclouds_view(url,true);

        } else {
            view.loadUrl(url);
        }
    }

    // Here is how it works: the countdown has a notification time shorter than the duration
    // for which the toast is displayed according to the flag, so the toast can be shown again
    // if the countdown is not finished. If the toast is shown again while it is still on screen,
    // it will stay there for the whole duration without blinking. When the countdown is finished,
    // the toast is cancelled to hide it even if its display duration is not over.
    // This works even if the toast must be shown for a duration shorter than the default duration:
    // the first toast displayed will simply be cancelled when the countdown is finished.
    private Toast mToastToShow;
    public void showToast(Context ctx, String msg) {
        // Set the toast and duration
        int toastDurationInMilliSeconds = 10000;
        mToastToShow = Toast.makeText(ctx, msg, Toast.LENGTH_LONG);

        // Set the countdown to display the toast
        CountDownTimer toastCountDown;
        toastCountDown = new CountDownTimer(toastDurationInMilliSeconds, 1000 /*Tick duration*/) {
            public void onTick(long millisUntilFinished) {
                mToastToShow.show();
            }
            public void onFinish() {
                mToastToShow.cancel();
            }
        };

        // Show the toast and starts the countdown
        mToastToShow.show();
        toastCountDown.start();
    }

    //private final Runnable hideLoader = new Runnable() {
    //    public void run() {
    //        try {
    //            if (!isReloading && getMvpView() != null && getMvpView().isShowing()) {
    //                getMvpView().hideLoading();
    //            }
    //        } catch (Exception e) {
    //            e.printStackTrace();
    //        }
    //    }
    //};

    private static String removeCharAt(String s, int i) {
        StringBuffer buf = new StringBuffer(s.length() -1);
        buf.append(s.substring(0, i)).append(s.substring(i+1));
        return buf.toString();
    }
    private static String removeChar(String s, char c) {
        StringBuffer buf = new StringBuffer(s.length());
        buf.setLength(s.length());
        int current = 0;
        for (int i=0; i<s.length(); i++){
            char cur = s.charAt(i);
            if(cur != c) buf.setCharAt(current++, cur);
        }
        return buf.toString();
    }
    private static String replaceCharAt(String s, int i, char c) {
        StringBuffer buf = new StringBuffer(s);
        buf.setCharAt(i, c);
        return buf.toString();
    }
    private static String deleteAllNonDigit(String s) {
        String temp = s.replaceAll("\\D", "");
        return temp;
    }
    private static String replaceAllChar(String s, String f, String r){
        String temp = s.replace(f ,r);
        return temp;
    }

    private class DownloadFile extends AsyncTask<String, Void, Void>{

        protected Void doInBackground(String... strings) {
            String fileUrl = strings[0];
            String fileName = strings[1];
            String filePath = strings[2];

            File pdfFile = new File(filePath);

            try{
                pdfFile.createNewFile();
            }catch (IOException e){
                e.printStackTrace();
            }
            FileDownloader.downloadFile(fileUrl, pdfFile);
            return null;
        }

        protected void onPostExecute(Void result) {
            try {
                Toast.makeText(getApplicationContext(), "Downloaded Successfully (Documents are present in \"Print Files\" menu)", Toast.LENGTH_SHORT).show();
                Log.i("ZEBRA", "onPostExecute PDF Download Fired!");
            } catch (Exception e) {
                //Log.i("ZEBRA", e.getMessage().toString());
            }
            //super.onPostExecute(result);
        }
    }

    /**
     * The FileDownloader class is specific for downing .pdf files.
     */
    public static class FileDownloader {
        private static final int  MEGABYTE = 1024 * 1024;

        public static void downloadFile(String fileUrl, File directory){
            try {

                URL url = new URL(fileUrl);
                HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
                urlConnection.connect();

                InputStream inputStream = urlConnection.getInputStream();
                FileOutputStream fileOutputStream = new FileOutputStream(directory);
                int totalSize = urlConnection.getContentLength();

                byte[] buffer = new byte[MEGABYTE];
                int bufferLength = 0;
                while((bufferLength = inputStream.read(buffer))>0 ){
                    fileOutputStream.write(buffer, 0, bufferLength);
                }
                fileOutputStream.flush();
                fileOutputStream.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    //Random ID creation function to help get fresh cache every-time webview reloaded
    public String random_id() {
        return new BigInteger(130, random).toString(32);
    }

    //Opening URLs inside webView with request
    void swipeclouds_view(String url, Boolean tab) {
        if (tab) {
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(url));
            startActivity(intent);
        } else {
            // check to see whether the url already has query parameters and handle appropriately.
            if(url.contains("?")){
                url += "&";
            } else {
                url += "?";
            }
            url += "rid="+random_id();
            swipeclouds_view.loadUrl(url);
        }
    }





    //Getting host name
    public static String web_host(String url){
        if (url == null || url.length() == 0) {
            return "";
        }
        int dslash = url.indexOf("//");
        if (dslash == -1) {
            dslash = 0;
        } else {
            dslash += 2;
        }
        int end = url.indexOf('/', dslash);
        end = end >= 0 ? end : url.length();
        int port = url.indexOf(':', dslash);
        end = (port > 0 && port < end) ? port : end;
        Log.w("URL Host: ",url.substring(dslash, end));
        return url.substring(dslash, end);
    }

    //Getting device basic information
    public void get_info(){
        //try {
        //    myGuid = new DeviceUuidFactory(this);
        //    appdata = myGuid.getAppData();
        //    _firstRun = myGuid.getFirstRun();
        //}
        //catch (Exception e) {
        //    e.printStackTrace();
        //}
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.setCookie(CONFIG_URL, "DEVICE=android");
        cookieManager.setCookie(CONFIG_URL, "DEV_API=" + Build.VERSION.SDK_INT);
    }

    //Checking permission for storage and camera for writing and uploading images
    public void get_file(){
        String[] perms = {Manifest.permission.WRITE_EXTERNAL_STORAGE,
                            Manifest.permission.READ_EXTERNAL_STORAGE,
                            Manifest.permission.CAMERA};

        //Checking for storage permission to write images for upload
        if (BOOL_FUPLOAD && BOOL_CAMUPLOAD && !check_permission("WRITE_EXTERNAL_STORAGE") && !check_permission("CAMERA")) {
            ActivityCompat.requestPermissions(com.sergioapps.swipeclouds.MainActivity.this, perms, file_perm);

            //Checking for WRITE_EXTERNAL_STORAGE permission
        } else if (BOOL_FUPLOAD && !check_permission("WRITE_EXTERNAL_STORAGE")) {
            ActivityCompat.requestPermissions(com.sergioapps.swipeclouds.MainActivity.this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE,
                            Manifest.permission.READ_EXTERNAL_STORAGE}, file_perm);

            //Checking for CAMERA permissions
        } else if (BOOL_CAMUPLOAD && !check_permission("CAMERA")) {
            ActivityCompat.requestPermissions(com.sergioapps.swipeclouds.MainActivity.this,
                    new String[]{Manifest.permission.CAMERA}, file_perm);
        }
    }

    //Using cookies to update user locations
    public void get_location(){
        //Checking for location permissions
        if (BOOL_LOCATION && (Build.VERSION.SDK_INT < 23 || check_permission("ACCESS_FINE_LOCATION"))) {
            CookieManager cookieManager = CookieManager.getInstance();
            cookieManager.setAcceptCookie(true);
            com.sergioapps.swipeclouds.GPSTrack gps;
            gps = new com.sergioapps.swipeclouds.GPSTrack(com.sergioapps.swipeclouds.MainActivity.this);
            double latitude = gps.getLatitude();
            double longitude = gps.getLongitude();
            if (gps.canGetLocation()) {
                if (latitude != 0 || longitude != 0) {
                    cookieManager.setCookie(CONFIG_URL, "lat=" + latitude);
                    cookieManager.setCookie(CONFIG_URL, "long=" + longitude);
                    //Log.w("New Updated Location:", latitude + "," + longitude);  //enable to test dummy latitude and longitude
                } else {
                    Log.w("New Updated Location:", "NULL");
                }
            } else {
                show_notification(1, 1);
                Log.w("New Updated Location:", "FAIL");
            }
        }
    }

    //Check permission for function
    public boolean check_permission(String permission){
        switch(permission){
            case "ACCESS_FINE_LOCATION":
                return ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;

            case "WRITE_EXTERNAL_STORAGE":
                return ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;

            case "CAMERA":
                return ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;

            case "READ_PHONE_STATE":
                return ContextCompat.checkSelfPermission(this, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED;

            case "GET_ACCOUNTS":
                return ContextCompat.checkSelfPermission(this, Manifest.permission.GET_ACCOUNTS) == PackageManager.PERMISSION_GRANTED;

        }
        return false;
    }

    //Creating image file for upload
    private File create_image() throws IOException {
        @SuppressLint("SimpleDateFormat")
        String file_name    = new SimpleDateFormat("yyyy_mm_ss").format(new Date());
        String new_name     = "file_"+file_name+"_";
        File sd_directory   = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        return File.createTempFile(new_name, ".jpg", sd_directory);
    }

    //Launching app rating dialog [developed by github.com/hotchemi]
    public void get_rating() {
        if (DetectConnection.isInternetAvailable(com.sergioapps.swipeclouds.MainActivity.this)) {
            com.sergioapps.swipeclouds.AppRate.with(this)
                    .setStoreType(StoreType.GOOGLEPLAY)     //default is Google Play, other option is Amazon App Store
                    .setInstallDays(ConfigWebView.MSG_DAYS)
                    .setLaunchTimes(ConfigWebView.MSG_TIMES)
                    .setRemindInterval(ConfigWebView.MSG_INTERVAL)
                    .setTitle(R.string.rate_dialog_title)
                    .setMessage(R.string.rate_dialog_message)
                    .setTextLater(R.string.rate_dialog_cancel)
                    .setTextNever(R.string.rate_dialog_no)
                    .setTextRateNow(R.string.rate_dialog_ok)
                    .monitor();
            com.sergioapps.swipeclouds.AppRate.showRateDialogIfMeetsConditions(this);
        }
        //for more customizations, look for AppRate and DialogManager
    }

    //Creating custom notifications with IDs
    public void show_notification(int type, int id) {
        long when = System.currentTimeMillis();
        web_notification = (NotificationManager) com.sergioapps.swipeclouds.MainActivity.this.getSystemService(Context.NOTIFICATION_SERVICE);
        Intent i = new Intent();
        if (type == 1) {
            i.setClass(com.sergioapps.swipeclouds.MainActivity.this, com.sergioapps.swipeclouds.MainActivity.class);
        } else if (type == 2) {
            i.setAction(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
        } else {
            i.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            i.addCategory(Intent.CATEGORY_DEFAULT);
            i.setData(Uri.parse("package:" + com.sergioapps.swipeclouds.MainActivity.this.getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            i.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            i.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
        }
        i.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pendingIntent = PendingIntent.getActivity(com.sergioapps.swipeclouds.MainActivity.this, 0, i, PendingIntent.FLAG_UPDATE_CURRENT);

        Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(com.sergioapps.swipeclouds.MainActivity.this, "");
        switch(type){
            case 1:
                builder.setTicker(getString(R.string.app_name));
                builder.setContentTitle(getString(R.string.loc_fail));
                builder.setContentText(getString(R.string.loc_fail_text));
                builder.setStyle(new NotificationCompat.BigTextStyle().bigText(getString(R.string.loc_fail_more)));
                builder.setVibrate(new long[]{350,350,350,350,350});
                builder.setSmallIcon(R.mipmap.ic_launcher);
                break;

            case 2:
                builder.setTicker(getString(R.string.app_name));
                builder.setContentTitle(getString(R.string.loc_perm));
                builder.setContentText(getString(R.string.loc_perm_text));
                builder.setStyle(new NotificationCompat.BigTextStyle().bigText(getString(R.string.loc_perm_more)));
                builder.setVibrate(new long[]{350, 700, 350, 700, 350});
                builder.setSound(alarmSound);
                builder.setSmallIcon(R.mipmap.ic_launcher);
                break;
        }
        builder.setOngoing(false);
        builder.setAutoCancel(true);
        builder.setContentIntent(pendingIntent);
        builder.setWhen(when);
        builder.setContentIntent(pendingIntent);
        web_notification_new = builder.build();
        web_notification.notify(id, web_notification_new);
    }

    //Checking if users allowed the requested permissions or not
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults){
        switch (requestCode){
            case 1: {
                if(grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    get_location();
                }
            }
        }
    }

    //Action on back key tap/click
    @Override
    public boolean onKeyDown(int keyCode, @NonNull KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    if (swipeclouds_view.canGoBack()) {
                        swipeclouds_view.goBack();
                    } else {
                        finish();
                    }
                    return true;
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState ){
        super.onSaveInstanceState(outState);
        swipeclouds_view.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState){
        super.onRestoreInstanceState(savedInstanceState);
        swipeclouds_view.restoreState(savedInstanceState);
    }

    public final void exitApp(WebView view) {
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(view.getContext());
        alertDialogBuilder.setTitle("Exit Application?");
        alertDialogBuilder
                .setMessage("Click yes to exit!")
                .setCancelable(false)
                .setPositiveButton("Yes",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                moveTaskToBack(true);
                                android.os.Process.killProcess(android.os.Process.myPid());
                                System.exit(0); //0 = no errors!
                            }
                        })

                .setNegativeButton("No", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {

                        dialog.cancel();
                    }
                });

        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
    }

    public static boolean hasPermissions(Context context, String... permissions) {
        if (context != null && permissions != null) {
            for (String permission : permissions) {
                if (ActivityCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
                    return false;
                }
            }
        }
        return true;
    }

    private class JavaScriptInterface {
        @JavascriptInterface
        public void callFromJS() {
            try {
                DeviceUuidFactory myGuid = new DeviceUuidFactory(getApplicationContext());
                final String strUserData = myGuid.getUserData();
                appdata = myGuid.getAppData();
                _firstRun = myGuid.getFirstRun();
                Toast.makeText(getApplicationContext(), strUserData, Toast.LENGTH_LONG).show();

            }
            catch (Exception e) {
                e.printStackTrace();
            }
            //Toast.makeText(getApplicationContext(), "JavaScript interface call", Toast.LENGTH_LONG).show();
            //try {
            //    DeviceUuidFactory myGuid = new DeviceUuidFactory(getApplicationContext());
            //    final String strUserData = myGuid.getUserData();
            //    Thread thread1 = new Thread(new Runnable() {
            //        @Override
            //        public void run(){
            //            System.out.println("Task #1 is running");
            //            Toast.makeText(getApplicationContext(), strUserData, Toast.LENGTH_LONG).show(); // Thread-safe.
            //        }
            //    });
            //} catch (UnsupportedEncodingException e) {
            //    // TODO Auto-generated catch block
            //    e.printStackTrace();
            //}
        }
    }

    public String createPdfsTable(String path) {
        String _return = "";

        boolean bEmpty = false;

        //File[] files = new File(Environment.getExternalStorageDirectory() + File.separator + "ARC").listFiles();
        File[] files = new File(path).listFiles(new FilenameFilter() {
            @Override public boolean accept(File dir, String name) {
                return name.endsWith(".pdf");
            }
        });

        StringBuilder sb=new StringBuilder();
        sb.append("<!doctype html>");
        sb.append("<html>");

        sb.append("<head>");
        sb.append("<title>Drive PDF Files</title>");
        sb.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />");
        sb.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />");
        sb.append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
        sb.append("<style type=\"text/css\">");
        sb.append(".body { font-family: Arial, Helvetica, sans-serif;" +
                "            font-size: 1.6em !important;overflow-x: hidden;overflow-y: auto;border-width: 0px !important;}");
        sb.append(".display { font-family: Arial, Helvetica, sans-serif;font-size: 1.8em !important; }");
        sb.append("th { font-family: Arial, Helvetica, sans-serif;font-size: 1.1em !important; }");
        sb.append("td { font-family: Arial, Helvetica, sans-serif;font-size: 1.0em !important; }");
        sb.append("td { padding: 6px 6px 6px 6px !important; }");
        sb.append(".center-wrapper { text-align: center; }");
        sb.append(".center-wrapper * { margin: 0 auto 0 auto; }");
        sb.append("</style>");
        sb.append("</head>");

        sb.append("<body>");
        sb.append("<div class=\"panel center-wrapper\" id=\"print-section\">");
        sb.append("<h2 class=\"display\">Drive Pdf Files</h2><br />");

        sb.append("<table class=\"table\">");
        sb.append("<tr><th class=\"center-wrapper\">Date</th><th class=\"center-wrapper\">File Name</th><th>&nbsp;</th></tr>");

        if (files.length > 0) {
            int i = 0;
            bEmpty = false;
            while (i < files.length) {
                //////////////////////////////////////////////////////////
                sb.append("<tr>");
                sb.append("<td class=\"center-wrapper\">");
                sb.append(new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(Long.valueOf(files[i].lastModified())));
                sb.append("</td>");

                sb.append("<td class=\"center-wrapper\">");
                sb.append(files[i].getName());
                sb.append("</td>");

//                sb.append("<a href=\"printpdf:\" + String.valueOf(pathExternalStorageDirectory + files[i].getName()) + \" target=\"_blank\">print</a> |");
//                sb.append("<a href=\"viewpdf:\" + String.valueOf(pathExternalStorageDirectory + files[i].getName()) + \" target=\"_blank\">print</a> |");
//                sb.append("<a href=\"deletepdf:\" + String.valueOf(pathExternalStorageDirectory + files[i].getName()) + \" target=\"_blank\">print</a> |");

                //<a href="printpdf:" + String.valueOf(pathExternalStorageDirectory + files[i].getName()) + " target="_blank">print</a> |
                //<a href="viewpdf:' + String.valueOf(pathExternalStorageDirectory + files[i].getName()) + '" target="_blank">view</a> |
                //<a href="deletepdf:' + String.valueOf(pathExternalStorageDirectory + files[i].getName()) '" target="_blank">delete</a>

                sb.append("</td>");
                sb.append("</tr>");
                ////////////////////////////////////////////////////////


                i++;
                bEmpty = false;
            }
        }

        sb.append("</table><br />");
        sb.append("<div style=\"text-align: left !important;\">");
        sb.append("<a href=\"javascript:history.go(-1)\" class=\"not-printable\">&laquo; Back</a>");
        sb.append("</div>");
        sb.append("</div>");
        sb.append("</body>");
        sb.append("</html>");

        _return = sb.toString();
        return _return;
    }

    //public static class PostExample {
    //    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    //
    //    OkHttpClient client = new OkHttpClient();
    //
    //    String post(String url, String json) throws IOException {
    //        RequestBody body = RequestBody.create(JSON, json);
    //        Request request = new Request.Builder()
    //                .url(url)
    //                .post(body)
    //                .build();
    //        try (Response response = client.newCall(request).execute()) {
    //            return response.body().string();
    //        }
    //    }
    //}
}






