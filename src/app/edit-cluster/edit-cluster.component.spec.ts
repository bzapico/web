import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClusterComponent } from './edit-cluster.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { By } from '@angular/platform-browser';

describe('EditClusterComponent', () => {
  let component: EditClusterComponent;
  let fixture: ComponentFixture<EditClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClusterComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ButtonsModule,
        RouterTestingModule,
        ReactiveFormsModule
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

  it('saveClusterChanges() - Should request to save the cluster data modifications', () => {
    const saveClusterChanges = spyOn(component, 'saveClusterChanges').and.returnValue(true);

    saveClusterChanges();

    expect(saveClusterChanges).toHaveBeenCalledWith();
  });

  it('Close button - Should discard the cluster data modifications', () => {
    const button = fixture.debugElement.query(By.css('.close'));

    button.triggerEventHandler('click', null);

    expect(component.discardChanges).toBeDefined();
  });

});
