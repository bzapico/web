import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { ButtonsModule, BsModalRef, BsModalService, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ButtonsModule,
        TooltipModule,
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
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
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

  it('It should render organization name', () => {
    component.organizationName = 'nike';
    fixture.detectChanges();

    de.query(By.css('.company-name'));

    expect(el.innerText).toContain('nike');
  });

});
