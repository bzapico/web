import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInfoComponent } from './device-info.component';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeviceInfoComponent', () => {
  let component: DeviceInfoComponent;
  let fixture: ComponentFixture<DeviceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInfoComponent ],
      imports: [
        HttpClientTestingModule,
        ModalModule.forRoot(),
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
