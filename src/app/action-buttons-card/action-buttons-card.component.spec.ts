import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsCardComponent } from './action-buttons-card.component';

describe('ActionButtonsCardComponent', () => {
  let component: ActionButtonsCardComponent;
  let fixture: ComponentFixture<ActionButtonsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
