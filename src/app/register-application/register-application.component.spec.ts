import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterApplicationComponent } from './register-application.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalRef } from 'ngx-bootstrap';
import { FileDropModule } from 'ngx-file-drop';

describe('RegisterApplicationComponent', () => {
  let component: RegisterApplicationComponent;
  let fixture: ComponentFixture<RegisterApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterApplicationComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FileDropModule
      ],
      providers: [
        BsModalRef,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
