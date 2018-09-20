import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nalej';
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {
  }
  openModal() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.modalRef = this.modalService.show(DebugPanelComponent, {initialState});
    this.modalRef.content.closeBtnName = 'Close';
  }
}
