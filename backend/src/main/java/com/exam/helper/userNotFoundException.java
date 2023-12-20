package com.exam.helper;

@SuppressWarnings("serial")
public class userNotFoundException extends Exception{
	
	public userNotFoundException() {
		super("user not found");
	}
	
	public userNotFoundException(String msg) {
		super(msg);
	}
}
