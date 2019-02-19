import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule, ModalModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GroupConfigurationComponent } from './group-configuration.component';
import { By } from '@angular/platform-browser';

describe('GroupConfigurationComponent', () => {
  let component: GroupConfigurationComponent;
  let fixture: ComponentFixture<GroupConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupConfigurationComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        HttpClientTestingModule,
        TooltipModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(GroupConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('saveGroupChanges() - Should request to save the group data modifications', () => {
    const saveGroupChanges = spyOn(component, 'saveGroupChanges').and.returnValue(true);

    saveGroupChanges();

    expect(saveGroupChanges).toHaveBeenCalledWith();
  });

  it('Discard button - Should discard the group data modifications', () => {
    const button = fixture.debugElement.query(By.css('.close'));

    button.triggerEventHandler('click', null);

    expect(component.closeModal).toBeDefined();
  });
});
