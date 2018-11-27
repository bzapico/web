import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
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
        FormsModule
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

  it('onSubmit() - It should be submitted to true', async() => {
    component.onSubmit();

    expect(component.loginRequest).toBeTruthy();
  });

  // tslint:disable-next-line:max-line-length
  it('onSubmit() - Should triggered when clicking the login button and calls the login function on the auth service to check the credentials', async() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('Form shoud be invalid', async() => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    expect(component.loginForm.valid).toBeFalsy();
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
