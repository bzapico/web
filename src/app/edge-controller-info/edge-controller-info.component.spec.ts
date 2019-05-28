import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeControllerInfoComponent } from './edge-controller-info.component';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EdgeControllerComponent', () => {
  let component: EdgeControllerInfoComponent;
  let fixture: ComponentFixture<EdgeControllerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeControllerInfoComponent ],
      imports: [
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(EdgeControllerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
