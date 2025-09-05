package com.team04.logsheetmngsys.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CustomException extends RuntimeException {


	private static final long serialVersionUID = 5724089067956864828L;
	
	private final int errorCode;
	private final String errorMsg;
	private final HttpStatus httpStatus;

	public CustomException(int errorCode, String errorMsg, HttpStatus httpStatus) {
		super(errorMsg); 
		this.errorCode = errorCode;
		this.errorMsg = errorMsg;
		this.httpStatus = httpStatus;
	}

}
