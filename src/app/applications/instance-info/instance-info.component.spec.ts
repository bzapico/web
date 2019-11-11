/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceInfoComponent } from './instance-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../../app.module';

describe('InstancesInfoComponent', () => {
  let fixture: ComponentFixture<InstanceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceInfoComponent,
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
    fixture = TestBed.createComponent(InstanceInfoComponent);
    fixture.detectChanges();
  });
});
