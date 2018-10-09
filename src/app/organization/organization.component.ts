import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  /**
   * Reference for the service that allows the user info component
   */
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  /**
   * Opens the modal view that holds the user info component
   */
  openUserInfo() {
    this.modalRef = this.modalService.show(UserInfoComponent);
    this.modalRef.content.closeBtnName = 'Close';
  }

}
