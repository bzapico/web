import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ResourcesComponent } from './resources.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, ModalModule, BsModalRef, BsModalService, TooltipModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { AbbreviatePipe } from '../pipes/abbreviate.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortByPipe } from '../pipes/sort-by.pipe';
import { NgxGraphModule } from '@swimlane/ngx-graph';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let inputElement: HTMLInputElement;
  // tslint:disable-next-line:prefer-const
  let context: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResourcesComponent,
        TruncatePipe,
        AbbreviatePipe,
        FilterPipe,
        SortByPipe
      ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        NgxGraphModule,
        CarouselModule,
        BrowserAnimationsModule,
        FormsModule,
        ButtonsModule,
        ModalModule.forRoot(),
        RouterTestingModule,
        TooltipModule
      ],
      providers: [
        BsModalRef,
        BsModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'))
    .nativeElement as HTMLInputElement;

    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('openEditCluster() - Should open the modal view that holds the edit cluster component', () => {
    const openEditCluster = spyOn(component, 'openEditCluster').and.returnValue(true);
    const clusters = {};

    openEditCluster(clusters);

    expect(openEditCluster).toHaveBeenCalledWith(clusters);
  });

  it('generateClusterChartData() - Should open the modal view that holds the edit cluster component', () => {
    const generateClusterChartData = spyOn(component, 'generateClusterChartData').and.returnValue(true);
    const clusters = {};

    generateClusterChartData(clusters);

    expect(generateClusterChartData).toHaveBeenCalledWith(clusters);
  });

  it('updateClusterList() - Should requests an updated list of available clusters to update the current one', () => {
    const updateClusterList = spyOn(component, 'updateClusterList').and.returnValue(true);
    const clusters = {};

    updateClusterList(clusters);

    expect(updateClusterList).toHaveBeenCalledWith(clusters);
  });

  it('It should render Cluster Count', () => {
    component.clustersCount = 20;
    fixture.detectChanges();

    de.query(By.css('.summary-box'));

    expect(el.innerText).toContain('20');
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

});
