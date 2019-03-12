import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInstancesInfoComponent } from './service-instances-info.component';

describe('ServiceInstancesInfoComponent', () => {
  let component: ServiceInstancesInfoComponent;
  let fixture: ComponentFixture<ServiceInstancesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInstancesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInstancesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
