/**
 * OpStatus contains the status of the execution of a given operation.
 */
export enum OpStatus {
    // Scheduled to represent that the operation is on the queue pending execution.
    SCHEDULED = 'SCHEDULED',
    // Inprogress to represent that the operation is being executed.
    INPROGRESS = 'INPROGRESS',
    // Success to indicate that the operation was successfully executed.
    SUCCESS = 'SUCESS',
    // Fail to indicate that the operation failed.
    FAIL = 'FAIL',
    // Canceled to indicate that the operation was canceled by the user
    CANCELED = 'CANCELED'
}
