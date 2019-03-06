import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredInfoComponent } from './registered-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { TooltipModule } from '@swimlane/ngx-charts';
import { ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';


describe('RegisteredInfoComponent', () => {
  let component: RegisteredInfoComponent;
  let fixture: ComponentFixture<RegisteredInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisteredInfoComponent,
        FilterPipe,
        SortByPipe
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxGraphModule,
        TooltipModule,
        ButtonsModule,
        BrowserAnimationsModule,
        FormsModule,
        ModalModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
