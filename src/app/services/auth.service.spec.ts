import { inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

const RIGHT_USER = {email: 'test@test.com', password: 'password'};
const WRONG_USER = {email: 'xxxxxx', password: 'xxxxx'};

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService]
    });
  });


  it('login() - Right credentials',
    inject([AuthService], (authService) => {
    const loginResult = authService.login(RIGHT_USER);
    console.log('loginResult', loginResult);
    expect(loginResult).toBe(true);
  }));

  it('login() - Wrong credentials',
    inject([AuthService], (authService) => {
    const loginResult = authService.login(WRONG_USER);
    console.log('loginResult', loginResult);
    expect(loginResult).toBe(false);
  }));

});
