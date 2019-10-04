import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsCardComponent } from './labels-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TooltipModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';
import { LabelsCardService } from './labels-card.service';

describe('LabelsCardComponent', () => {
  let component: LabelsCardComponent;
  let fixture: ComponentFixture<LabelsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsCardComponent ],
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
      LabelsCardService,
      BsModalService,
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
