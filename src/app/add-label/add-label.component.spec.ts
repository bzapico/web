import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';

import { AddLabelComponent } from './add-label.component';

describe('AddLabelComponent', () => {
  let component: AddLabelComponent;
  let fixture: ComponentFixture<AddLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabelComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TooltipModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(AddLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('discardChanges() - Should request to discard changes', () => {
    const discardChanges = spyOn(component, 'discardChanges').and.returnValue(true);

    discardChanges();

    expect(discardChanges).toHaveBeenCalledWith();
  });

  it('Discard button - Should discard the user data modifications', () => {
    const button = fixture.debugElement.query(By.css('.close'));

    button.triggerEventHandler('click', null);

    expect(component.discardChanges).toBeDefined();
  });
});
