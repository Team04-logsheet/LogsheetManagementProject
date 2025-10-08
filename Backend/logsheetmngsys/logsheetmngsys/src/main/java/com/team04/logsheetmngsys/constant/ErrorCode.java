package com.team04.logsheetmngsys.constant;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum ErrorCode {

	//Course Management related Errors
	COURSE_NOT_FOUND(1001,"Course not found with ID :"),
	BATCH_CYCLE_NOT_FOUND(1201,"batch cycle not found with ID :"),
	PREMISES_NOT_FOUND(1301,"premises not found with ID :"),
	COURSE_TYPE_NOT_FOUND(1401,"course type not found with ID :"),
	COURSE_COORDINATOR_NOT_FOUND(1501,"course coordinator not found with ID :"),
	INVALID_GROUP_IDS(1601,"course group not found with ID :"),
	
    //Course_Module related Errors
	SUBJECT_NOT_FOUND(2101,"Subject not found with ID :"),
	SECTION_NOT_FOUND(2201,"Section not found with ID :"),
	TOPIC_NOT_FOUND(2301,"Topic not found with ID :"),
	MODULE_NOT_FOUND(2401,"Module not found with ID :"),
	INVALID_MODULE_IDS(2402, "Invalid Module IDs provided: "),
	COURSE_MODULE_NOT_FOUND(2403, "Course-Module mapping not found."),
    //Data Integrity & Assignment Errors
    DUPLICATE_ASSIGNMENT(2501, "This assignment already exists."),
    ASSIGNMENT_NOT_FOUND(2502, "The specified assignment could not be found."),
	
	//User Management related Errors
	STAFF_NOT_FOUND(3101,"Staff not found with ID :"),
	EMAIL_ALREADY_EXISTS(3102,"Email already exists : "),
	ROLE_NOT_FOUND(3201,"Role not found with ID :"),
	
	MENU_ITEM_NOT_FOUND(3301,"Menu item not found with ID :"),
	INVALID_MENU_ITEM_IDS(3302,"Invalid Menu item IDs : "),
	ROLE_MENU_ITEM_NOT_FOUND(3401,"No MenuItem saved for Role ID :"),
	
	//Group related Errors
	GROUP_NOT_FOUND(4101,"Group not found with ID :"),
	COURSE_GROUP_NOT_FOUND(4201,"Course group not found with ID :"),
	COURSE_GROUP_ALREADY_ASSIGNED(4202,"Course group already assigned for Course ID :"),
	
	
	//Logsheet related Errors
	LOG_NOT_FOUND(5101,"Log not found with ID :"),
	LOGSHEET_TYPE_NOT_FOUND(5201, "Logsheet Type not found with ID: "),
	
	//Authentication and Authorization related Errors
	INVALID_CREDENTIALS(6101,"Invalid credentials"),
	ACCOUNT_LOCKED(6102,"Account is locked due to multiple failed login attempts. Please contact administrator."),
	INVALID_PASSWORD(6103,"Invalid current password"),
	PASSWORD_MISMATCH(6104,"New password and confirm password do not match"),
	TOKEN_EXPIRED(6201,"Token has expired"),
	INVALID_TOKEN(6202,"Invalid token"),
	UNAUTHORIZED_ACCESS(6301,"Unauthorized access to this resource"),
	
	//Fields Validation related Errors
	ID_SHOULD_BE_NULL(7101, "ID must not be provided when creating a new resource"),

	
	//Database related Errors
	EMAIL_SEND_FAILURE(9101,"Failed to send email to : ");
	
	
    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

}