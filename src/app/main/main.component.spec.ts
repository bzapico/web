import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrganizationComponent } from '../organization/organization.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        OrganizationComponent,
        SidebarComponent
      ],
      imports: [
        ModalModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        BsModalService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
