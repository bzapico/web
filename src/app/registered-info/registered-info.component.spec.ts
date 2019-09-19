import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredInfoComponent } from './registered-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';


describe('RegisteredInfoComponent', () => {
  let fixture: ComponentFixture<RegisteredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisteredInfoComponent,
        FilterPipe,
        SortByPipe,
        TruncatePipe,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxGraphModule,
        TooltipModule,
        ButtonsModule,
        BrowserAnimationsModule,
        FormsModule,
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
    fixture = TestBed.createComponent(RegisteredInfoComponent);
    fixture.detectChanges();
  });
});
