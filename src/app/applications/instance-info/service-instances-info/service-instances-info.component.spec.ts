import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInstancesInfoComponent } from './service-instances-info.component';
import { BsModalRef, ButtonsModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipModule } from '@swimlane/ngx-charts';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../../../app.module';

describe('ServiceInstancesInfoComponent', () => {
  let fixture: ComponentFixture<ServiceInstancesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInstancesInfoComponent ],
      imports: [
        ButtonsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TooltipModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(ServiceInstancesInfoComponent);
    fixture.detectChanges();
  });
});
