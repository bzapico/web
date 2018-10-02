import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DebugPanelComponent } from './debug-panel/debug-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  logged: boolean;
  title = 'nalej';
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {
    this.logged = false;
  }
  openModal() {
    this.modalRef = this.modalService.show(DebugPanelComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }
}
