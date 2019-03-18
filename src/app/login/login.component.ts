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
  submitted = false;
  loading: boolean;

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
    this.loading = true;
    this.loginRequest = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(response => {
        this.loading = false;
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
        this.loading = false;
        this.loginRequest = false;
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
