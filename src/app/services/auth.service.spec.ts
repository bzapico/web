import { inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService]
    });
  });

  it('login() - Right credentials',
    inject([AuthService], (authService) => {
    const loginResult = authService.login('test@test.com', 'password');
    console.log('loginResult', loginResult);
    expect(loginResult).toBe(true);
  }));

  it('login() - Wrong credentials',
    inject([AuthService], (authService) => {
    const loginResult = authService.login('xxxx', 'xxxx');
    console.log('loginResult', loginResult);
    expect(loginResult).toBe(false);
  }));

});
