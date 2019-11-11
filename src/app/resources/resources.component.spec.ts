/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../app.module';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
        TooltipModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        BsModalRef,
        BsModalService,
        TranslateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;

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
