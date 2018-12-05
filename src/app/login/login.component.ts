import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DebugPanelComponent } from '../debug-panel/debug-panel.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Holds the login form group of inputs
   */
  loginForm: FormGroup;
  /**
   * Reference for the service that allows to open debug panel
   */
  modalRef: BsModalRef;
  /**
   * Holds the error messages
   */
  errorMessages: string[];

  /**
   * Loaded Data for login request status
   */
  loginRequest: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.errorMessages = [];
    this.loginRequest = false;
  }

  /**
   * Triggered when clicking the login button and calls the login function on the auth service to check the credentials.
   * If credentials are correct, JWT Token would be stored in localStorage
   */
  onSubmit() {
    this.loginRequest = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(response => {
        this.errorMessages = [];
        if (response.token) {
          const jwtHelper: JwtHelperService = new JwtHelperService();
          const jwtTokenData = jwtHelper.decodeToken(response.token);
          switch (jwtTokenData.role) {
            case 'Owner':
              this.router.navigate([
                '/organization'
              ]);
            break;
            case 'Developer':
              this.router.navigate([
                '/applications'
              ]);
            break;
            case 'Operator':
              this.router.navigate([
                '/resources'
              ]);
            break;
            default:
              this.router.navigate([
                '/applications'
              ]);
          }
        }
      }, error => {
        this.loginRequest = false;
        this.errorMessages.push(error.statusText);
      });
  }

  /**
   * Opens the modal view that holds the debug panel
   */
  openDebugPanel() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe((reason: string) => { location.reload(); });
  }
  /**
   * Validates user data
   * @param form Form with user data
   */
  checkFormFields(form: FormGroup) {
    this.errorMessages = [];
    if (form.controls.email.invalid) {
      if (form.controls.email.errors.required) {
        this.errorMessages.push('Email is required');
      }
      if (form.controls.email.errors.email) {
        this.errorMessages.push('Email must be a valid email address');
      }
    }
    if (form.controls.password.invalid) {
      if (form.controls.password.errors.required) {
        this.errorMessages.push('Password is required');
      }
      if (form.controls.password.errors.minlength) {
        this.errorMessages.push('Password must have more than 6 characters');
      }
    }
  }

  /**
  * Outputs the error messages in the required format, showing the first one
  * @param errors String containing the errors
  */
  formatValidationOutput(errors: string[]) {
    if (this.errorMessages.length === 1) {
      return {
        msg: this.errorMessages[0],
        errors: this.errorMessages
      };
    } else if (this.errorMessages.length > 0) {
      return {
        msg: this.errorMessages[0] + ' +' + (this.errorMessages.length - 1) + ' errors',
        errors: this.errorMessages
      };
    } else {
      return {
        msg: '',
        errors: this.errorMessages
      };
    }
  }

  /**
   * Another string definition of an array
   * @param array Array of elements
   */
  arrayToString(array: any[]): string {
    let msg = '';
    array.forEach(element => {
      msg = msg + element.toLowerCase() + ', ';
    });
    msg = msg.slice(0, msg.length - 2);
    return msg;
  }
}
