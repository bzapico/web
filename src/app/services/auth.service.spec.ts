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

  it('login() - It will test if 2 parameters, user name and password are passed',
  inject([AuthService], (authService) => {
    const mockData = {
      userId: 'admin',
      password: 'admin'
    };
    const login = spyOn(authService, 'login').and.returnValue(true);
    login(mockData.userId, mockData.password);
    expect(login).toHaveBeenCalledWith(mockData.userId, mockData.password);
  }));


});
