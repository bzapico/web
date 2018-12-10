import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { ButtonsModule, BsModalRef } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ButtonsModule],
      providers: [ BsModalRef ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('checkUserRole() - Should check the role of current user', () => {
    const checkUserRole = spyOn(component, 'checkUserRole').and.returnValue(true);
    const buttonRole = {};

    checkUserRole(buttonRole);

    expect(checkUserRole).toHaveBeenCalledWith(buttonRole);
  });

  it('deleteUser() - Should test if the method is called with parameter as mock user object', () => {
    const mockUserObj = {
      userId: 'john@domain.com',
      name: 'John Doe',
      roles: ['operator']
    };
    const deleteUser = spyOn(component, 'deleteUser').and.returnValue(true);

    deleteUser(mockUserObj);

    expect(deleteUser).toHaveBeenCalledWith(mockUserObj);
  });

  it('resetPassword() - Should check the role of current user', () => {
    const resetPassword = spyOn(component, 'resetPassword').and.returnValue(true);
    const password = {};

    resetPassword(password);

    expect(resetPassword).toHaveBeenCalledWith(password);
  });

});
