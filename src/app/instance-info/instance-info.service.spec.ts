import { TestBed } from '@angular/core/testing';
import { InstanceInfoService } from './instance-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';

describe('InstanceInfoService', () => {
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
    const service: InstanceInfoService = TestBed.get(InstanceInfoService);
    expect(service).toBeTruthy();
  });
});
