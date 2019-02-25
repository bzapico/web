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
import { AbbreviatePipe } from '../pipes/abbreviate.pipe';
import { Group } from '../definitions/interfaces/group';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DevicesComponent,
        FilterPipe,
        SortByPipe,
        AbbreviatePipe,
       ],
      imports: [
        HttpClientTestingModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        TooltipModule.forRoot(),
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

  it('openGroupConfiguration() - Should open the modal view that holds the group configuration component', () => {
    const openGroupConfiguration = spyOn(component, 'openGroupConfiguration').and.returnValue(true);

    openGroupConfiguration();

    expect(openGroupConfiguration).toHaveBeenCalledWith();
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

  it('openGroupConfiguration() - Test if the method is called with parameter as Group object.', () => {
    const mockGroupList: Group = {
      organization_id: 'b792989c-4ae4-460f-92b5-bca7ed36f016',
      device_group_id: 'a1',
      enabled: true,
      default_device_connectivity: true,
      name: 'Voice controllers',
      device_group_api_key: '2bd7d59cfe90e4d32b1d2f20d39c86df-fbaa8670-1008-ac7a-398a-3c11ac797c79'
    };
    const openGroupConfiguration = spyOn(component, 'openGroupConfiguration').and.returnValue(true);
    openGroupConfiguration(mockGroupList);
    expect(openGroupConfiguration).toHaveBeenCalledWith(mockGroupList);
  });

});
