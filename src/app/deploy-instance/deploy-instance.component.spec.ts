import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { DeployInstanceComponent } from './deploy-instance.component';
import { AutofocusDirective } from '../directives/autofocus.directive';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {createTranslateLoader} from '../app.module';
import {HttpClient} from '@angular/common/http';

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
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        BsModalRef,
        BsModalService,
        TranslateService
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
