import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BsModalService, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { MainComponent } from './main/main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SortByPipe } from './pipes/sort-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader } from './app.module';
import { HttpClient } from '@angular/common/http';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        SidebarComponent,
        NotificationsComponent,
        OrganizationComponent,
        FilterPipe,
        SortByPipe
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        RouterModule,
        AlertModule,
        TooltipModule,
        ModalModule.forRoot(),
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
      providers: [BsModalService, TranslateService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
