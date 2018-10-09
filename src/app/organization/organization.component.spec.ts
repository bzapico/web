import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { ButtonsModule, BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationComponent ],
      imports: [
        FormsModule,
        ButtonsModule,
        ModalModule.forRoot(),
      ],
      providers: [
        BsModalRef,
        BsModalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
