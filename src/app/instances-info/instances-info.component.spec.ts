import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancesInfoComponent } from './instances-info.component';

describe('InstancesInfoComponent', () => {
  let component: InstancesInfoComponent;
  let fixture: ComponentFixture<InstancesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
