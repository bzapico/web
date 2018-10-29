import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClusterComponent } from './edit-cluster.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditClusterComponent', () => {
  let component: EditClusterComponent;
  let fixture: ComponentFixture<EditClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClusterComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        RouterTestingModule
      ],
      providers: [
        BsModalRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
