import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';
import { ButtonsModule, BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../../app.module';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

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
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        BsModalRef,
        BsModalService,
        AuthService,
        TranslateService
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
