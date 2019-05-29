import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallAgentComponent } from './install-agent.component';

describe('InstallAgentComponent', () => {
  let component: InstallAgentComponent;
  let fixture: ComponentFixture<InstallAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
