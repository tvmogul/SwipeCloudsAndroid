package com.sergioapps.swipeclouds;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.annotation.TargetApi;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.sergioapps.userdata.DeviceUuidFactory;
import com.sergioapps.userdata.ObjectItem;

import java.io.UnsupportedEncodingException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import com.google.zxing.*;
//import com.sergioapps.userdata.BarcodeScanner;

/**
 * Class to handle all calls from JS & from Java too
 **/
public class JsHandler
{

    Activity activity;
    String TAG = "JsHandler";
    WebView webView;

    //public com.sergioapps.userdata.DeviceUuidFactory myFactory;
    public String _appid = "";
    String appdata = "";
    public DeviceUuidFactory myGuid;

    //public DeviceUuidFactory myGuid;
    public String _firstRun = "0";

    private final static int loc_perm = 1;
    private final static int file_perm = 2;

    public JsHandler(Activity _contxt, WebView _webView) {
        activity = _contxt;
        webView = _webView;
    }

    /**
     * This function handles call from JS
     */
    @JavascriptInterface
    public void jsFnCall(String jsString) {
        showDialog(jsString);
    }

    /**
     * This function handles call from Android-Java
     */
    @JavascriptInterface
    public void javaFnCall(String jsString) {

        final String webUrl = "javascript:diplayJavaMsg('"+jsString+"')";
        // Add this to avoid android.view.windowmanager$badtokenexception unable to add window
        if(!activity.isFinishing())
            // loadurl on UI main thread
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    webView.loadUrl(webUrl);
                }
            });
    }

    /**
     * function shows Android-Native Alert Dialog
     */
    @JavascriptInterface
    public void showDialog(String msg){

        AlertDialog alertDialog = new AlertDialog.Builder(activity).create();
        alertDialog.setTitle(activity.getString(R.string.app_dialog_title));
        alertDialog.setMessage(msg);
        alertDialog.setButton(DialogInterface.BUTTON_POSITIVE,activity.getString(R.string.ok_text), new DialogInterface.OnClickListener()
        {
            public void onClick(DialogInterface dialog, int which)
            {
                dialog.dismiss();
            }
        });
        alertDialog.setButton(DialogInterface.BUTTON_NEGATIVE,activity.getString(R.string.cancel_text), new DialogInterface.OnClickListener()
        {
            @Override
            public void onClick(DialogInterface dialog, int which)
            {
                dialog.dismiss();
            }
        });
        alertDialog.show();
    }

    //Check permission for function
    public boolean check_permission(String permission){
        switch(permission){
            case "ACCESS_FINE_LOCATION":
                return ContextCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;

            case "WRITE_EXTERNAL_STORAGE":
                return ContextCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;

            case "CAMERA":
                return ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;

            case "READ_PHONE_STATE":
                return ContextCompat.checkSelfPermission(activity, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED;

            case "GET_ACCOUNTS":
                return ContextCompat.checkSelfPermission(activity, Manifest.permission.GET_ACCOUNTS) == PackageManager.PERMISSION_GRANTED;

        }
        return false;
    }

    @JavascriptInterface
    public void getUserData() {
        if (!check_permission("GET_ACCOUNTS")) {
            ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.GET_ACCOUNTS}, file_perm);
        }
        try {
            DeviceUuidFactory myGuid = new DeviceUuidFactory(activity);
            final String strUserData = myGuid.getUserData();
            //appdata = myGuid.getAppData();
            //_firstRun = myGuid.getFirstRun();
            //javaFnCall(appdata);
            //if(!activity.isFinishing())
                // loadurl on UI main thread
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        showDialog(strUserData);
                    }
                });
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

    @JavascriptInterface
    private void doShare(String zdata) {
        //callbackContext.success(zdata);
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, zdata);
        sendIntent.setType("text/plain");
        //cordova.getActivity().startActivity(sendIntent);
        activity.startActivity(Intent.createChooser(sendIntent, "Share"));
    }

    @JavascriptInterface
    private void doNavigate(String location) {
        if (location != null && location.length() > 0) {
            javaFnCall(location);
            Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse("google.navigation:q=" + location));
            activity.startActivity(i);
        } else {
            javaFnCall("Expected one non-empty string argument.");
        }
    }

    @JavascriptInterface
    public boolean displayScanObj(JSONObject args) throws JSONException {

        try {
            final String _SCAN_RESULT = args.getString("TEXT");
            final String _SCAN_RESULT_FORMAT = args.getString("FORMAT");
            final String _CANCELLED = args.getString("CANCELLED");

            String responseText = "SCAN_RESULT: " + _SCAN_RESULT + "\r\n";
            responseText = responseText + "SCAN_RESULT_FORMAT: " + _SCAN_RESULT_FORMAT + "\r\n";
            responseText = responseText + "CANCELLED: " + _CANCELLED + "\r\n";

            if(!activity.isFinishing()) {
                final String finalResponseText = responseText;
                activity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                    javaFnCall(finalResponseText); // Thread-safe.
                    }
                });
            }
        } catch (JSONException e) {
            javaFnCall("Failed to parse parameters");
        }
        return true;
    }

    @JavascriptInterface
    public boolean showUserDataListView(JSONArray args) throws JSONException {

        try {
            DeviceUuidFactory myGuid = new DeviceUuidFactory(activity);
            final String strUserData = myGuid.getUserData();
            final ObjectItem[] uData = myGuid.getItemData();
            //displayUserData(args.getString(0), strUserData, uData, true);
            AlertDialog alertDialog = new AlertDialog.Builder(activity).create();
            alertDialog.setTitle(activity.getString(R.string.app_dialog_title));
            alertDialog.setMessage(uData.toString());
            alertDialog.setButton(DialogInterface.BUTTON_POSITIVE,activity.getString(R.string.ok_text), new DialogInterface.OnClickListener()
            {
                public void onClick(DialogInterface dialog, int which)
                {
                    dialog.dismiss();
                }
            });
            alertDialog.setButton(DialogInterface.BUTTON_NEGATIVE,activity.getString(R.string.cancel_text), new DialogInterface.OnClickListener()
            {
                @Override
                public void onClick(DialogInterface dialog, int which)
                {
                    dialog.dismiss();
                }
            });
            alertDialog.show();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return true;
    }

    @JavascriptInterface
    public boolean showUserDataString(JSONArray args) throws JSONException {

        try {
            DeviceUuidFactory myGuid = new DeviceUuidFactory(activity);
            final String strUserData = myGuid.getUserData();
            final ObjectItem[] uData = myGuid.getItemData();
            //displayUserData(args.getString(0), strUserData, uData, false);

            AlertDialog alertDialog = new AlertDialog.Builder(activity).create();
            alertDialog.setTitle(activity.getString(R.string.app_dialog_title));
            alertDialog.setMessage(strUserData);
            alertDialog.setButton(DialogInterface.BUTTON_POSITIVE,activity.getString(R.string.ok_text), new DialogInterface.OnClickListener()
            {
                public void onClick(DialogInterface dialog, int which)
                {
                    dialog.dismiss();
                }
            });
            alertDialog.setButton(DialogInterface.BUTTON_NEGATIVE,activity.getString(R.string.cancel_text), new DialogInterface.OnClickListener()
            {
                @Override
                public void onClick(DialogInterface dialog, int which)
                {
                    dialog.dismiss();
                }
            });
            alertDialog.show();

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return true;
    }

    /** Check if this device has a camera */
//    private boolean checkCameraHardware(Context _content) {
//        if (_content.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)){
//            // this device has a camera
//            return true;
//        } else {
//            // no camera on this device
//            return false;
//        }
//    }

    @JavascriptInterface
    public boolean getScanner() {
        Intent intent = new Intent("com.google.zxing.client.android.SCAN");
        intent.setPackage("com.google.zxing.client.android");
        intent.putExtra("SCAN_MODE", "QR_CODE_MODE");
        activity.startActivityForResult(intent, 0);

        //try {
        //    // execute(this.showScannerSuccess, this.showScannerFailure, 'BarcodeScanner', 'scan', []);
        //    BarcodeScanner barCode = new BarcodeScanner(activity, webView);
        //    barCode.execute("scan", null);
        //}
        //catch (Exception e) {
        //    e.printStackTrace();
        //}

        return false;

    }

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == 0) {
//            if (resultCode == RESULT_OK) {
//                String contents = intent.getStringExtra("SCAN_RESULT");
//                String format = intent.getStringExtra("SCAN_RESULT_FORMAT");
//                // Handle successful scan
//            } else if (resultCode == RESULT_CANCELED) {
//                // Handle cancel
//            }
        }
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public int getNumberOfCameras() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//            try {
//                return ((CameraManager) getSystemService(Manifest.permission.CAMERA_SERVICE)).getCameraIdList().length;
//            } catch (CameraAccessException e) {
//                Log.e("", "", e);
//            }
        }
        return Camera.getNumberOfCameras();
    }


}