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
        case 200 : console.log('OK, the request has succeeded');
            break;
        case 201 : console.log('Created, the request has been fulfilled');
            break;
        case 301 : console.log('Moved Permanently, the requests should be directed to the given URL');
            break;
        case 400 : console.log('Bad Request, that server could not understand the request due to invalid syntax');
            break;
        case 401 :
            console.log('Unauthorized, the user does not have the necessary credentials');
            window.location.href = '/#/login?unauthorized=true';
            break;
        case 403 : console.log('Forbidden, the user does not have access rights to the content');
            break;
        case 404 : console.log('Not Found, the server can not find requested resource');
            break;
        case 409 : console.log('Conflict, the request could not be completed due to a conflict with the current state of the resource');
            break;
        case 410 : console.log('Gone, the page is no longer available from the server and no forwarding address has been set up');
            break;
        // tslint:disable-next-line:max-line-length
        case 500 : console.log('Internal Server Error, the server encountered an unexpected condition which prevented it from fulfilling the request');
            break;
        case 501 : console.log('Not Implemented, the request method is not supported by the server and cannot be handled');
            break;
        case 502 : console.log('Bad Gateaway, the server received an invalid response while acting as a gateway or proxy server');
            break;
        case 503 :
            console.log('Service Unavailable, the server is currently unavailable');
            break;
        case 504 :
            console.log('Gateway Time-Out, there is a server-server communication problem');
            break;
        case 511 :
            console.log('Network Authentication Required, the user needs to authenticate to gain network access');
            break;
        default :
            console.log(error);
            break;
    }
  }
}

