package com.sergioapps.utils;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

/**
 * The NetworkUtils class contains methods related to networks.
 * <p>
 * Created by M1040100 on 28-Nov-17.
 *
 * @version 1.0.
 */

public final class NetworkUtils {

    private NetworkUtils() {
        // This utility class is not publicly instantiable
    }

    /**
     * Checks for the internet connectivity in the mobile phone.
     *
     * @param context Current application state.
     * @return Returns true if the device is connected to internet else false.
     */
    public static boolean isNetworkConnected(Context context) {
        ConnectivityManager cm =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
        return activeNetwork != null && activeNetwork.isConnectedOrConnecting();
    }

}
