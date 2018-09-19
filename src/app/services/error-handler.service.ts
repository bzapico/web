import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()

export class ErrorHandlerService implements ErrorHandler {

  constructor(
  ) { }

  /**
  * Handler for error
  * @param error: The error received from server
  */
  handleError(error: any): void {
    console.log(error);
    if (error.status === 401) {
      console.log('Unauthorized');
    }
}
}
