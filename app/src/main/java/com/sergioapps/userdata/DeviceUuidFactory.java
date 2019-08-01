package com.sergioapps.userdata;

import android.Manifest;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.database.Cursor;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.provider.BaseColumns;
import android.provider.ContactsContract;
import android.provider.Settings.Secure;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.telephony.TelephonyManager;
import android.util.Patterns;
import android.widget.Toast;

import java.io.UnsupportedEncodingException;
import java.util.UUID;
import java.util.regex.Pattern;
import org.json.JSONException;
import org.json.JSONObject;
import com.sergioapps.userdata.NetworkUtil;

public class DeviceUuidFactory {

	Context context;

    private final static int loc_perm = 1;
    private final static int file_perm = 2;

	// Identify PREFS_FILE with an identifier specific to app, i.e., "appdata_dt"
    protected static final String PREFS_FILE = "appdata_dt.xml";

    protected static final String PREFS_APP_ID = "appid";
    protected volatile static String appid;
    protected volatile static UUID uuid_appid;

    protected static final String PREFS_IPHONE_ID = "iphoneid";
    protected volatile static String iphoneid;

    protected static final String PREFS_ANDROID_ID = "androidid";
    protected volatile static String androidid;
    protected volatile static UUID uuid_androidid;

    // IMEI( International Mobile Equipment Identity ) Most commonly referred to as "Device ID"
    // The unique number to identify GSM, WCDMA mobile phones as well as some satellite phones
    // String   imeistring = null;                                                          
    // String   imsistring = null; 
    // TelephonyManager  telephonyManager;                                             
    // telephonyManager = (TelephonyManager) getSystemService( Context.TELEPHONY_SERVICE );               
    // getDeviceId() function Returns the unique device ID.
    // for example,the IMEI for GSM and the MEID or ESN for CDMA phones.                                                        
    // imeistring = telephonyManager.getDeviceId(); 
    protected static final String PREFS_DEVICE_ID = "deviceid";
    protected volatile static String deviceid;
    protected volatile static UUID uuid_deviceid;

    // MEID(Mobile Equipment IDentifier)
    // The globally unique number identifying a physical piece of CDMA mobile station equipment, the MEID was created to replace ESNs(Electronic Serial Number)

    // ESN(Electronic Serial Number)
    // The unique number to identify CDMA mobile phones

    // IMSI(International Mobile Subscriber Identity)
    // The unique identification associated with all GSM and UMTS network mobile phone users    
    // getSubscriberId() function Returns the unique subscriber ID, for example, the IMSI for a GSM phone.
    // imsistring = telephonyManager.getSubscriberId();    
    protected static final String PREFS_SUBSCRIBER_ID ="subscriberid";
    protected volatile static String subscriberid;

    protected static final String PREFS_SIMCARD_SN ="simcardsn";
    protected volatile static String simcardsn;

    protected static final String PREFS_IP_ADDRESS ="ipaddress";
    protected volatile static String ipaddress;

    protected static final String PREFS_IP_ADDRESS2 ="ipaddress2";
    protected volatile static String ipaddress2;

    protected static final String PREFS_MAC_ADDRESSES ="macaddress";
    protected volatile static String macaddress;

    protected static final String PREFS_DEVICE_NAME ="devicename";
    protected volatile static String devicename;

    protected static final String PREFS_APP_VERSION ="appversion";
    protected volatile static String appversion;

    protected static final String PREFS_SDK ="sdk";
    protected volatile static String sdk;   //Android|....

    protected static final String PREFS_CITY ="city";
    protected volatile static String city;

    protected static final String PREFS_STATE ="state";
    protected volatile static String state;

    protected static final String PREFS_CTRY ="ctry";
    protected volatile static String ctry;

    protected static final String PREFS_PC ="pc";
    protected volatile static String pc;

    protected static final String PREFS_NAME ="name";
    protected volatile static String name;

    protected static final String PREFS_PH ="ph";
    protected volatile static String ph;

    protected static final String PREFS_EMAIL ="email";
    protected volatile static String email;

    protected static final String PREFS_LAT ="lat";
    protected volatile static String lat;

    protected static final String PREFS_LNG ="lng";
    protected volatile static String lng;

    protected volatile static String fr = "0";

