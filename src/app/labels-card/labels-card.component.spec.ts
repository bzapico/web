import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsCardComponent } from './labels-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';

describe('LabelsCardComponent', () => {
  let component: LabelsCardComponent;
  let fixture: ComponentFixture<LabelsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsCardComponent ],
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
