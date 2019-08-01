package com.sergioapps.utils;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;

import java.io.File;
import java.io.IOException;

import android.content.Context;
import android.util.Log;

public class CheckForStuff {

    private final int MY_PERMISSIONS_REQUEST_WRITE_EXTERNAL = 101;
    boolean permissionToDownload = false;

    public boolean dir_exists(String dir_path)
    {
        boolean ret = false;
        File dir = new File(dir_path);
        if(dir.exists() && dir.isDirectory())
            ret = true;
        return ret;
    }


    public boolean isExternalStorageWritable() {
        String state = Environment.getExternalStorageState();
        if (Environment.MEDIA_MOUNTED.equals(state)) {
            return true;
        }
        return false;
    }

    public boolean isSDCardPresent() {
        if (Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED)) {
            return true;
        }
        return false;
    }

    public String getStringDirPath(Context context, String dirName) {

        //  /storage/emulated/0/ARC/
        //String path = (new CheckForStuff()).getPath(context);
        String _return = "";
        File directory = null;
        String baseDir = "";
        String state = Environment.getExternalStorageState();
        if(Environment.MEDIA_MOUNTED.equals(state)) {
            File baseDirFile = context.getExternalFilesDir(null);
            if(baseDirFile == null) {
                baseDir = context.getFilesDir().getAbsolutePath();
            } else {
                baseDir = baseDirFile.getAbsolutePath();
            }
        } else {
            baseDir = context.getFilesDir().getAbsolutePath();
        }
        baseDir = context.getExternalFilesDir(null).getAbsolutePath();
        _return = baseDir +  File.separator + dirName;

        if(!dir_exists(_return)){
            directory = new File(_return);
            // The File.mkdirs() method will create all needed directories;
            // mkdir() will only create the last directory in the pathname.
            boolean success = directory.mkdirs();
            //if (success) {
            //    Toast.makeText(context,
            //            (success ? "ARC Directory Has Been Created!" : "ARC Directory NOT Created!"),
            //            Toast.LENGTH_LONG).show();
            //}
        }
        return _return;

    }

    public File getFileDirPath(Context context, String dirName) {

        //  /storage/emulated/0/ARC/
        //String path = (new CheckForStuff()).getPath(context);
        File directory = null;
        String baseDir = "";
        String state = Environment.getExternalStorageState();
        if(Environment.MEDIA_MOUNTED.equals(state)) {
            File baseDirFile = context.getExternalFilesDir(null);
            if(baseDirFile == null) {
                baseDir = context.getFilesDir().getAbsolutePath();
            } else {
                baseDir = baseDirFile.getAbsolutePath();
            }
        } else {
            baseDir = context.getFilesDir().getAbsolutePath();
        }
        baseDir = context.getExternalFilesDir(null).getAbsolutePath();
        String path = baseDir +  File.separator + dirName;

        if(!dir_exists(path)){
            directory = new File(path);
            // The File.mkdirs() method will create all needed directories;
            // mkdir() will only create the last directory in the pathname.
            boolean success = directory.mkdirs();
            //if (success) {
            //    Toast.makeText(context,
            //            (success ? "ARC Directory Has Been Created!" : "ARC Directory NOT Created!"),
            //            Toast.LENGTH_LONG).show();
            //}
        }
        return directory;

    }

    public void openFile(Context context, File url) throws IOException {
        // Create URI
        File file=url;
        Uri uri = Uri.fromFile(file);

        Intent intent = new Intent(Intent.ACTION_VIEW);
        // Check what kind of file you are trying to open, by comparing the url with extensions.
        // When the if condition is matched, plugin sets the correct intent (mime) type,
        // so Android knew what application to use to open the file
        if (url.toString().contains(".doc") || url.toString().contains(".docx")) {
            // Word document
            intent.setDataAndType(uri, "application/msword");
        } else if(url.toString().contains(".pdf")) {
            // PDF file
            intent.setDataAndType(uri, "application/pdf");
        } else if(url.toString().contains(".ppt") || url.toString().contains(".pptx")) {
            // Powerpoint file
            intent.setDataAndType(uri, "application/vnd.ms-powerpoint");
        } else if(url.toString().contains(".xls") || url.toString().contains(".xlsx")) {
            // Excel file
            intent.setDataAndType(uri, "application/vnd.ms-excel");
        } else if(url.toString().contains(".zip") || url.toString().contains(".rar")) {
            // WAV audio file
            intent.setDataAndType(uri, "application/x-wav");
        } else if(url.toString().contains(".rtf")) {
            // RTF file
            intent.setDataAndType(uri, "application/rtf");
        } else if(url.toString().contains(".wav") || url.toString().contains(".mp3")) {
            // WAV audio file
            intent.setDataAndType(uri, "audio/x-wav");
        } else if(url.toString().contains(".gif")) {
            // GIF file
            intent.setDataAndType(uri, "image/gif");
        } else if(url.toString().contains(".jpg") || url.toString().contains(".jpeg") || url.toString().contains(".png")) {
            // JPG file
            intent.setDataAndType(uri, "image/jpeg");
        } else if(url.toString().contains(".txt")) {
            // Text file
            intent.setDataAndType(uri, "text/plain");
        } else if(url.toString().contains(".3gp") || url.toString().contains(".mpg") || url.toString().contains(".mpeg") || url.toString().contains(".mpe") || url.toString().contains(".mp4") || url.toString().contains(".avi")) {
            // Video files
            intent.setDataAndType(uri, "video/*");
        } else {
            //if you want you can also define the intent type for any other file

            //additionally use else clause below, to manage other unknown extensions
            //in this case, Android will show all applications installed on the device
            //so you can choose which application to use
            intent.setDataAndType(uri, "*/*");
        }

        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    // This is the path we want eliminating the extra "path" variable:
    // The difference between mkdir and mkdirs is that mkdir does not create
    // nonexistent parent directory, while mkdirs does, so if dir does not exist,
    // mkdir will fail. Also, mkdir and mkdirs returns true only if the directory was created.
    // If the directory already exists they return false

    // There is NO getExternalFilesDir() on Environment in any version of Android.
    // You may be thinking of getExternalFilesDir() on Context, which was added in 2.2.
    // However, that method is somewhat broken -- the directory it gives you will have
    // its contents deleted during an app upgrade.

    //boolean mExternalStorageAvailable = false;
    //boolean mExternalStorageWriteable = false;
    //String state = Environment.getExternalStorageState();

    //if (Environment.MEDIA_MOUNTED.equals(state)) {
    //    // We can read and write the media
    //    mExternalStorageAvailable = mExternalStorageWriteable = true;
    //} else if (Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
    //    // We can only read the media
    //    mExternalStorageAvailable = true;
    //    mExternalStorageWriteable = false;
    //} else {
    //    // Something else is wrong. It may be one of many other states, but all we need
    //    //  to know is we can neither read nor write
    //    mExternalStorageAvailable = mExternalStorageWriteable = false;
    //}

}


