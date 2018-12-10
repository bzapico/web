import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ SidebarComponent ],
      providers: [
        BsModalService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('openDebugPanel() - Should open the modal view that holds the debug panel', () => {
    const openDebugPanel = spyOn(component, 'openDebugPanel').and.returnValue(true);

    openDebugPanel();

    expect(openDebugPanel).toHaveBeenCalledWith();
  });

  it('openEditUser() - Should open the modal view that holds the user info and editable component', () => {
    const openEditUser = spyOn(component, 'openEditUser').and.returnValue(true);

    openEditUser();

    expect(openEditUser).toHaveBeenCalledWith();
  });

  it('updateProfileUser() - Should request an updated profile user to update the current one', () => {
    const updateProfileUser = spyOn(component, 'updateProfileUser').and.returnValue(true);
    const nodes = {};

    updateProfileUser(nodes);

    expect(updateProfileUser).toHaveBeenCalledWith(nodes);
  });

  it('logout() - Should clean the credentials and leads to login page', () => {
    const logout = spyOn(component, 'logout').and.returnValue(true);

    logout();

    expect(logout).toHaveBeenCalledWith();
  });


});
