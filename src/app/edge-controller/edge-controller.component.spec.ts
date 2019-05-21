import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeControllerComponent } from './edge-controller.component';

describe('EdgeControllerComponent', () => {
  let component: EdgeControllerComponent;
  let fixture: ComponentFixture<EdgeControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
