import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallAgentComponent } from './install-agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDropDownModule } from 'ngx-select-dropdown';

describe('InstallAgentComponent', () => {
  let component: InstallAgentComponent;
  let fixture: ComponentFixture<InstallAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallAgentComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        TooltipModule,
        SelectDropDownModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        BsModalRef,
      ]
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