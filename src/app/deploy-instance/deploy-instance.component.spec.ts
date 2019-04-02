import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { DeployInstanceComponent } from './deploy-instance.component';
import { from } from 'rxjs';
import { AutofocusDirective } from '../directives/autofocus.directive';

describe('DeployInstanceComponent', () => {
  let component: DeployInstanceComponent;
  let fixture: ComponentFixture<DeployInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployInstanceComponent,
        AutofocusDirective,
       ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        SelectDropDownModule,
        RouterTestingModule,
        ModalModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
