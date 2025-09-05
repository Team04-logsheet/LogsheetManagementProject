package com.team04.logsheetmngsys.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.team04.logsheetmngsys.dto.responseDto.ErrorResponseDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponseDTO> handleCustomException(CustomException ex) {
        ErrorResponseDTO errorResponse = new ErrorResponseDTO(
                ex.getErrorCode(),
                ex.getErrorMsg()
        );

        return ResponseEntity
                .status(ex.getHttpStatus())
                .body(errorResponse);
    }
}

