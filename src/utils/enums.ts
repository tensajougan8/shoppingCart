// File: ControllerEnums.ts
export namespace USER_CONTROLLER {
    export enum SUCCESS {
      LOGIN_SUCCESSFUL = 'Login successful',
      USER_REGISTERED = 'User registered successfully',
      USER_FETCHED = 'User fetched successfully',
      PASSWORD_UPDATED = 'Password updated successfully',
      VALID_TOKEN = 'Validated token successfully',
      PROFILE_UPDATED = 'Profile update successful',
      QUERY_ADDED = 'Added query successful',
      USER_DELETED = 'User account deleted successfully',
      OTP_SENT = 'OTP sent successfully',
    }
  
    export enum VALIDATION {
      ERROR = 'Validation Error',
    }
  
    export enum AUTH {
      EMAIL_ALREADY_EXISTS = 'Email Id already exist',
      EMAIL_NOT_FOUND = 'The email does not exist',
      SAME_AS_OLD_PASSWORD = 'Password is the same as old one',
      WRONG_PASSWORD = 'Wrong password submitted',
      INVALID_OTP = 'Invalid OTP',
      OTP_EXPIRED = 'OTP has expired',
      PASSWORD_NOT_FOUND = 'Password not found',
      USER_NOT_FOUND = 'User does not exist',
    }
  }
  
  export namespace PATH_CONTROLLER {
    export enum SUCCESS {
      FILE_CREATED = 'File created successfully',
      FOLDER_CREATED = 'Folder created successfully',
      FILE_UPDATED = 'File updated successfully',
      FOLDER_UPDATED = 'Folder updated successfully',
      FILE_DELETED = 'File deleted successfully',
      FOLDER_DELETED = 'Folder deleted successfully',
      FILE_FETCHED = 'File fetched successfully',
      FOLDERS_AND_FILES_FETCHED = 'All files and folders fetched',
      FOLDER_RESTORED = 'Folder restored successfully',
      FILE_RESTORED = 'File restored successfully',
      FILES_AND_FOLDERS_RESTORED = 'Files and folders restored successfully',
      FILE_MOVED_TO_RECYCLE = 'File moved to recycle successfully',
      FOLDER_MOVED_TO_RECYCLE = 'Folder moved to recycle successfully',
      BIN_EMPTIED = 'Bin cleaned successfully',
    }
  
    export enum VALIDATION {
      NO_FILE_FOUND = 'File does not exist',
      NO_ACCESS_FILE = 'Trying to access the wrong file',
      NO_ACCESS_FOLDER = 'Trying to access the wrong folder',
      FILES_AND_FOLDERS_NOT_FOUND = 'No files and folders found',
      INCORRECT_PARAMETERS = 'Incorrect parameters passed',
    }
  }
  
  export namespace CANVAS_CONTROLLER {
    export enum SUCCESS {
      CANVAS_CREATED = 'Canvas created successfully',
      CANVAS_UPDATED = 'Canvas updated successfully',
      CANVAS_DELETED = 'Canvas deleted successfully',
    }
  
    export enum VALIDATION {
      NO_ACCESS = 'Trying to access the wrong canvas',
    }
  }
  
  export enum CONTROLLERS {
    USER_CONTROLLER = 'User Controller',
    CANVAS_CONTROLLER = 'Canvas Controller',
    PATH_CONTROLLER = 'Path Controller',
  }
  
  export namespace MIDDLEWARE {
    export enum FAILURE {
      NO_USER = 'User not found',
      AUTH_FAILED = 'Authentication failed',
      INVALID_TOKEN = 'Invalid token',
    }
  }
  