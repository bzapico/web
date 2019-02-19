import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddDevicesGroupComponent } from './add-devices-group.component';
import { By } from '@angular/platform-browser';

describe('AddDevicesGroupComponent', () => {
  let component: AddDevicesGroupComponent;
  let fixture: ComponentFixture<AddDevicesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDevicesGroupComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TooltipModule,
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
    fixture = TestBed.createComponent(AddDevicesGroupComponent);
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
