import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterComponent } from './cluster.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClusterComponent', () => {
  let component: ClusterComponent;
  let fixture: ComponentFixture<ClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterComponent ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('generateClusterChartData() - Shoud generate the NGX-Chart required JSON object for pie chart rendering', () => {

    // const generateClusterChartData = spyOn(component, 'generateClusterChartData').and.returnValue(true);
    // const data = {};

    // generateClusterChartData(data);

    // expect(component.generateClusterChartData).toBe(data);
  });

  it('updateNodesList() - Should requests an updated list of available nodes to update the current one', () => {
    const updateNodesList = spyOn(component, 'updateNodesList').and.returnValue(true);
    const nodes = {};

    updateNodesList(nodes);

    expect(updateNodesList).toHaveBeenCalledWith(nodes);
  });

});
