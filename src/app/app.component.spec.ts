import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { MainComponent } from './main/main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './notifications/notifications.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        SidebarComponent,
        NotificationsComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        RouterModule
      ],
      providers: []
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
