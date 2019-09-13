import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupInfoComponent } from './device-group-info.component';

describe('DeviceGroupInfoComponent', () => {
  let component: DeviceGroupInfoComponent;
  let fixture: ComponentFixture<DeviceGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceGroupInfoComponent ]
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
