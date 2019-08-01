package com.sergioapps.userdata;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.webkit.WebView;
import android.widget.TextView;

import com.sergioapps.swipeclouds.MainActivity;
import com.sergioapps.swipeclouds.R;
import com.sergioapps.swipeclouds.JsHandler;

import com.google.zxing.*;


public class BarcodeScanner {
    public static final int REQUEST_CODE = 0x0ba7c0de;

    private static final String SCAN = "scan";
    private static final String ENCODE = "encode";
    private static final String CANCELLED = "cancelled";
    private static final String FORMAT = "format";
    private static final String TEXT = "text";
    private static final String DATA = "data";
    private static final String TYPE = "type";
    private static final String SCAN_INTENT = "com.sergioapps.userdata.barcodescanner.SCAN";
    private static final String ENCODE_DATA = "ENCODE_DATA";
    private static final String ENCODE_TYPE = "ENCODE_TYPE";
    private static final String ENCODE_INTENT = "com.sergioapps.userdata.barcodescanner.ENCODE";
    private static final String TEXT_TYPE = "TEXT_TYPE";
    private static final String EMAIL_TYPE = "EMAIL_TYPE";
    private static final String PHONE_TYPE = "PHONE_TYPE";
    private static final String SMS_TYPE = "SMS_TYPE";

    private static final String LOG_TAG = "BarcodeScanner";

    Activity activity;
    WebView webView;
    JsHandler _jsHandler;

    /**
     * Constructor.
     */
    public BarcodeScanner(Activity _contxt, WebView _webView) {
        activity = _contxt;
        webView = _webView;
        _jsHandler = new JsHandler(activity, webView);
    }

    /**
     *
     * @param action
     * @param args
     * @return
     */
    public boolean execute(String action, JSONArray args) {
        if (action.equals(ENCODE)) {
            JSONObject obj = args.optJSONObject(0);
            if (obj != null) {
                String type = obj.optString(TYPE);
                String data = obj.optString(DATA);

                // If the type is null then force the type to text
                if (type == null) {
                    type = TEXT_TYPE;
                }

                if (data == null) {
                    _jsHandler.showDialog("User did not specify data to encode");
                    return true;
                }

                encode(type, data);
            } else {
                _jsHandler.showDialog("User did not specify data to encode");
                return true;
            }
        } else if (action.equals(SCAN)) {
            //_jsHandler.showDialog("SCAN will be called!");
            scan();
        } else {
            return false;
        }
        return true;
    }

    /**
     * Starts an intent to scan and decode a barcode.
     */
    public void scan() {
        //Intent intentScan = new Intent(SCAN_INTENT);
        //intentScan.addCategory(Intent.CATEGORY_DEFAULT);
        //final Intent intent = intentScan.setPackage("com.google.zxing");
        //activity.startActivityForResult(intentScan, REQUEST_CODE);
        Intent intent = new Intent("com.google.zxing.client.android.SCAN");
        intent.setPackage("com.google.zxing.client.android");
        intent.putExtra("SCAN_MODE", "QR_CODE_MODE");
        activity.startActivityForResult(intent, REQUEST_CODE);
    }

