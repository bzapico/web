import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ResourcesComponent } from './resources.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesComponent ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        CarouselModule,
        BrowserAnimationsModule,
        FormsModule,
        ButtonsModule,
        ModalModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
