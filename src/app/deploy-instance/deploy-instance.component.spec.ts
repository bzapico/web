import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployInstanceComponent } from './deploy-instance.component';

describe('DeployInstanceComponent', () => {
  let component: DeployInstanceComponent;
  let fixture: ComponentFixture<DeployInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
