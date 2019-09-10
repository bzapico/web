import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { ButtonsModule, BsModalRef, BsModalService, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';
import { AbbreviatePipe } from '../pipes/abbreviate.pipe';


describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganizationComponent,
        FilterPipe,
        SortByPipe,
        AbbreviatePipe
       ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ButtonsModule,
        TooltipModule,
        RouterTestingModule,
        ModalModule.forRoot(),
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
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('openUserInfo() - Should open User Info Modal view that holds the user info component', () => {
    const openUserInfo = spyOn(component, 'openUserInfo').and.returnValue(true);
    const user = {};

    openUserInfo(user);

    expect(openUserInfo).toHaveBeenCalledWith(user);
  });

  it('openEditUser() - Should open Edit User Modal view that holds the user info and editable component', () => {
    const openEditUser = spyOn(component, 'openEditUser').and.returnValue(true);
    const user = {};

    openEditUser(user);

    expect(openEditUser).toHaveBeenCalledWith(user);
  });

  it('addUser() - Should open Add User Modal view that holds add user component', () => {
    const addUser = spyOn(component, 'addUser').and.returnValue(true);
    const user = {};

    addUser(user);

    expect(addUser).toHaveBeenCalledWith(user);
  });

  it('updateUserList() - Should request an updated list of available users to update the current one', () => {
    const updateUserList = spyOn(component, 'updateUserList').and.returnValue(true);
    const user = {};

    updateUserList(user);

    expect(updateUserList).toHaveBeenCalledWith(user);
  });

});
