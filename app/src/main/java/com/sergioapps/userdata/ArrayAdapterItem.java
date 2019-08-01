package com.sergioapps.userdata;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.sergioapps.swipeclouds.R;
 

public class ArrayAdapterItem extends ArrayAdapter<ObjectItem> {

    Context mContext;
    int layoutResourceId;
    ObjectItem data[] = null;
	
    public ArrayAdapterItem(Context pluginContext, int layoutResourceId, ObjectItem[] data) {
        super(pluginContext, layoutResourceId, data);
        this.layoutResourceId = layoutResourceId;
        this.mContext = pluginContext;
        this.data = data;
    }

	 // our ViewHolder caches our TextView
	 static class ViewHolderItem {
	     TextView textViewDesc;
	     TextView textViewValue;
	 }
	 	    
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
     
    	ViewHolderItem viewHolder;

    	// The convertView argument is essentially a "ScrapView" as described is Lucas post 
    	// http://lucasr.org/2012/04/05/performance-tips-for-androids-listview/
    	// It will have a non-null value when ListView is asking you recycle the row layout. 
    	// So, when convertView is not null, you should simply update its contents instead of inflating a new row layout.
          
        if(convertView==null){
             
            // inflate the layout
            LayoutInflater inflater = ((Activity) mContext).getLayoutInflater();
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.userdata_listview_row_item, parent, false);
             
            // well set up the ViewHolder
            viewHolder = new ViewHolderItem();
            viewHolder.textViewDesc = (TextView) convertView.findViewById(R.id.textViewDesc);
            viewHolder.textViewValue = (TextView) convertView.findViewById(R.id.textViewValue);
	        
            // store the holder with the view.
            convertView.setTag(viewHolder);
             
        }else{
            // we've just avoided calling findViewById() on resource everytime
            // just use the viewHolder
            viewHolder = (ViewHolderItem) convertView.getTag();
        }
         
        // object item based on the position
        ObjectItem objectItem = data[position];
         
        // assign values if the object is not null
        if(objectItem != null) {
            // get the TextView from the ViewHolder and then set the text (item name) and tag (itemDesc) values
            viewHolder.textViewDesc.setText(objectItem.itemDesc);
            viewHolder.textViewValue.setText(objectItem.itemValue);
            viewHolder.textViewDesc.setTag(objectItem.itemDesc);
        }
        return convertView;    
    }	
}
