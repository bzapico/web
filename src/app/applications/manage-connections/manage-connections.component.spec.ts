import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConnectionsComponent } from './manage-connections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../../app.module';
import { FilterPipe } from '../../pipes/filter.pipe';

describe('ManageConnectionsComponent', () => {
  let component: ManageConnectionsComponent;
  let fixture: ComponentFixture<ManageConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManageConnectionsComponent,
        FilterPipe
      ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        SelectDropDownModule,
        RouterTestingModule,
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
        TranslateService,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
