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
    this.unauthorizedMethod();
    console.log(error);
    if (error.status === 401) {
      console.log(this.unauthorizedMethod());
    }
  }

  unauthorizedMethod(): string {
    return 'Unauthorized: the user does not have the necessary credentials';
  }
}
