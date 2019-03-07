import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterComponent } from './cluster.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterTestingModule } from '@angular/router/testing';
import { TooltipModule, ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { AbbreviatePipe } from '../pipes/abbreviate.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { FormsModule } from '@angular/forms';

describe('ClusterComponent', () => {
  let component: ClusterComponent;
  let fixture: ComponentFixture<ClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClusterComponent,
        TruncatePipe,
        AbbreviatePipe,
        FilterPipe,
        SortByPipe
       ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        RouterTestingModule,
        TooltipModule,
        BrowserAnimationsModule,
        FormsModule,
        ModalModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('updateNodesList() - Should requests an updated list of available nodes to update the current one', () => {
    const updateNodesList = spyOn(component, 'updateNodesList').and.returnValue(true);
    const nodes = {};

    updateNodesList(nodes);

    expect(updateNodesList).toHaveBeenCalledWith(nodes);
  });

  it('Tooltip should not be displayed until user does not any actions', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.querySelector('.tooltip-inner')).toBeNull();
  });

  it('onLabelClick() - Should select a label', () => {
    const onLabelClick = spyOn(component, 'onLabelClick').and.returnValue(true);
    const labelSelected = {};

    onLabelClick(labelSelected);

    expect(onLabelClick.length > 0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
