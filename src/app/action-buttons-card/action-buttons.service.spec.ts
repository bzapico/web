import { TestBed } from '@angular/core/testing';

import { ActionButtonsService } from './action-buttons.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActionButtonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      TooltipModule,
      ButtonsModule,
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
  }));

  it('should be created', () => {
    const service: ActionButtonsService = TestBed.get(ActionButtonsService);
    expect(service).toBeTruthy();
  });
});
