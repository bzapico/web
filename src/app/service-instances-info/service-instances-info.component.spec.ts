import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInstancesInfoComponent } from './service-instances-info.component';
import { BsModalRef, ButtonsModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipModule } from '@swimlane/ngx-charts';

describe('ServiceInstancesInfoComponent', () => {
  let component: ServiceInstancesInfoComponent;
  let fixture: ComponentFixture<ServiceInstancesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInstancesInfoComponent ],
      imports: [
        ButtonsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TooltipModule,
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
    fixture = TestBed.createComponent(ServiceInstancesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
