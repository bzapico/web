import { TestBed } from '@angular/core/testing';

import { LabelsCardServiceService } from '../labels-card-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';

describe('LabelsCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
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
    const service: LabelsCardServiceService = TestBed.get(LabelsCardServiceService);
    expect(service).toBeTruthy();
  });
});