//private void initSampleAssets() {
//    CopyAsset copyAsset = new CopyAssetThreadImpl(this, new Handler());
//    for(String asset : sampleAssets){
//        copyAsset.copy(asset, new File(getCacheDir(), asset).getAbsolutePath());
//    }
//}

//String dir_path = context.getApplicationContext().getFilesDir().getAbsolutePath() + File.separator + "ARC";
//if (!dir_exists(dir_path)){
//    File test = new File(dir_path);
//    boolean success = test.mkdirs();
//    if (success) {
//        Log.d("WebViewPreImp", (success ? "ARC Directory Created Successfully!" : "ARC Directory NOT Created!"));
//        Timber.d((success ? "WebViewPresenterImplementation: ARC Directory Created Successfully!" : "mainActivity: ARC Directory NOT Created!"));
//        Toast.makeText(context.getApplicationContext(),
//                "WebViewPresenterImplementation: " +(success ? "ARC Directory Created Successfully!" : "ARC Directory NOT Created!"),
//                Toast.LENGTH_LONG).show();
//    }
//}
//String[] lst = context.getApplicationContext().getFilesDir().list();
//for (int i=0; i< lst.length; i++){
//    Log.d(TAG, "  Files -> 1 context.getFilesDir()list("+i+")-=> " + lst[i]);
//}