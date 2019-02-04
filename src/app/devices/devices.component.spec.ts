import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BsModalRef, BsModalService, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DevicesComponent,
        FilterPipe,
        SortByPipe
       ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        TooltipModule,
        CommonModule,
        ModalModule.forRoot(),
        FormsModule,
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
