package com.sergioapps.userdata;

public class Entry {
	//public String date;
	//public String time;
	public String description;
	public String value;
	
	/**************** SET METHONDS ****************/
	
/*	public void setDate(String str) {
		this.date = str;
	}*/
/*	public void setTime(String str) {
		this.time = str;
	}*/
	public void setDescription(String str) {
		this.description = str;
	}
	public void setValue(String str) {
		this.value = str;
	}
	
	/**************** GET METHONDS ****************/
	
/*	public String getDate() {
		return this.date;
	}*/
/*	public String getTime() {
		return this.time;
	}*/
	public String getStrDescription() {
		return this.description;
	}
	public String getStrValue() {
		return this.value;
	}
	
}
