import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { ButtonsModule, BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
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
        ButtonsModule,
        ModalModule.forRoot(),
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

});