    /**
     * Called when the barcode scanner intent completes.
     *
     * @param requestCode The request code originally supplied to startActivityForResult(),
     *                       allowing you to identify who this result came from.
     * @param resultCode  The integer result code returned by the child activity through its setResult().
     * @param intent      An Intent, which can return result data to the caller (various data can be attached to Intent "extras").
     */
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        _jsHandler.showDialog("onActivityResult Fired!");

//        if (requestCode == REQUEST_CODE) {
//            if (resultCode == Activity.RESULT_OK) {
//                JSONObject obj = new JSONObject();
//                try {
//                	obj.put(TEXT, intent.getStringExtra("SCAN_RESULT"));
//                    obj.put(FORMAT, intent.getStringExtra("SCAN_RESULT_FORMAT"));
//                    obj.put(CANCELLED, false);
//                    displayScanResults(intent.getStringExtra("SCAN_RESULT"), intent.getStringExtra("SCAN_RESULT_FORMAT"));
//                    _jsHandler.displayScanObj(obj);
//                } catch (JSONException e) {
//                    Log.d(LOG_TAG, "This should never happen");
//                }
//            } else if (resultCode == Activity.RESULT_CANCELED) {
//                JSONObject obj = new JSONObject();
//                try {
//                    obj.put(TEXT, "");
//                    obj.put(FORMAT, "");
//                    obj.put(CANCELLED, true);
//                    _jsHandler.displayScanObj(obj);
//                } catch (JSONException e) {
//                    Log.d(LOG_TAG, "This should never happen");
//                }
//            } else {
//                _jsHandler.showDialog("Unexpected error");
//            }
//        }
    }

    /**
     * Initiates a barcode encode.
     *
     * @param type Endoiding type.
     * @param data The data to encode in the bar code.
     */
    public void encode(String type, String data) {
        Intent intentEncode = new Intent(ENCODE_INTENT);
        intentEncode.putExtra(ENCODE_TYPE, type);
        intentEncode.putExtra(ENCODE_DATA, data);
        // avoid calling other phonegap apps
        intentEncode.setPackage(activity.getApplicationContext().getPackageName());

        activity.startActivity(intentEncode);
    }
    
    @SuppressLint({ "InflateParams", "NewApi" })
	private synchronized void displayScanResults(
    		final String strScanResult, 
    		final String strScanResultFormat) {

		try {
			final String message = strScanResult + "\n\nFormat: " + strScanResultFormat;

			/* THEME_TRADITIONAL 1
			THEME_HOLO_DARK 2
			THEME_HOLO_LIGHT 3
			THEME_DEVICE_DEFAULT_DARK 4
			THEME_DEVICE_DEFAULT_LIGHT 5 */		
			AlertDialog.Builder alertDialog = new AlertDialog.Builder(activity, 4);
			
			// Bill SerGio - Use a scrollable view for large messages!
			LayoutInflater inflater= LayoutInflater.from(activity);
			View view=inflater.inflate(R.layout.barcode_scrollview, null);
			TextView textview=(TextView)view.findViewById(R.id.barcode_textmsg);		
			//final String strDisplayData = myGuid.getDisplayData();
			textview.setPadding(12, 12, 12, 12);
			textview.setText(message);	
			alertDialog
				.setTitle("Scan Result")
				//.setMessage(strDisplayData)
				.setView(view)
				.setCancelable(false)
				.setIcon(R.drawable.ic_launcher)
                .setNegativeButton("Close", new DialogInterface.OnClickListener() {
                    @TargetApi(11)
                    public void onClick(DialogInterface dialog, int id) {
                    	dialog.cancel();
                    }
                })
                /* .setNeutralButton("Copy", new DialogInterface.OnClickListener() {
                    @TargetApi(11)
                    public void onClick(DialogInterface dialog, int id) {
                    	ClipboardManager myClipboard;
                       	myClipboard = (ClipboardManager) cordova.getActivity().getSystemService(Context.CLIPBOARD_SERVICE);
                    	ClipData myClip;
                    	myClip = ClipData.newPlainText("text", message);
                    	myClipboard.setPrimaryClip(myClip);	
                    	//Toast.makeText(cordova.getActivity(), "Results Pasted",Toast.LENGTH_SHORT).show();
                        cordova.getThreadPool().execute(new Runnable() {
                            public void run() {
                                callbackContext.success("Data Copied!"); // Thread-safe.
                            }
                        });
                    }
                }) */
                .setNeutralButton("Lookup", new DialogInterface.OnClickListener() {
                    @TargetApi(11)
                    public void onClick(DialogInterface dialog, int id) {
                    if(!activity.isFinishing())
                        // loadurl on UI main thread
                        activity.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                            //callbackContext.success("Data Copied!"); // Thread-safe.
                            doScanSearch(strScanResult, strScanResultFormat);
                            }
                        });
                    }
                })
                .setPositiveButton("Share", new DialogInterface.OnClickListener() {
                    @TargetApi(11)
                    public void onClick(DialogInterface dialog, int id) {
                        doShare(message);
                    }
                }).show();		
		}
		catch (Exception e) {	
			//_appid = "00000000-0000-0000-0000-000000000000";
			e.printStackTrace(); 
		}    
	}

    private void doShare(String zdata) {
        //callbackContext.success(zdata);
    	Intent sendIntent = new Intent();
    	sendIntent.setAction(Intent.ACTION_SEND);
    	sendIntent.putExtra(Intent.EXTRA_TEXT, zdata);
    	sendIntent.setType("text/plain");
        activity.startActivity(Intent.createChooser(sendIntent, "Share"));
    }    

    private void doScanSearch(String scanResult, String scanResultFormat) {
        if (scanResult != null && scanResult.length() > 0) {
            _jsHandler.showDialog(scanResult);
            String url = "https:www.google.com/search?q=" + scanResult + "&gws_rd=ssl";
            if(scanResultFormat.equals("QR_CODE"))
            {
            	url = scanResult;
            }
    	    Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            activity.startActivity(i);
        } else {
            _jsHandler.showDialog("Expected one non-empty string argument.");
        }
    }
    

    
    
}


