import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedFilterOptionsComponent } from './advanced-filter-options.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule, ModalModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../../app.module';

describe('AdvancedFilterOptionsComponent', () => {
  let component: AdvancedFilterOptionsComponent;
  let fixture: ComponentFixture<AdvancedFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedFilterOptionsComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        TooltipModule,
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
        BsModalRef,
        BsModalService,
        TranslateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Discard button - Should discard the group data modifications', () => {
    const button = fixture.debugElement.query(By.css('.close'));

    button.triggerEventHandler('click', null);

    expect(component.closeModal).toBeDefined();
  });
});
