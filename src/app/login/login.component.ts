import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DebugPanelComponent } from '../debug-panel/debug-panel.component';

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
   * Holds the error message
   */
  errorMessage: string;

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
    this.errorMessage = '';
  }

  /**
   * Triggered when clicking the login button and calls the login function on the auth service to check the credentials.
   * If credentials are correct, JWT Token would be stored in localStorage
   */
  onSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(response => {
        this.errorMessage = '';
        if (response.token) {
          this.router.navigate([
            '/organization'
          ]);
        }
      }, error => {
        this.errorMessage = error.statusText;
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
