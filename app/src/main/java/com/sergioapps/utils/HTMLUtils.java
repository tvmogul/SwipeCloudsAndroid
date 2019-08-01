package com.sergioapps.utils;

/**
 * The HTMLUtils class contains methods regarding the replacing html text in the file.
 * @version 1.0.
 */

public final class HTMLUtils {

    private HTMLUtils() {
        // This utility class is not publicly instantiable
    }

    /**
     * Loads the svg image in webview.
     *
     * @param Url Url containing image location.
     * @return String html to load the image in webview.
     */
    public static String loadSVG(String Url) {
        return "<html><head><style type='text/css'>body{margin:auto auto;text-align:center;}" +
                " img{width:100%;height:100%;} </style></head><body><img src=\"" + Url + "\"/></body></html>";

    }

}
