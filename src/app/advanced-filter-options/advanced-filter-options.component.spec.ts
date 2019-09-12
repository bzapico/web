import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedFilterOptionsComponent } from './advanced-filter-options.component';

describe('AdvancedFilterOptionsComponent', () => {
  let component: AdvancedFilterOptionsComponent;
  let fixture: ComponentFixture<AdvancedFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedFilterOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
