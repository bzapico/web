import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupInfoComponent } from './device-group-info.component';
import { BsModalRef, ButtonsModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipModule } from '@swimlane/ngx-charts';

describe('DeviceGroupInfoComponent', () => {
  let component: DeviceGroupInfoComponent;
  let fixture: ComponentFixture<DeviceGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceGroupInfoComponent ]
      ,
      imports: [
        ButtonsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TooltipModule,
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
    fixture = TestBed.createComponent(DeviceGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
