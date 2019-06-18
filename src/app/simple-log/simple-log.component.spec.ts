import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, ModalModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SimpleLogComponent } from './simple-log.component';

describe('SimpleLogComponent', () => {
  let component: SimpleLogComponent;
  let fixture: ComponentFixture<SimpleLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleLogComponent
      ],
      imports: [
       HttpClientTestingModule,
       RouterTestingModule,
       ModalModule.forRoot(),
     ],
     providers: [
       BsModalRef,
       BsModalService
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
