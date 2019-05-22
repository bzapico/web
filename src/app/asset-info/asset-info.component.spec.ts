import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInfoComponent } from './asset-info.component';
import { BsModalRef } from 'ngx-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssetInfoComponent', () => {
  let component: AssetInfoComponent;
  let fixture: ComponentFixture<AssetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInfoComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BsModalRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
