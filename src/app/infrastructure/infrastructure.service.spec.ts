import { TestBed } from '@angular/core/testing';
import { InfrastructureService } from './infrastructure.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';

describe('InfrastructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      })
    ],
    providers: [
      TranslateService
    ]
  }));

  it('should be created', () => {
    const service: InfrastructureService = TestBed.get(InfrastructureService);
    expect(service).toBeTruthy();
  });
});
