import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsCardComponent } from './action-buttons-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TooltipModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';
import { ActionButtonsService } from './action-buttons.service';

describe('ActionButtonsCardComponent', () => {
  let component: ActionButtonsCardComponent;
  let fixture: ComponentFixture<ActionButtonsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonsCardComponent ],
      imports: [
        HttpClientTestingModule,
        TooltipModule.forRoot(),
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
        TranslateService,
        ActionButtonsService,
        BsModalService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
