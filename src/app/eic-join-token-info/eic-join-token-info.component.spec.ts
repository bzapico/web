import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, ModalModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EicJoinTokenInfoComponent } from './eic-join-token-info.component';

describe('EicJoinTokenInfoComponent', () => {
  let component: EicJoinTokenInfoComponent;
  let fixture: ComponentFixture<EicJoinTokenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EicJoinTokenInfoComponent
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
    fixture = TestBed.createComponent(EicJoinTokenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
