import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceServiceGroupInfoComponent } from './instance-service-group-info.component';

describe('InstanceServiceGroupInfoComponent', () => {
  let component: InstanceServiceGroupInfoComponent;
  let fixture: ComponentFixture<InstanceServiceGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceServiceGroupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceServiceGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
