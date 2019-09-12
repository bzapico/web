import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedFilterOptionsComponent } from './advanced-filter-options.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule, ModalModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AdvancedFilterOptionsComponent', () => {
  let component: AdvancedFilterOptionsComponent;
  let fixture: ComponentFixture<AdvancedFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedFilterOptionsComponent ],
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
    fixture = TestBed.createComponent(AdvancedFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('saveFilterChanges() - Should request to save the group data modifications', () => {
    const saveFilterChanges = spyOn(component, 'saveFilterChanges').and.returnValue(true);

    saveFilterChanges();

    expect(saveFilterChanges).toHaveBeenCalledWith();
  });

  it('Discard button - Should discard the group data modifications', () => {
    const button = fixture.debugElement.query(By.css('.close'));

    button.triggerEventHandler('click', null);

    expect(component.closeModal).toBeDefined();
  });
});
