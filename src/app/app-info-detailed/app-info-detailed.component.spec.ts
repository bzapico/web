import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoDetailedComponent } from './app-info-detailed.component';

describe('AppInfoDetailedComponent', () => {
  let component: AppInfoDetailedComponent;
  let fixture: ComponentFixture<AppInfoDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInfoDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
