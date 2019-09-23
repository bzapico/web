import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConnectionsComponent } from './add-connections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDropDownModule } from 'ngx-select-dropdown';

describe('AddConnectionsComponent', () => {
  let component: AddConnectionsComponent;
  let fixture: ComponentFixture<AddConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConnectionsComponent ],
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
    fixture = TestBed.createComponent(AddConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
