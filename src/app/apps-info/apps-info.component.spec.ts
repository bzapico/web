import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInfoComponent } from './apps-info.component';
import { BsModalRef } from 'ngx-bootstrap';

describe('AppsInfoComponent', () => {
  let component: AppsInfoComponent;
  let fixture: ComponentFixture<AppsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsInfoComponent ],
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
