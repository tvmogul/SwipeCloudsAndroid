package com.sergioapps.userdata;

import android.content.Context;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.TextView;
import android.widget.Toast;

/*
 * Here you can control what to do next when the user selects an item
 */
public class OnItemClickListenerListViewItem implements OnItemClickListener {

	@Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

		Context context = view.getContext();
		
/*		TextView textViewDesc = ((TextView) view.findViewById(R.id.textViewDesc));
		TextView textViewValue = ((TextView) view.findViewById(R.id.textViewValue));*/
		
        // get the clicked item name
/*        String listItemDesc = textViewDesc.getText().toString();
        String listItemValue = textViewValue.getText().toString();*/
        
        // get the clicked item ID
        //String textViewValue = textViewValue.getTag().toString();
        
        // just toast it
        //Toast.makeText(context, "Item: " + listItemDesc + ", Item ID: " + listItemValue, Toast.LENGTH_SHORT).show();

        //((MainActivity) context).alertDialogStores.cancel();
        
    }
	
}
