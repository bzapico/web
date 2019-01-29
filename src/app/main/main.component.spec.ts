import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrganizationComponent } from '../organization/organization.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { FormsModule } from '@angular/forms';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        OrganizationComponent,
        SidebarComponent,
        FilterPipe,
        SortByPipe
      ],
      imports: [
        ModalModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
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
