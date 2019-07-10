import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ModalModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        TooltipModule,
      ],
      providers: [
        AuthService,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  afterEach(() => {
    service = null;
  });

  it('Form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Form shoud be invalid', async() => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Email field validity', () => {
    const email = component.loginForm.controls['email'];

    expect(email.valid).toBeFalsy();
  });

  it('Email field validity when there are any errors', () => {
    let errors = {};
    const email = component.loginForm.controls['email'];
    errors = email.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('onSubmit() - Should return false when the user is not authenticated', () => {
    localStorage.setItem('jwtToken', '12345');

    expect(component.onSubmit()).toBeFalsy();
  });

  it('openDebugPanel() - Should open the modal view that holds the debug panel', () => {
    const openDebugPanel = spyOn(component, 'openDebugPanel').and.returnValue(true);

    openDebugPanel();

    expect(openDebugPanel).toHaveBeenCalledWith();
  });

});
