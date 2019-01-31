import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDevicesGroupComponent } from './add-devices-group.component';

describe('AddDevicesGroupComponent', () => {
  let component: AddDevicesGroupComponent;
  let fixture: ComponentFixture<AddDevicesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDevicesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDevicesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
