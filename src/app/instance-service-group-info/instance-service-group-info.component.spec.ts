import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceServiceGroupInfoComponent } from './instance-service-group-info.component';
import { BsModalRef, ButtonsModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TooltipModule } from '@swimlane/ngx-charts';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';

describe('InstanceServiceGroupInfoComponent', () => {
  let component: InstanceServiceGroupInfoComponent;
  let fixture: ComponentFixture<InstanceServiceGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceServiceGroupInfoComponent ]
      ,
      imports: [
        ButtonsModule,
        HttpClientTestingModule,
        TooltipModule,
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
    fixture = TestBed.createComponent(InstanceServiceGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
