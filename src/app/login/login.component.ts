import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DebugPanelComponent } from '../debug-panel/debug-panel.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from '../services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { RoleOptions } from '../definitions/enums/role-options.enum';

/**
 * It sets the timeout for errors
 */
const TIMEOUT_ERROR = 5000;

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
  submitted = false;
  /**
   * Data model for user email
   */
  email: string;
  /**
   * Reference for the service that allows to open debug panel
   */
  modalRef: BsModalRef;
  /**
   * Loaded Data for login request status
   */
  loginRequest: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('unauthorized')) {
      this.notificationsService.add({
        message: this.translateService.instant('login.expired'),
        timeout: TIMEOUT_ERROR,
        type: 'warning'
      });
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.loginRequest = false;
  }
  /**
   * Convenience getter for easy access to form fields
   */
  get f() { return this.loginForm.controls; }
  /**
   * Triggered when clicking the login button and calls the login function on the auth service to check the credentials.
   * If credentials are correct, JWT Token would be stored in localStorage
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = true;
      this.loginRequest = false;
      return;
    }
    this.loginRequest = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(response => {
        if (response.token) {
          const jwtHelper: JwtHelperService = new JwtHelperService();
          const jwtTokenData = jwtHelper.decodeToken(response.token);
          switch (jwtTokenData.role) {
            case RoleOptions.NalejAdmin:
              this.router.navigate([
                '/organization'
              ]);
            break;
            case RoleOptions.Developer:
              this.router.navigate([
                '/applications'
              ]);
            break;
            case RoleOptions.Operator:
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
        if (error.error.message) {
          this.loginRequest = false;
          this.notificationsService.add({
            message: error.error.message,
            timeout: TIMEOUT_ERROR,
            type: 'warning'
          });
        } else if (error.message) {
          this.loginRequest = false;
          this.notificationsService.add({
            message: error.message,
            timeout: TIMEOUT_ERROR,
            type: 'warning'
          });
        } else {
          this.loginRequest = false;
          this.notificationsService.add({
            message: 'ERROR',
            timeout: TIMEOUT_ERROR,
            type: 'warning'
          });
        }
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
}
