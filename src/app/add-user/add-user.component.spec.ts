import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDropDownModule } from 'ngx-select-dropdown';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        TooltipModule,
        SelectDropDownModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        BsModalRef,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('discardChanges() - Should request to discard changes', () => {
    const discardChanges = spyOn(component, 'discardChanges').and.returnValue(true);

    discardChanges();

    expect(discardChanges).toHaveBeenCalledWith();
  });

  it('form invalid when empty', () => {
    expect(component.f.valid).toBeFalsy();
  });

  it('userName field validity', () => {
    let errors = {};
    const userName = component.f['userName'];
    errors = userName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

});
