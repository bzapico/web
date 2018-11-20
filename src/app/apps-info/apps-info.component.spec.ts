import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInfoComponent } from './apps-info.component';
import { BsModalRef, ButtonsModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppsInfoComponent', () => {
  let component: AppsInfoComponent;
  let fixture: ComponentFixture<AppsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsInfoComponent, ],
      imports: [
        ButtonsModule,
        HttpClientTestingModule,
      ],
      providers: [ BsModalRef ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
