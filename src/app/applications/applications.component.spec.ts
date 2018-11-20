import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsComponent } from './applications.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CarouselModule, BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsComponent ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        CarouselModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
