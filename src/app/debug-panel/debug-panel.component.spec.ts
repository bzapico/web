import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugPanelComponent } from './debug-panel.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef } from 'ngx-bootstrap';

describe('DebugPanelComponent', () => {
  let component: DebugPanelComponent;
  let fixture: ComponentFixture<DebugPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugPanelComponent ],
      imports: [FormsModule, ButtonsModule],
      providers: [BsModalRef]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
