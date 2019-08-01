package com.sergioapps.utils;

/**
 * Collected constants of general utility. All members of this class are immutable.
 * <p>
 * Created by M1040100 on 28-Nov-17.
 *
 * @version 1.0.
 */

public final class AppConstants {

    private AppConstants() {
        // This utility class is not publicly instantiable
    }

    public static final int API_STATUS_CODE_LOCAL_ERROR = 0;

    public static final String PREF_NAME = "mindtree_pref";

    public static boolean LOAD_WEBVIEW = true;

    public static final String CONNECTIVITY_CHANGE = "android.net.conn.CONNECTIVITY_CHANGE";

    static final String TIMESTAMP_FORMAT = "yyyyMMdd_HHmmss";


    public enum LoggedInMode {

        LOGGED_IN_MODE_LOGGED_OUT(0),
        LOGGED_IN_MODE_GOOGLE(1),
        LOGGED_IN_MODE_FB(2),
        LOGGED_IN_MODE_SERVER(3);

        private final int mType;

        LoggedInMode(int type) {
            mType = type;
        }

        public int getType() {
            return mType;
        }
    }
}
