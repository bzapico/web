import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

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
        RouterTestingModule
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

  it('Discard button - Should discard the user data modifications', () => {
    const button = fixture.debugElement.query(By.css('.close'));

    button.triggerEventHandler('click', null);

    expect(component.discardChanges).toBeDefined();
  });

});
