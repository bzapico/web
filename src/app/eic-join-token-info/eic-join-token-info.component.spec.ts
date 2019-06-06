import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EicJoinTokenInfoComponent } from './eic-join-token-info.component';

describe('EicJoinTokenInfoComponent', () => {
  let component: EicJoinTokenInfoComponent;
  let fixture: ComponentFixture<EicJoinTokenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EicJoinTokenInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EicJoinTokenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
