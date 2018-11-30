import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInfoComponent } from './apps-info.component';
import { BsModalRef, ButtonsModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppsInfoComponent', () => {
  let component: AppsInfoComponent;
  let fixture: ComponentFixture<AppsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsInfoComponent, ],
      imports: [
        ButtonsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgxGraphModule,
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
    fixture = TestBed.createComponent(AppsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
