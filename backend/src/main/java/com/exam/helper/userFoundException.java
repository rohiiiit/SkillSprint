package com.exam.helper;

@SuppressWarnings("serial")
public class userFoundException extends Exception{
	
	public userFoundException() {
		super("user already present with these username... try with diff username");
	}
	
	public userFoundException(String msg) {
		super(msg);
	}
	
	
}
