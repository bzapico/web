import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphComponent } from './graph.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { TooltipModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule  } from '@angular/forms';

describe('GraphComponent', () => {
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GraphComponent
      ],
      imports: [
        NgxGraphModule,
        TooltipModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    fixture.detectChanges();
  });
});
