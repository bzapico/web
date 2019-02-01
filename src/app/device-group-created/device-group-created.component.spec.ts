import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGroupCreatedComponent } from './device-group-created.component';

describe('DeviceGroupCreatedComponent', () => {
  let component: DeviceGroupCreatedComponent;
  let fixture: ComponentFixture<DeviceGroupCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceGroupCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGroupCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
