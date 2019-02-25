import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterApplicationComponent } from './register-application.component';

describe('RegisterApplicationComponent', () => {
  let component: RegisterApplicationComponent;
  let fixture: ComponentFixture<RegisterApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
