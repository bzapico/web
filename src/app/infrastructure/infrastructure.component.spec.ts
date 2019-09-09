import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureComponent } from './infrastructure.component';

describe('InfrastructureComponent', () => {
  let fixture: ComponentFixture<InfrastructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfrastructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureComponent);
    fixture.detectChanges();
  });
});