    protected volatile static GPSTracker gps = null;

	public DeviceUuidFactory(Context context) throws UnsupportedEncodingException {
        ////////////////////////////////////////////////////////////////////////////////////////////////
		// Create An "APP ID" as a UUID to be a unique indentifier for the app & set "fr or "first run."
        ////////////////////////////////////////////////////////////////////////////////////////////////
        final SharedPreferences prefs = context.getSharedPreferences(PREFS_FILE, 0);
        if (uuid_appid == null) {
            synchronized (DeviceUuidFactory.class) {
                if (uuid_appid == null) {
                    final String id = prefs.getString(PREFS_APP_ID, null);
                    if (id != null) {
                        // Use ids previously computed and stored in the prefs file
                    	uuid_appid = UUID.fromString(id);
                        fr = "0";
                    } else {
                    	// This is the first installation!
                        // We will Use Android ID to create the UUID appid as a String unless it's broken, 
                        // in which case fallback on deviceId, unless not available, so as a last resort we will fallback 
                        // to random number which we store in prefs file as a UUID using "nameUUIDFromBytes." 
                    	fr = "1";
                        if (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
                            try {
                                String androidId = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);
                                String deviceId = ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
                                if (!"9774d56d682e549c".equals(androidId)) {
                                    uuid_appid = UUID.nameUUIDFromBytes(androidId.getBytes("utf8"));
                                } else {
                                    uuid_appid = deviceId != null ? UUID.nameUUIDFromBytes(deviceId.getBytes("utf8")) : UUID.randomUUID();
                                }
                            } catch (UnsupportedEncodingException e) {
                                //Toast.makeText(context, "SharedPreferences Failed!", Toast.LENGTH_LONG).show();
                                throw new RuntimeException(e);
                            }
                        }
                        // Write the value out to the prefs file
                        prefs.edit().putString(PREFS_APP_ID, uuid_appid.toString()).commit();
                        //Toast.makeText(context, "SharedPreferences Success!", Toast.LENGTH_LONG).show();
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (iphoneid == null) {
            synchronized (DeviceUuidFactory.class) {
                if (iphoneid == null) {
                    final String _iphoneid = prefs.getString(PREFS_IPHONE_ID, null);
                    if (_iphoneid != null) {
                    	iphoneid = _iphoneid;
                    } else {
                    	iphoneid = "IPHONE_ID".toString();	
                        prefs.edit().putString(PREFS_IPHONE_ID, iphoneid.toString()).commit();
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (androidid == null) {
            synchronized (DeviceUuidFactory.class) {
                if (androidid == null) {
                    final String _androidid = prefs.getString(PREFS_ANDROID_ID, null);
                    if ( (_androidid != null)  && (!"9774d56d682e549c".equals(_androidid)) ){
                    	androidid = _androidid;
                    } else {
                        String androidId = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);
                        if (!"9774d56d682e549c".equals(androidId)) {
                        	androidid = androidId;
						    prefs.edit().putString(PREFS_ANDROID_ID, androidid.toString()).commit();
						} else {
							androidid = "9774d56d682e549c".toString();
							prefs.edit().putString(PREFS_ANDROID_ID, androidid).commit();
						}
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // IMEI stands for International Mobile Equipment Identity number and it is the unique ID number assigned to nearly every modern mobile phone sold.
        // The IMEI is a 14-digit string that includes information on the origin, model, and serial number of the mobile device.
        // On GSM devices, this number is used to identify a valid phone to the network on so the IMEI can be 'blocked' on phones that are stolen or lost to stop them accessing the network. This works whether the original SIM card has been swapped or not.
        // The IMEI number is often located inside the battery compartment of a phone. Alternatively you can usually make it display on screen by entering *#06#
        // On the iPhone you can find the IMEI number by clicking on Settings then General and then selecting About
        if (deviceid == null) {
            synchronized (DeviceUuidFactory.class) {
                if (deviceid == null) {
                    final String _deviceid = prefs.getString(PREFS_DEVICE_ID, null);
                    if ( (_deviceid != null)  && (!"9774d56d682e549c".equals(_deviceid)) ){
                    	deviceid = _deviceid;
                    } else {
                    	String deviceId = ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
                    	if (!"9774d56d682e549c".equals(deviceId)) {
                    		deviceid = deviceId.toString();
						    prefs.edit().putString(PREFS_DEVICE_ID, deviceid).commit();
						} else {
							deviceid = "9774d56d682e549c".toString();
							prefs.edit().putString(PREFS_DEVICE_ID, deviceid).commit();
						}
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
                
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // SIM Subscriber ID
        if (subscriberid == null) {
            synchronized (DeviceUuidFactory.class) {
                if (subscriberid == null) {
                    final String _subscriberid = prefs.getString(PREFS_SUBSCRIBER_ID, null);
                    if ( (_subscriberid != null)  && (!"9774d56d682e549c".equals(_subscriberid)) ){
                    	subscriberid = _subscriberid;
                    } else {
                    	String subscriberId = ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getSubscriberId();
                    	if (!"9774d56d682e549c".equals(subscriberId)) {
                    		subscriberid = subscriberId.toString();
						    prefs.edit().putString(PREFS_SUBSCRIBER_ID, subscriberid).commit();
						} else {
							subscriberid = "9774d56d682e549c".toString();
							prefs.edit().putString(PREFS_SUBSCRIBER_ID, subscriberid).commit();
						}
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////    
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // SIM Card serial Number
        if (simcardsn == null) {
            synchronized (DeviceUuidFactory.class) {
                if (simcardsn == null) {
                    final String _simcardsn = prefs.getString(PREFS_SIMCARD_SN, null);
                    if ( (_simcardsn != null)  && (!"9774d56d682e549c".equals(_simcardsn)) ){
                    	simcardsn = _simcardsn;
                    } else {
                    	String simcardSN = ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getSimSerialNumber();
                    	if (!"9774d56d682e549c".equals(simcardSN)) {
                    		simcardsn = simcardSN.toString();
						    prefs.edit().putString(PREFS_SIMCARD_SN, simcardsn).commit();
						} else {
							simcardsn = "9774d56d682e549c".toString();
							prefs.edit().putString(PREFS_SIMCARD_SN, simcardsn).commit();
						}
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////    
        
        // You do not need to add permissions for IP Addresses. Download this website as a string:
        // http://www.ip-api.com/json
        // OR
      	// http://www.telize.com/geoip
        // Downloading a website as a string can be done with java code:
        // http://www.itcuties.com/java/read-url-to-string/
        // Parse the JSON object like this:
        // http://stackoverflow.com/a/18998203/1987258
        // The json attribute "query" or "ip" contains the IP address.        
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // Local IP Address in Dot Notation
        if (ipaddress == null) {
            synchronized (DeviceUuidFactory.class) {
                if (ipaddress == null) {
                    final String _ipaddress = prefs.getString(PREFS_IP_ADDRESS, null);
                    if ( (_ipaddress != null)  && (!"9774d56d682e549c".equals(_ipaddress)) ){
                    	ipaddress = _ipaddress;
                    } else {
                        WifiManager wifiManager = (WifiManager)context.getSystemService(Context.WIFI_SERVICE);
                        WifiInfo wifiInfo = wifiManager.getConnectionInfo();               	

                        int iipAddress = wifiInfo.getIpAddress();
                        String strIPAddess = ((iipAddress >> 0) & 0xFF) + "." + ((iipAddress >> 8) & 0xFF) + "."
                                + ((iipAddress >> 16) & 0xFF) + "." + ((iipAddress >> 24) & 0xFF);                          
                    	if (!"9774d56d682e549c".equals(strIPAddess)) {
                    		ipaddress = strIPAddess.toString();
						    prefs.edit().putString(PREFS_IP_ADDRESS, ipaddress).commit();
						} else {
							ipaddress = "9774d56d682e549c".toString();
							prefs.edit().putString(PREFS_IP_ADDRESS, ipaddress).commit();
						}

                        String strMacAddress = wifiInfo.getMacAddress();  	
                    	if (!"9774d56d682e549c".equals(strMacAddress)) {
                    		macaddress = strMacAddress.toString();
						    prefs.edit().putString(PREFS_MAC_ADDRESSES, macaddress).commit();
						} else {
							macaddress = "9774d56d682e549c".toString();
							prefs.edit().putString(PREFS_MAC_ADDRESSES, macaddress).commit();
						}
                    	
                        // Basic Service Set Identifier
                        //String strBSSID = wifiInfo.getBSSID(); 
                        //String strLinkSpeedUnits = WifiInfo.LINK_SPEED_UNITS;
                        //int iLinkSpeed = wifiInfo.getLinkSpeed();
                        //int iNetworkId = wifiInfo.getNetworkId();
                        //int iRssi = wifiInfo.getRssi();
                        // Service Set Identifier of current 802.11 network
                        //String strSSID = wifiInfo.getSSID();
                        // TRUE if network does not broadcast it's SSID
                        //boolean bHiddenSSID = wifiInfo.getHiddenSSID();		             	                    	
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////    
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // Local IP Address Colon Notation
        if (ipaddress2 == null) {
            synchronized (DeviceUuidFactory.class) {
                if (ipaddress2 == null) {
                    final String _ipaddress2 = prefs.getString(PREFS_IP_ADDRESS2, null);
                    if ( (_ipaddress2 != null)  && (!"9774d56d682e549c".equals(_ipaddress2)) ){
                    	ipaddress2 = _ipaddress2;
                    } else {
                    	// IP in colon format
                    	String ipAddress2 = NetworkUtil.getLocalIpAddress();        
                    	if (!"9774d56d682e549c".equals(ipAddress2)) {
                    		ipaddress2 = ipAddress2.toString();
						    prefs.edit().putString(PREFS_IP_ADDRESS2, ipaddress2).commit();
						} else {
							ipaddress2 = "9774d56d682e549c".toString();
							prefs.edit().putString(PREFS_IP_ADDRESS2, ipaddress2).commit();
						}
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////           
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (appversion == null) {
            synchronized (DeviceUuidFactory.class) {
                if (appversion == null) {
                    final String _appversion = prefs.getString(PREFS_APP_VERSION, null);
                    if (_appversion != null) {
                    	appversion = _appversion;
                    } else {
                    	try {
                    		PackageManager manager = context.getPackageManager();
                    	    PackageInfo info = manager.getPackageInfo(context.getPackageName(),0);
                    	    int code = info.versionCode;
                    	    String strCode = Integer.toString(code);
                    	    String name = info.versionName;  //decimal !!!
                    	    // Compare with values on the server to see if there is a new version
                    	    appversion = strCode + "|" + name;	
                    	} catch (NameNotFoundException e) {
                    		e.printStackTrace();
                    		appversion = "0|0";	
                    	}
                        prefs.edit().putString(PREFS_APP_VERSION, appversion).commit();
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (sdk == null) {
            synchronized (DeviceUuidFactory.class) {
                if (sdk == null) {
                    final String _sdk = prefs.getString(PREFS_SDK, null);
                    if (_sdk != null) {
                    	sdk = _sdk;
                    } else {
                		int version = 0; 
                		try { 
                			version = Integer.valueOf (android.os.Build.VERSION.SDK_INT); 
                			sdk = Integer.toString(version);	
                		} catch (NumberFormatException e) { 
                			sdk = "0";	
                		} 
                        prefs.edit().putString(PREFS_SDK, sdk).commit();
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // Device Name
        ////////////////////////////////////////////////////////////////////////////////////////////////
		//Samsung GT-S5830L
		//Motorola MB860
		//Sony Ericsson LT18i
		//LGE LG-P500
		//HTC Desire V
		//HTC Wildfire S A510e
        if (devicename == null) {
            synchronized (DeviceUuidFactory.class) {
                if (devicename == null) {
                    final String _devicename = prefs.getString(PREFS_DEVICE_NAME, null);
                    if (_devicename != null) {
                    	devicename = _devicename;
                    } else {
                    	devicename = getDeviceName();
                        prefs.edit().putString(PREFS_DEVICE_NAME, devicename).commit();
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
               	
        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (ph == null) {
            synchronized (DeviceUuidFactory.class) {
                if (ph == null) {
                    final String _ph = prefs.getString(PREFS_PH, null);
                    if (_ph != null) {
                    	ph = _ph;
                    } else {
                    	try {
                    		TelephonyManager tMgr = (TelephonyManager)context.getSystemService(Context.TELEPHONY_SERVICE);
                    		ph = tMgr.getLine1Number();
                    		name = getContactDisplayNameByNumber(context, ph);
                    		if(name.length() > 0) {
                    			prefs.edit().putString(PREFS_NAME, name).commit();
                    		}
                    	} catch (Exception e) {
                    		e.printStackTrace();
                    		ph = "000-000-0000";
                    	} 
                        prefs.edit().putString(PREFS_PH, ph).commit();
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        if (email == null) {
            synchronized (DeviceUuidFactory.class) {
                if (email == null) {
                    final String _email = prefs.getString(PREFS_EMAIL, null);
                    if (_email != null) {
                    	email = _email;
                    } else {
                    	Pattern emailPattern = Patterns.EMAIL_ADDRESS; // API level 8+
                    	try {
                    		Account[] accounts = AccountManager.get(context).getAccounts();
                    		for (Account account : accounts) {
                    		    if (emailPattern.matcher(account.name).matches()) {
                    		    	email = account.name;
                    		    }
                    		}
                    	}
                    	catch (Exception ex) {
                    		email = "";
                    	}
                        prefs.edit().putString(PREFS_EMAIL, email).commit();
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // postalCode is the most important!
        if (pc == null) {
            synchronized (DeviceUuidFactory.class) {
                if (pc == null) {                   
                    final String _lat = prefs.getString(PREFS_LAT, null);
                    final String _lng = prefs.getString(PREFS_LNG, null);
                    final String _city = prefs.getString(PREFS_CITY, null);
                    final String _state = prefs.getString(PREFS_STATE, null);
                    final String _ctry = prefs.getString(PREFS_CTRY, null);
                    final String _pc = prefs.getString(PREFS_PC, null);        
                    if (_pc != null) {
                    	lat = _lat;
                    	lng = _lng;
                    	city = _city;
                    	state = _state;
                    	ctry = _ctry;                   	
                    	pc = _pc;
                    } else {
						/////////////////////////////////////////////////////////////////////////////////////   
                    	try {
	                    	gps = new GPSTracker(context);
	                        if(gps.canGetLocation()){                            
	                            lat = Double.toString(gps.getLatitude());
	                            lng = Double.toString(gps.getLongitude());
	                            city = gps.getCityStr();
	                            state = gps.getStateStr();
	                            ctry = gps.getCtryStr();
	                            pc = gps.getPCStr();
	                            //Toast.makeText(context, "Your Location is - \nLat: " + lat + "\nLong: " + lng, Toast.LENGTH_LONG).show();
	                        }else{
	                            // can't get location GPS or Network is not enabled
	                            // Ask user to enable GPS/network in settings?
	                            //gps.showSettingsAlert();
	                        };
                    	} catch (Exception e) {
            	    		e.printStackTrace();
                    	} finally {
                            gps.stopUsingGPS();                    		
                    	}
                    	if (pc != null) {
                        	// If we have a value for pc (Postal Code) then we set the firstRun flag to true or "1"
                    		// Setting this first run flag will upload the data to our server!
                    		// In order to deliver targeted advertising we must get only the pc (Postal Code)
                        	fr = "1";
	                        prefs.edit().putString(PREFS_LAT, lat).commit();
	                        prefs.edit().putString(PREFS_LNG, lng).commit();
	                        prefs.edit().putString(PREFS_CITY, city).commit();
	                        prefs.edit().putString(PREFS_STATE, state).commit();
	                        prefs.edit().putString(PREFS_CTRY, ctry).commit();                       
	                        prefs.edit().putString(PREFS_PC, pc).commit();
                    	}
						///////////////////////////////////////////////////////////////////////////////////////
                    }
                }                                  
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        
    }
	
	
	/**
     * Returns a unique UUID for the current android device. As with all UUIDs,
     * this unique ID is "very highly likely" to be unique across all Android
     * devices. Much more so than ANDROID_ID is.
     * 
     * The UUID is generated by using ANDROID_ID as the base key if appropriate,
     * falling back on TelephonyManager.getDeviceID() if ANDROID_ID is known to
     * be incorrect, and finally falling back on a random UUID that's persisted
     * to SharedPreferences if getDeviceID() does not return a usable value.
     * 
     * In some rare circumstances, this ID may change. In particular, if the
     * device is factory reset a new device ID may be generated. In addition, if
     * a user upgrades their phone from certain buggy implementations of Android
     * 2.2 to a newer, non-buggy version of Android, the device ID may change.
     * Or, if a user uninstalls your app on a device that has neither a proper
     * Android ID nor a Device ID, this ID may change on reinstallation.
     * 
     * Note that if the code falls back on using TelephonyManager.getDeviceId(),
     * the resulting ID will NOT change after a factory reset. Something to be aware of.
     * 
     * Works around a bug in Android 2.2 for many devices with using ANDROID_ID directly.
     * 
     * http://code.google.com/p/android/issues/detail?id=10603
     * 
     * @return a UUID that may be used to uniquely identify your device for most purposes.
     */
    public UUID getAppUuid() {
        return uuid_appid;
    }
    public String getFirstRun() {
        return fr;
    }    
    public String getAppData() {
    	//first_run = Boolean.FALSE;
    	String appdata;
    	appdata = "appname=SC01"
				+ "&appid="+uuid_appid.toString() 
    			+ "&iphoneid="+iphoneid  
    			+ "&androidid="+androidid  
    			+ "&deviceid="+deviceid 
    			+ "&subscriberid="+subscriberid    	
    			+ "&simcardsn="+simcardsn    
    			+ "&ipaddress="+ipaddress   
    			+ "&ipaddress2="+ipaddress2  
    			+ "&macaddress="+macaddress  
    			+ "&devicename="+devicename	
    			+ "&appversion="+appversion
    			+ "&sdk="+sdk
    			+ "&name="+name	
				+ "&ph="+ph
				+ "&email="+email
				+ "&city="+city
				+ "&state="+state
				+ "&ctry="+ctry
				+ "&pc="+pc
				+ "&lat="+ lat 
				+ "&lng=" + lng
				+ "&fr="+fr
		    	+ "&methodName=installData"
		    	+ "&jsonp=onRSSLoaded";  

        return appdata;
    }    

    public String getUserData() {
    	String displaydata; 
    	displaydata = "appname:\nSC01"
				+ "\n\nappid:\n"+uuid_appid.toString() 
    			+ "\n\niphoneid:\n"+iphoneid  
    			+ "\n\nandroidid:\n"+androidid  
    			+ "\n\ndeviceid:\n"+deviceid 
    			+ "\n\nsubscriberid:\n"+subscriberid    	
    			+ "\n\nsimcardsn:\n"+simcardsn    
    			+ "\n\nipaddress:\n"+ipaddress   
    			+ "\n\nipaddress2:\n"+ipaddress2  
    			+ "\n\nmacaddress:\n"+macaddress  
    			+ "\n\ndevicename:\n"+devicename	
    			+ "\n\nappversion:\n"+appversion
    			+ "\n\nsdk:\n"+sdk
    			+ "\n\nname:\n"+name
				+ "\n\nph:\n"+ph
				+ "\n\nemail:\n"+email
				+ "\n\ncity:\n"+city
				+ "\n\nstate:\n"+state
				+ "\n\nctry:\n"+ctry
				+ "\n\npc:\n"+pc
				+ "\n\nlat:\n"+ lat 
				+ "\n\nlng:\n" + lng
				+ "\n\n";
    	
        return displaydata;
    }    
    
    public JSONObject getJSONData() {
    	JSONObject uData = new JSONObject();
    	try {  	    
    	    uData.put("appname", "SC01");
    	  	uData.put("appid", uuid_appid.toString()); 
    	  	uData.put("iphoneid", iphoneid);  
    	  	uData.put("androidid", androidid);   
    	  	uData.put("deviceid", deviceid);  
    	  	uData.put("subscriberid", subscriberid);      	
			uData.put("simcardsn", simcardsn);  
			uData.put("ipaddress", ipaddress);     
			uData.put("ipaddress2", ipaddress2);    
			uData.put("macaddress", macaddress);    
			uData.put("devicename", devicename);  	
			uData.put("appversion", appversion);  
			uData.put("sdk", sdk);  
			uData.put("name", name.toString()); 	
			uData.put("ph", ph);  
			uData.put("email", email);  
			uData.put("city", city);  
			uData.put("state", state);  
			uData.put("ctry", ctry);  
			uData.put("pc", pc);  
			uData.put("lat",  lat);  
			uData.put("lng", lng);      				
    	} catch (JSONException e) {
    	    // TODO Auto-generated catch block
    	    e.printStackTrace();
    	}

    	//String jsonStr = uData.toString();
    	//System.out.println("jsonString: "+jsonStr);
    	
        return uData;
    }   
    
    
    public ObjectItem[] getItemData() {
    	
		ObjectItem[] ObjectItemData = new ObjectItem[22];
		ObjectItemData[0] = new ObjectItem("appname", "SC01");
		ObjectItemData[1] = new ObjectItem("appid", uuid_appid.toString() );
		ObjectItemData[2] = new ObjectItem("iphoneid", iphoneid);
		ObjectItemData[3] = new ObjectItem("androidid", androidid);
		ObjectItemData[4] = new ObjectItem("deviceid", deviceid);
		ObjectItemData[5] = new ObjectItem("subscriberid", subscriberid);
		ObjectItemData[6] = new ObjectItem("simcardsn", simcardsn);
		ObjectItemData[7] = new ObjectItem("ipaddress", ipaddress);
		ObjectItemData[8] = new ObjectItem("ipaddress2", ipaddress2);
		ObjectItemData[9] = new ObjectItem("macaddress", macaddress);
		ObjectItemData[10] = new ObjectItem("devicename", devicename);
		ObjectItemData[11] = new ObjectItem("appversion", appversion);
		ObjectItemData[12] = new ObjectItem("sdk", sdk);
		ObjectItemData[13] = new ObjectItem("name", name);		
		ObjectItemData[14] = new ObjectItem("ph", ph);
		ObjectItemData[15] = new ObjectItem("email", email);
		ObjectItemData[16] = new ObjectItem("city", city);
		ObjectItemData[17] = new ObjectItem("state", state);
		ObjectItemData[18] = new ObjectItem("ctry", ctry);
		ObjectItemData[19] = new ObjectItem("pc", pc);
		ObjectItemData[20] = new ObjectItem("lat", lat);
		ObjectItemData[21] = new ObjectItem("lng", lng);
		
		return ObjectItemData;
    	
    }
    
    public String getDeviceName() {
    	String manufacturer = Build.MANUFACTURER;
    	String model = Build.MODEL;
    	if (model.startsWith(manufacturer)) {
    		return capitalize(model);
    	} else {
    		return capitalize(manufacturer) + " " + model;
    	}
    }

    private String capitalize(String s) {
    	if (s == null || s.length() == 0) {
    		return "";
    	}
    	char first = s.charAt(0);
    	if (Character.isUpperCase(first)) {
    		return s;
    	} else {
    		return Character.toUpperCase(first) + s.substring(1);
    	}
    }   
    
	public String getContactDisplayNameByNumber(Context context, String number) {
	    Uri uri = Uri.withAppendedPath(ContactsContract.PhoneLookup.CONTENT_FILTER_URI, Uri.encode(number));
	    String name = "UNKNOWN";

	    ContentResolver contentResolver = context.getContentResolver();
	    Cursor contactLookup = contentResolver.query(uri, new String[] {BaseColumns._ID,
	            ContactsContract.PhoneLookup.DISPLAY_NAME }, null, null, null);

	    try {
	        if (contactLookup != null && contactLookup.getCount() > 0) {
	            contactLookup.moveToNext();
	            name = contactLookup.getString(contactLookup.getColumnIndex(ContactsContract.Data.DISPLAY_NAME));
	            //String contactId = contactLookup.getString(contactLookup.getColumnIndex(BaseColumns._ID));
	        }
	    } finally {
	        if (contactLookup != null) {
	            contactLookup.close();
	        }
	    }

	    return name;
	}

}



//String result = "appid: "+uuid.toString() 
//+ "\nappname: WW01" 
//+ "\nappversion: "+appversion
//+ "\nsdk: "+sdk
//+ "\ndn: "+dn
//+ "\nph: "+ph
//+ "\nemail: "+email
//	+ "\ncity: "+city 
//	+ "\nstate: "+state 
//	+ "\nctry: " + ctry 
//	+ "\npc: "+ pc 
//	+ "\nlat: "+ lat 
//	+ "\nlng: " + lng
//	+ "\nfr: "+fr;








