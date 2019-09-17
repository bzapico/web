import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredServiceGroupInfoComponent } from './registered-service-group-info.component';

describe('RegisteredServiceGroupInfoComponent', () => {
  let component: RegisteredServiceGroupInfoComponent;
  let fixture: ComponentFixture<RegisteredServiceGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredServiceGroupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredServiceGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
