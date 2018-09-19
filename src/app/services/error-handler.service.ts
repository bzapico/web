import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class ErrorHandlerService implements ErrorHandler {

  constructor(
  ) { }

  /**
  * Handler for error
  * @param error: The error received from server
  */
  handleError(error: HttpErrorResponse): void {
    switch (error.status) {
        case 400 : console.log('Bad Request');
            break;
        case 401 : console.log('Unauthorized: the user does not have the necessary credentials');
            break;
        case 403 : console.log('Forbidden');
            break;
        case 404 : console.log('Not found');
            break;
        case 500 : console.log('Internal Server Error');
            break;
        default :
            console.log(error.message);
            break;
    }
  }
}

