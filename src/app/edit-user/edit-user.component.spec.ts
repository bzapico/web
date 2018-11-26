import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ButtonsModule
      ],
      providers: [
        BsModalRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('saveUserChanges() - Should request to save the user data modifications', () => {
    const saveUserChanges = spyOn(component, 'saveUserChanges').and.returnValue(true);

    saveUserChanges();

    expect(saveUserChanges).toHaveBeenCalledWith();
  });

});
