import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInfoComponent } from './asset-info.component';
import { BsModalRef, BsModalService, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';

describe('AssetInfoComponent', () => {
  let component: AssetInfoComponent;
  let fixture: ComponentFixture<AssetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInfoComponent ],
      imports: [
        HttpClientTestingModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
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
    fixture = TestBed.createComponent(AssetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
