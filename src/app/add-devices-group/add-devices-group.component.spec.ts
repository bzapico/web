import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, BsModalRef, TooltipModule, BsModalService, ModalModule } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddDevicesGroupComponent } from './add-devices-group.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
