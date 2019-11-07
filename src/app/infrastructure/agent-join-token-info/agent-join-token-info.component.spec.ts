import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, ModalModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../../app.module';

import { AgentJoinTokenInfoComponent } from './agent-join-token-info.component';

describe('AgentJoinTokenInfoComponent', () => {
  let component: AgentJoinTokenInfoComponent;
  let fixture: ComponentFixture<AgentJoinTokenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentJoinTokenInfoComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot(),
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
    fixture = TestBed.createComponent(AgentJoinTokenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
